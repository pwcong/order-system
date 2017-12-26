'use strict';

const Controller = require('egg').Controller;

const jwt = require('jwt-simple');

class UserController extends Controller {
  /**
   * 注册
   */
  async register() {
    const { app, ctx, service, config } = this;

    let type = null;

    switch (ctx.params.type) {
      case 'customer':
        type = 1;
        break;
      case 'business':
        type = 2;
        break;
      case 'enterprise':
        type = 3;
        break;
      default:
        break;
    }

    if (!type) {
      ctx.body = {
        success: false,
        message: '参数有误',
        code: this.ctx.code.SERVICE_ERROR
      };
      return;
    }

    const { username, password, phone } = ctx.request.body;

    if (!username || !password || !phone) {
      ctx.body = {
        success: false,
        message: '参数不足',
        code: this.ctx.code.SERVICE_ERROR
      };
      return;
    }

    // Todo 校验参数

    const res = await service.user.register(username, password, phone, type);

    console.log(res);

    if (res.success) {
      const { id, type } = res.payload;

      const _token = jwt.encode(
        {
          id,
          type
        },
        config.auth.secret
      );

      const token = id + ':' + _token;

      await app.redis.set(token, new Date());

      ctx.body = {
        success: true,
        message: '注册成功',
        code: ctx.code.STATUS_OK,
        payload: {
          token
        }
      };
      return;
    }

    ctx.body = {
      success: false,
      message: res.message,
      code: ctx.code.SERVICE_ERROR
    };
  }

  /**
   * 登录用户
   */
  async login() {
    const { upe, password } = this.ctx.request.body;

    if (!upe || !password) {
      this.ctx.body = {
        success: false,
        message: '参数不足',
        code: this.ctx.code.SERVICE_ERROR
      };
      return;
    }
  }

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
