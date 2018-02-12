'use strict';

const Service = require('egg').Service;

class PaymentTypeService extends Service {
  async search(id, type) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const condition = {
          user_id: id
        };

        if (type && type.length > 0) {
          condition.type = type;
        }

        const _bills = await app.model.Bill.findAll({
          where: condition
        });

        resolve({
          bills: _bills
        });
      } catch (err) {
        reject({
          message: err
        });
      }
    });
  }
}

module.exports = PaymentTypeService;
