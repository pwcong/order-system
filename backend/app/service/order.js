'use strict';

const Service = require('egg').Service;

const moment = require('moment');

const { generateOrderId } = require('../utils/order');

class OrderService extends Service {
  async create(sender_id, receiver_id, details) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _receiver = await app.model.User.findById(receiver_id);

        if (!_receiver || _receiver.status !== 0 || _receiver.type !== 2) {
          throw new Error('该商户无效');
        }

        let amount = 0;
        let recipes = [];

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
          amount
        });

        if (!_order) {
          throw new Error('创建失败');
        }

        resolve({
          order: _order
        });
      } catch (err) {
        console.log(err);
        reject({
          message: err.message
        });
      }
    });
  }

  async findSendedOrdersWithStatus(sender_id, status, pageSize, pageNo) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const condition = {
          where: {
            sender_id
          }
        };

        if (pageSize || pageNo) {
          condition.limit = pageSize || 50;
          condition.offset = (pageSize || 50) * (pageNo ? pageNo - 1 : 0);
        }

        const _orders = await app.model.Order.findAll(condition);

        console.log(_orders);

        resolve({
          orders: _orders.filter((item, idx) => status.indexOf(item.status) >= 0)
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async findReceivedOrdersWithStatus(receiver_id, status, pageSize, pageNo) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const condition = {
          where: {
            receiver_id
          }
        };

        if (pageSize || pageNo) {
          condition.limit = pageSize || 50;
          condition.offset = (pageSize || 50) * (pageNo ? pageNo - 1 : 0);
        }

        const _orders = await app.model.Order.findAll(condition);

        resolve({
          orders: _orders.filter((item, idx) => status.indexOf(item.status) >= 0)
        });
      } catch (err) {
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
        const _order = await app.model.Order.findAll({
          where: {
            id,
            sender_id
          }
        });

        if (!_order || _order.sender_id !== sender_id || [0, 1].indexOf(_order.status) < 0) {
          throw new Error('订单无效');
        }

        _order.status = 3;
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
        const _order = await app.model.Order.findAll({
          where: {
            id,
            sender_id
          }
        });

        if (!_order || _order.sender_id !== sender_id || [1].indexOf(_order.status) < 0) {
          throw new Error('订单无效');
        }

        _order.status = 2;
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
      try {
        const _order = await app.model.Order.findAll({
          where: {
            id,
            receiver_id
          }
        });

        if (!_order || _order.receiver_id !== receiver_id || [3].indexOf(_order.status) < 0) {
          throw new Error('无效的订单');
        }

        _order.status = 4;
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
}

module.exports = OrderService;
