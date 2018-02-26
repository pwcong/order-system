'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async default() {
    const { ctx, app } = this;

    this.ctx.body = app.config.testApi;
  }

  async recharge() {
    const { ctx, service } = this;

    try {
      const { amount } = ctx.request.body;

      if (!amount) {
        throw new Error('参数不足');
      }

      const { id } = ctx.user;

      const res = await service.user.recharge(id, amount);

      ctx.body = {
        success: true,
        code: ctx.code.STATUS_OK,
        message: '充值成功',
        payload: {
          amount
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
module.exports = TestController;
