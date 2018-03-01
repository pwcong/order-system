'use strict';

const Service = require('egg').Service;

const moment = require('moment');

const { generateOrderId } = require('../utils/order');

class OrderService extends Service {
  async create(sender_id, receiver_id, details, address) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _receiver = await app.model.User.findById(receiver_id);

        if (!_receiver || _receiver.status !== 0 || _receiver.type !== 2) {
          throw new Error('该商户无效');
        }

        let amount = 0;
        const recipes = [];

        for (let i = 0; i < details.length; i++) {
          const item = details[i];

          if (!item.id || parseInt(item.counts) < 1) {
            continue;
          }

          const _recipe = await app.model.Recipe.findOne({
            where: {
              id: item.id,
              status: 0
            },
            include: [
              {
                model: app.model.RecipeCategory,
                as: 'recipe_category'
              }
            ]
          });

          if (!_recipe || !(_recipe.recipe_category.status === 0)) {
            continue;
          }

          amount += parseFloat(_recipe.price) * parseInt(item.counts);
          recipes.push({
            id: parseInt(item.id),
            counts: item.counts,
            name: _recipe.name,
            price: parseFloat(_recipe.price)
          });
        }

        if (recipes.length <= 0) {
          throw new Error('订单内容为空');
        }

        const _order = await app.model.Order.create({
          id: generateOrderId(),
          sender_id,
          sender_info_id: sender_id,
          receiver_id,
          receiver_info_id: receiver_id,
          name: recipes.map(r => r.name + '*' + r.counts).join(' + '),
          details: JSON.stringify(recipes),
          address,
          amount
        });

        if (!_order) {
          throw new Error('创建失败');
        }

        resolve({
          order: _order
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async findSendedOrdersWithStatus(sender_id, status) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const condition = {
          sender_id
        };

        if (status && status.length > 0) {
          condition.status = status;
        }

        const _orders = await app.model.Order.findAll({
          where: condition,
          order: [['created_at', 'DESC']],
          include: [
            {
              model: app.model.UserInfo,
              as: 'receiver_info'
            }
          ]
        });

        resolve({
          orders: _orders
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async findReceivedOrdersWithStatus(receiver_id, status, parent_id = null) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        if (parent_id) {
          const _receiver = await app.model.User.findById(receiver_id);
          if (!_receiver || _receiver.parent_id !== parent_id) {
            throw new Error('没有权限');
          }
        }

        const condition = {
          receiver_id
        };

        if (status && status.length > 0) {
          condition.status = status;
        }

        const _orders = await app.model.Order.findAll({
          where: condition,
          order: [['created_at', 'DESC']],
          include: [
            {
              model: app.model.UserInfo,
              as: 'sender_info'
            }
          ]
        });

        resolve({
          orders: _orders
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async pay(id, sender_id, payment_type) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      /************ 开启事务 ************/
      const t = await app.model.transaction();

      try {
        /************ 查询订单 ************/
        const _order = await app.model.Order.findOne({
          where: {
            id,
            sender_id,
            status: [0]
          }
        });

        if (!_order) {
          throw new Error('订单无效');
        }

        /************ 查询收款方 ************/
        const receiver_id = _order.receiver_id;

        const _receiver = await app.model.User.findById(receiver_id);
        if (!_receiver || _receiver.status !== 0) {
          throw new Error('收款方账户无效');
        }

        /************ 查询付款方 ************/
        const _sender = await app.model.User.findById(sender_id);
        if (!_sender || _sender.status !== 0) {
          throw new Error('付款方账户无效');
        }

        /************ 更新付款方账户 ************/
        const orderAmount = parseFloat(_order.amount);

        const senderBalance = parseFloat(_sender.balance);

        if (payment_type === 1) {
          if (senderBalance < orderAmount) {
            throw new Error('余额不足');
          } else {
            _sender.balance = senderBalance - orderAmount;
            await _sender.save({ transaction: t });
          }
        }

        /** ********** 更新收款方账户 ************/
        const receiverBalance = parseFloat(_receiver.balance);
        _receiver.balance = receiverBalance + orderAmount;
        await _receiver.save({ transaction: t });

        /** ********** 更新订单状态 ************/
        _order.status = 1;
        _order.has_paid = true;
        await _order.save({ transaction: t });

        /** ********** 新建收款付款账单 ************/

        await app.model.Bill.create(
          {
            user_id: receiver_id,
            name: '收款',
            amount: orderAmount,
            type: 0
          },
          { transaction: t }
        );

        await app.model.Bill.create(
          {
            user_id: sender_id,
            name: '付款',
            amount: orderAmount,
            payment_type,
            type: 1
          },
          { transaction: t }
        );

        await t.commit();

        resolve({
          order: _order
        });
      } catch (err) {
        await t.rollback();

        reject({
          message: err.message
        });
      }
    });
  }

  async cancel(id, sender_id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _order = await app.model.Order.findOne({
          where: {
            id,
            sender_id,
            status: [0, 1]
          }
        });

        if (!_order) {
          throw new Error('订单无效');
        }

        switch (_order.status) {
          case 0:
            _order.status = 4;
            _order.has_refunded = true;

            break;
          case 1:
            _order.status = 3;

            break;
          default:
            break;
        }

        await _order.save();

        resolve({
          order: _order
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async finish(id, user_id, user_type) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        let _order = null;

        if (user_type === 1) {
          _order = await app.model.Order.findOne({
            where: {
              id,
              sender_id: user_id,
              status: [1]
            }
          });
        } else if (user_type === 2) {
          _order = await app.model.Order.findOne({
            where: {
              id,
              receiver_id: user_id,
              status: [1]
            }
          });
        }

        if (!_order) {
          throw new Error('订单无效');
        }

        _order.status = 2;

        if (user_type === 1) {
          _order.has_finished = true;
        }

        await _order.save();

        resolve({
          order: _order
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async autoFinish() {
    const { app, config } = this;

    let deadline = 86400;
    if (config.service && config.service.auto_finish_order) {
      deadline = config.service.auto_finish_order.deadline || 86400;
    }

    return new Promise(async (resolve, reject) => {
      try {
        const _orders = await app.model.Order.findAll({
          where: {
            status: [1],
            has_finished: false
          }
        });

        let i = 0,
          l = _orders.length || 0;

        for (i; i < l; i++) {
          const _order = _orders[i];

          if (Date.now() / 1000 - _order.updated_at / 1000 >= deadline) {
            _order.status = 2;
            _order.has_finished = true;
            try {
              await _order.save();
            } catch (err) {}
          }
        }

        resolve();
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async confirm(id, receiver_id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      /************ 开启事务 ************/
      const t = await app.model.transaction();

      try {
        /************ 查询订单 ************/
        const _order = await app.model.Order.findOne({
          where: {
            id,
            receiver_id,
            status: [0]
          }
        });

        if (!_order) {
          throw new Error('无效的订单');
        }

        _order.status = 1;
        _order.has_paid = true;
        await _order.save({ transaction: t });

        /************ 新建收款账单 ************/
        const orderAmount = parseFloat(_order.amount);

        await app.model.Bill.create(
          {
            user_id: receiver_id,
            name: '收款',
            amount: orderAmount,
            type: 0
          },
          { transaction: t }
        );

        await t.commit();

        resolve({
          order: _order
        });
      } catch (err) {
        await t.rollback();

        reject({
          message: err.message
        });
      }
    });
  }

  async close(id, receiver_id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      /************ 开启事务 ************/
      const t = await app.model.transaction();

      try {
        /************ 查询订单 ************/
        const _order = await app.model.Order.findOne({
          where: {
            id,
            receiver_id,
            status: [0, 1, 3]
          }
        });

        if (!_order) {
          throw new Error('无效的订单');
        }

        if (!_order.has_paid) {
          _order.status = 4;
          _order.has_refunded = true;
          await _order.save({ transaction: t });
          await t.commit();

          resolve({
            order: _order
          });

          return;
        }

        /************ 查询付款方 ************/
        const _receiver = await app.model.User.findById(receiver_id);
        if (!_receiver || _receiver.status !== 0) {
          throw new Error('付款方账户无效');
        }

        /************ 查询退款方 ************/
        const sender_id = _order.sender_id;
        const _sender = await app.model.User.findById(sender_id);
        if (!_sender || _sender.status !== 0) {
          throw new Error('退款方账户无效');
        }

        const orderAmount = parseFloat(_order.amount);
        const senderBalance = parseFloat(_sender.balance);

        _sender.balance = senderBalance + orderAmount;
        await _sender.save({ transaction: t });

        const receiverBalance = parseFloat(_receiver.balance);
        _receiver.balance = receiverBalance - orderAmount;
        await _receiver.save({ transaction: t });

        _order.status = 4;
        _order.has_refunded = true;
        await _order.save({ transaction: t });

        /************ 新建收款付款账单 ************/
        await app.model.Bill.create(
          {
            user_id: sender_id,
            name: '收款方退还',
            amount: orderAmount,
            type: 0
          },
          { transaction: t }
        );

        await app.model.Bill.create(
          {
            user_id: receiver_id,
            name: '退回付款方',
            amount: orderAmount,
            type: 1
          },
          { transaction: t }
        );

        await t.commit();

        resolve({
          order: _order
        });
      } catch (err) {
        await t.rollback();

        reject({
          message: err.message
        });
      }
    });
  }
}

module.exports = OrderService;
