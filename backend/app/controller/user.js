'use strict';

const Controller = require('egg').Controller;

const moment = require('moment');
const jwt = require('jwt-simple');

class UserController extends Controller {
  /**
   * 注册
   */
  async register() {
    const { app, ctx, service, config } = this;

    const { username, password, phone, type } = ctx.request.body;

    if (!username || !password || !phone || !type) {
      ctx.body = {
        success: false,
        message: '参数不足',
        code: this.ctx.code.STATUS_ERROR
      };
      return;
    }

    if ([1, 2, 3].indexOf(type) < 0) {
      ctx.body = {
        success: false,
        message: '参数有误',
        code: this.ctx.code.STATUS_ERROR
      };
      return;
    }

    // Todo 校验参数

    try {
      const res = await service.user.register(username, password, phone, type);

      const { id } = res;

      const _token = jwt.encode(
        {
          id,
          type,
          timestamp: Date.now()
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
    } catch (err) {
      ctx.body = {
        success: false,
        message: err.message,
        code: ctx.code.STATUS_ERROR
      };
    }
  }

  /**
   * 登录用户
   */
  async login() {
    const { app, ctx, service, config } = this;

    const { upe, pwd } = this.ctx.request.body;

    if (!upe || !pwd) {
      this.ctx.body = {
        success: false,
        message: '参数不足',
        code: this.ctx.code.STATUS_ERROR
      };
      return;
    }

    try {
      const res = await service.user.login(upe, pwd);

      const { id, type } = res;

      const content = {
        id,
        type,
        timestamp: Date.now()
      };

      const _token = jwt.encode(content, config.auth.secret);

      const token = id + ':' + _token;

      await app.redis.set(token, new Date());

      ctx.body = {
        success: true,
        message: '登录成功',
        code: ctx.code.STATUS_OK,
        payload: {
          token
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
   * 锁定用户
   */
  async lock() {}

  /**
   * 解锁用户
   */
  async unlock() {}
}
module.exports = UserController;
