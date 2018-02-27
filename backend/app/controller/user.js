'use strict';

const Controller = require('egg').Controller;

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
      const { username, password, type } = ctx.request.body;

      if (!username || !password || !type) {
        throw new Error('参数不足');
      }

      if ([1, 2, 3].indexOf(type) < 0) {
        throw new Error('参数有误');
      }

      // Todo 校验参数

      const res = await service.user.register(username, password, type);

      const { id } = res.user;
      const timestamp = new Date().getTime();

      const _token = uuidv5(id + ':' + type + ':' + timestamp, uuidv1());

      const content = {
        id,
        type,
        timestamp
      };

      if (config.auth.checkExpired) {
        content.exp = Date.now() / 1000 + (config.auth.expiredTime || 86400);
      }

      const token = id + ':' + _token;
      const encoded = jwt.encode(content, config.auth.secret);

      await app.redis.set(token, encoded);

      ctx.body = {
        success: true,
        message: '注册成功',
        code: ctx.code.STATUS_OK,
        payload: {
          token,
          id: res.user.id,
          type: res.user.type,
          timestamp,
          userInfo: res.user.user_info
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
      const { username, password } = ctx.request.body;

      if (!username || !password) {
        throw new Error('参数不足');
      }

      const res = await service.user.login(username, password);

      const { id, type } = res.user;

      const timestamp = new Date().getTime();

      const _token = uuidv5(id + ':' + type + ':' + timestamp, uuidv1());

      const content = {
        id,
        type,
        timestamp
      };

      if (config.auth.checkExpired) {
        content.exp = Date.now() / 1000 + (config.auth.expiredTime || 86400);
      }

      const token = id + ':' + _token;
      const encoded = jwt.encode(content, config.auth.secret);

      await app.redis.set(token, encoded);

      ctx.body = {
        success: true,
        message: '登录成功',
        code: ctx.code.STATUS_OK,
        payload: {
          token,
          id: res.user.id,
          type: res.user.type,
          timestamp,
          userInfo: res.user.user_info
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
    const { ctx, service, config, app } = this;

    try {
      const token = ctx.get('X-Token');

      const { id, type, timestamp } = ctx.user;

      const content = {
        id,
        type,
        timestamp
      };

      if (config.auth.checkExpired) {
        content.exp = Date.now() / 1000 + (config.auth.expiredTime || 86400);
      }

      const encoded = jwt.encode(content, config.auth.secret);

      await app.redis.set(token, encoded);

      const res = await service.userInfo.queryById(id);

      ctx.body = {
        success: true,
        code: ctx.code.STATUS_OK,
        message: '验证成功',
        payload: {
          id,
          type,
          token,
          timestamp,
          userInfo: res.userInfo
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

  /**
   * 修改密码
   */
  async modifyPWD() {
    const { ctx, service } = this;

    try {
      const { password } = ctx.request.body;

      if (!password) {
        throw new Error('参数不足');
      }

      const { id, timestamp } = ctx.user;

      const res = await service.user.modifyPWD(id, password);

      ctx.body = {
        success: true,
        code: ctx.code.STATUS_OK,
        message: '修改成功',
        payload: {
          id: res.user.id,
          type: res.user.type,
          timestamp,
          userInfo: res.user.user_info
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
   * 查询店家
   */
  async searchBusiness() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.params;

      const res = await service.user.searchBusiness(id);

      ctx.body = {
        success: true,
        code: ctx.code.STATUS_OK,
        message: '查询成功',
        payload: {
          id: res.user.id,
          type: res.user.type,
          userInfo: res.user.user_info
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
   * 查询店家
   */
  async queryBalance() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.user;

      const res = await service.user.searchById(id);

      ctx.body = {
        success: true,
        code: ctx.code.STATUS_OK,
        message: '查询成功',
        payload: {
          balance: res.user.balance
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
