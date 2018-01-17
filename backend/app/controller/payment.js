'use strict';

const Controller = require('egg').Controller;

class PaymentController extends Controller {
  async support() {
    const { ctx, service } = this;

    try {
      const res = await service.paymentType.search();

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: res.paymentTypes
      };
    } catch (err) {
      ctx.body = {
        success: false,
        message: err.message,
        code: ctx.code.STATUS_ERROR
      };
    }
  }
}
module.exports = PaymentController;
