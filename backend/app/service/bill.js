'use strict';

const Service = require('egg').Service;

class PaymentTypeService extends Service {
  async search(id, type) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _bills = await app.model.Bill.findAll({
          where: {
            user_id: id,
            type
          }
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
