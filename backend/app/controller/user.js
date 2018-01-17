'use strict';

const Controller = require('egg').Controller;

const moment = require('moment');
const jwt = require('jwt-simple');

const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

class UserController extends Controller {
  /**
   * 注册
   */
  async register() {
    const { app, ctx, service, config } = this;

    try {
      const { username, password, phone, type } = ctx.request.body;

      if (!username || !password || !phone || !type) {
        throw new Error('参数不足');
      }

      if ([1, 2, 3].indexOf(type) < 0) {
        throw new Error('参数有误');
      }

      // Todo 校验参数

      const res = await service.user.register(username, password, phone, type);

      const { id } = res;
      const timestamp = new Date().getTime();

      const salt = uuidv1();
      const _token = uuidv5(id + ':' + type + ':' + timestamp, salt);

      const content = jwt.encode(
        {
          id,
          type,
          timestamp
        },
        config.auth.secret
      );

      const token = id + ':' + _token;

      await app.redis.set(token, content);

      ctx.body = {
        success: true,
        message: '注册成功',
        code: ctx.code.STATUS_OK,
        payload: {
          token,
          id,
          type,
          timestamp
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

    try {
      const { upe, password } = ctx.request.body;

      if (!upe || !password) {
        throw new Error('参数不足');
      }

      const res = await service.user.login(upe, password);

      const { id, type } = res;
      const timestamp = new Date().getTime();

      const salt = uuidv1();
      const _token = uuidv5(id + ':' + type + ':' + timestamp, salt);

      const content = jwt.encode(
        {
          id,
          type,
          timestamp
        },
        config.auth.secret
      );

      const token = id + ':' + _token;

      await app.redis.set(token, content);

      ctx.body = {
        success: true,
        message: '登录成功',
        code: ctx.code.STATUS_OK,
        payload: {
          token,
          id,
          type,
          timestamp
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

    const { id, type, timestamp } = ctx.user;

    ctx.body = {
      success: true,
      code: ctx.code.STATUS_OK,
      message: '验证成功',
      payload: {
        id,
        type,
        timestamp
      }
    };
  }

  /**
   * 锁定用户
   */
  async lock() {
    const { ctx, service } = this;

    const { id } = ctx.params;

    try {
      await service.user.lock(id);
      ctx.body = {
        success: true,
        message: '锁定成功',
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

  /**
   * 解锁用户
   */
  async unlock() {
    const { ctx, service } = this;

    const { id } = ctx.params;

    try {
      await service.user.unlock(id);
      ctx.body = {
        success: true,
        message: '解锁成功',
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

  /**
   * 注销用户
   */
  async remove() {
    const { ctx, service } = this;

    const { id } = ctx.params;

    try {
      await service.user.remove(id);
      ctx.body = {
        success: true,
        message: '注销成功',
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
module.exports = UserController;
