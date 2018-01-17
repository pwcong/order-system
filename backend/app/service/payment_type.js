'use strict';

const Service = require('egg').Service;

class PaymentTypeService extends Service {
  async search() {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _paymentTypes = await app.model.PaymentType.findAll();

        resolve({
          paymentTypes: _paymentTypes.filter((item, idx) => item.status === 0)
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
