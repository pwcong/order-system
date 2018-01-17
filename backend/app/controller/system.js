'use strict';

const Controller = require('egg').Controller;

class SystemController extends Controller {
  async time() {
    const { ctx } = this;

    ctx.body = {
      success: true,
      message: '获取成功',
      code: ctx.code.STATUS_OK,
      payload: {
        time: new Date().getTime()
      }
    };
  }
}
module.exports = SystemController;
