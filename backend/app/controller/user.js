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
          timestamp: new Date().getTime()
        },
        config.auth.secret
      );

      const token = id + ':' + _token;

      await app.redis.set(token, new Date().getTime());

      ctx.body = {
        success: true,
        message: '注册成功',
        code: ctx.code.STATUS_OK,
        payload: {
          token,
          id,
          type
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

    const { upe, password } = this.ctx.request.body;

    if (!upe || !password) {
      this.ctx.body = {
        success: false,
        message: '参数不足',
        code: this.ctx.code.STATUS_ERROR
      };
      return;
    }

    try {
      const res = await service.user.login(upe, password);

      const { id, type } = res;

      const content = {
        id,
        type,
        timestamp: new Date().getTime()
      };

      const _token = jwt.encode(content, config.auth.secret);

      const token = id + ':' + _token;

      await app.redis.set(token, new Date().getTime());

      ctx.body = {
        success: true,
        message: '登录成功',
        code: ctx.code.STATUS_OK,
        payload: {
          token,
          id,
          type
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
   * 用户退出
   */
  async logout() {
    const { ctx, app } = this;

    const token = ctx.get('X-Token');

    try {
      await app.redis.del(token);
    } catch (err) {}

    ctx.body = {
      success: true,
      message: '登出成功',
      code: ctx.code.STATUS_OK
    };
  }

  /**
   * 验证Token
   */
  async check() {
    const { ctx } = this;

    const { id, type } = ctx.user;

    ctx.body = {
      success: true,
      code: ctx.code.STATUS_OK,
      message: '验证成功',
      payload: {
        id,
        type
      }
    };
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
