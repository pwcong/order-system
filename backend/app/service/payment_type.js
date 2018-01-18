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

  async up(id) {
    return this.changeStatus(id, 0);
  }

  async down(id) {
    return this.changeStatus(id, 1);
  }

  async changeStatus(id, status) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _paymentType = await app.model.PaymentType.findById(id);

        if (!_paymentType) {
          throw new Error('支付类型不存在');
        }

        _paymentType.status = status;
        await _paymentType.save();

        resolve({
          paymentType: _paymentType
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }
}

module.exports = PaymentTypeService;
