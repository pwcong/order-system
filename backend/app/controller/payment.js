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

  async up() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.params;

      await service.paymentType.up(id);

      ctx.body = {
        success: true,
        message: '上线成功',
        code: ctx.code.STATUS_OK,
        payload: {
          id
        }
      };
    } catch (err) {
      ctx.body = {
        success: false,
        message: err.message,
        code: ctx.code.STATUS_ERROR
      };
    }
  }
  async down() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.params;

      await service.paymentType.down(id);

      ctx.body = {
        success: true,
        message: '下线成功',
        code: ctx.code.STATUS_OK,
        payload: {
          id
        }
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
