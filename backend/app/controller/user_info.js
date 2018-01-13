'use strict';

const Controller = require('egg').Controller;

class UserInfoController extends Controller {
  /**
   * 查询用户信息
   */
  async search() {
    const { app, ctx, service, config } = this;

    const { id } = this.ctx.params;

    try {
      const res = await service.userInfo.get(id);

      const { userInfo } = res;

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: {
          userInfo
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

  /**
   * 修改用户信息
   */
  async modify() {}
}
module.exports = UserInfoController;
