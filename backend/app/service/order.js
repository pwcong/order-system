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

          const _recipe = await app.model.Recipe.findById(item.id);

          if (!_recipe || !item.counts) {
            continue;
          }

          amount += _recipe.price * item.counts;
          recipes.push(_recipe.name + '*' + item.counts);
        }

        if (recipes.length <= 0) {
          throw new Error('订单内容为空');
        }

        const _order = await app.model.Order.create({
          id: generateOrderId(),
          sender_id,
          receiver_id,
          name: recipes.join('|'),
          details: JSON.stringify(details),
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
        const _orders = await app.model.Order.findAll({
          where: {
            sender_id,
            status
          }
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

  async findReceivedOrdersWithStatus(receiver_id, status) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _orders = await app.model.Order.findAll({
          where: {
            receiver_id,
            status
          }
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
      /** ********** 开启事务 ************/
      const t = await app.model.transaction();

      try {
        /** ********** 查询订单 ************/
        const _order = await app.model.Order.findOne({
          where: {
            id,
            sender_id
          }
        });

        if (!_order || _order.sender_id !== sender_id || _order.status !== 0) {
          throw new Error('订单无效');
        }

        /** ********** 查询收款方 ************/
        const receiver_id = _order.receiver_id;

        const _receiver = await app.model.User.findById(receiver_id);
        if (!_receiver || _receiver.status !== 0) {
          throw new Error('收款方账户无效');
        }

        /** ********** 查询付款方 ************/
        const _sender = await app.model.User.findById(sender_id);
        if (!_sender || _sender.status !== 0) {
          throw new Error('付款方账户无效');
        }

        /** ********** 更新付款方账户 ************/
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

        /** ********** 更新账单状态 ************/
        _order.status = 1;
        _order.has_payed = true;
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
            sender_id
          }
        });

        if (!_order || _order.sender_id !== sender_id || [0, 1].indexOf(_order.status) < 0) {
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

  async finish(id, sender_id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _order = await app.model.Order.findOne({
          where: {
            id,
            sender_id
          }
        });

        if (!_order || _order.sender_id !== sender_id || [1].indexOf(_order.status) < 0) {
          throw new Error('订单无效');
        }

        _order.status = 2;
        _order.has_finished = true;
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

  async close(id, receiver_id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      /** ********** 开启事务 ************/
      const t = await app.model.transaction();

      try {
        /** ********** 查询订单 ************/
        const _order = await app.model.Order.findOne({
          where: {
            id,
            receiver_id
          }
        });

        if (!_order || _order.receiver_id !== receiver_id || [3].indexOf(_order.status) < 0) {
          throw new Error('无效的订单');
        }

        /** ********** 查询付款方 ************/
        const _receiver = await app.model.User.findById(receiver_id);
        if (!_receiver || _receiver.status !== 0) {
          throw new Error('付款方账户无效');
        }

        /** ********** 查询退款方 ************/
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

        /** ********** 新建收款付款账单 ************/
        await app.model.Bill.create(
          {
            user_id: sender_id,
            name: '退款',
            amount: orderAmount,
            type: 0
          },
          { transaction: t }
        );

        await app.model.Bill.create(
          {
            user_id: receiver_id,
            name: '付款',
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
