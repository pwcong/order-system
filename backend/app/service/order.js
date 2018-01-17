'use strict';

const Service = require('egg').Service;

const { generateOrderId } = require('../utils/order');

class OrderService extends Service {
  async create(sender_id, receiver_id, name, details, amount) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _order = await app.model.Order.create({
          id: generateOrderId(),
          sender_id,
          receiver_id,
          name,
          details,
          amount
        });

        if (!_order) {
          reject({
            message: '创建失败'
          });
          return;
        }

        resolve({
          order: _order
        });
      } catch (err) {
        reject({
          message: err
        });
      }
    });
  }
}

module.exports = OrderService;
