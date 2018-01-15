'use strict';

const Controller = require('egg').Controller;

class UserInfoController extends Controller {
  /**
   * 查询用户信息
   */
  async search() {
    const { app, ctx, service, config } = this;

    const id = ctx.params.id || ctx.user.id;

    if (!id) {
      ctx.body = {
        success: false,
        message: '缺少参数',
        code: ctx.code.STATUS_ERROR
      };
      return;
    }

    try {
      const res = await service.userInfo.get(id);

      const { userInfo } = res;

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: userInfo
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
  async modifySelf() {
    const { app, ctx, service, config } = this;

    const newUserInfo = ctx.request.body;

    if (!newUserInfo) {
      ctx.body = {
        success: false,
        message: '缺少参数',
        code: ctx.code.STATUS_ERROR
      };
      return;
    }

    const id = ctx.user.id;

    try {
      const res = await service.userInfo.modifySelf(id, newUserInfo);

      ctx.body = {
        success: true,
        message: '修改成功',
        code: ctx.code.STATUS_OK,
        payload: res.userInfo
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
  async modifyOther() {}
}
module.exports = UserInfoController;
