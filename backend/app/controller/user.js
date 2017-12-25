'use strict';

const Controller = require('egg').Controller;

const jwt = require('jwt-simple');

class UserController extends Controller {
  /**
   * 注册客户
   */
  async registerCustomer() {
    const { username, phone, password } = this.ctx.request.body;

    if (!username || !phone || !password) {
      this.ctx.body = {
        success: false,
        message: '缺失参数',
        code: this.ctx.code.SERVICE_ERROR
      };
    }

    const res = await this.service.user.register(username, phone, password, 1);

    if (res.success) {
      const { id, type } = res.payload;

      const _token = jwt.encode(
        {
          id,
          type
        },
        this.config.auth.secret
      );

      const token = id + ':' + _token;

      await this.app.redis.set(token, new Date());

      this.ctx.body = {
        success: true,
        message: '注册成功',
        code: this.ctx.code.STATUS_OK,
        payload: {
          token
        }
      };
    } else {
      this.ctx.body = {
        success: false,
        message: res.message,
        code: this.ctx.code.SERVICE_ERROR
      };
    }
  }

  /**
   * 注册商户
   */
  async registerBusiness() {}

  /**
   * 注册企业
   */
  async registerEnterprise() {}

  /**
   * 登录用户
   */
  async login() {}

  /**
   * 锁定用户
   */
  async lock() {}

  /**
   * 解锁用户
   */
  async unlock() {}
}
module.exports = UserController;
