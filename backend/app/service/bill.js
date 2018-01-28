'use strict';

const Service = require('egg').Service;

class PaymentTypeService extends Service {
  async search(id, type, pageSize, pageNo) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const condition = {
          where: {
            user_id: id
          }
        };

        if (pageSize || pageNo) {
          condition.limit = pageSize || 50;
          condition.offset = (pageSize || 50) * (pageNo ? pageNo - 1 : 0);
        }

        const _bills = await app.model.Bill.findAll(condition);

        resolve({
          bills: _bills.filter((bill, idx) => type.indexOf(bill.type) >= 0)
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
