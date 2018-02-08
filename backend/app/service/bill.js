'use strict';

const Service = require('egg').Service;

class PaymentTypeService extends Service {
  async search(id, type, filter) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _bills = await app.model.Bill.findAll({
          where: {
            user_id: id,
            type
          }
        });

        const now = new Date();

        resolve({
          bills: _bills.filter((bill, idx) => {
            if (!filter) {
              return true;
            }

            const d = new Date(bill.created_at);
            const _d = new Date(filter.replace(/\-/g, '/'));

            switch (true) {
              case /^today$/.test(filter):
                return (
                  now.getFullYear() === d.getFullYear() &&
                  now.getMonth() === d.getMonth() &&
                  now.getDate() === d.getDate()
                );
              case /^\d{4}\-\d{2}\-\d{2}$/.test(filter):
                return (
                  _d.getFullYear() === d.getFullYear() &&
                  _d.getMonth() === d.getMonth() &&
                  _d.getDate() === d.getDate()
                );

              case /^\d{4}\-\d{4}$/.test(filter):
                return _d.getFullYear() === d.getFullYear() && _d.getMonth() === d.getMonth();
              case /^\d{4}$/.test(filter):
                return _d.getFullYear() === d.getFullYear();
              default:
                return false;
            }
          })
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
