'use strict';

const jwt = require('jwt-simple');

module.exports = app => {
  class BusinessController extends app.Controller {
    async auth() {
      const { ctx } = this;
      const options = app.config.auth;
      const socket = ctx.socket;

      try {
        const { token } = ctx.args[0];

        if (!token) {
          socket.emit('msg', {
            type: 'AUTH',
            success: false,
            code: ctx.code.TOKEN_NEEDED,
            message: '用户令牌缺失，请登录'
          });
          return;
        }

        const value = await app.redis.get(token);

        if (!value) {
          socket.emit('msg', {
            type: 'AUTH',
            success: false,
            code: ctx.code.TOKEN_EXPIRED,
            message: '用户令牌失效，请重新登录'
          });
          return;
        }

        const content = jwt.decode(value, options.secret);

        const { id, type, timestamp } = content;

        if (!id || !type || !timestamp) {
          socket.emit('msg', {
            type: 'AUTH',
            success: false,
            code: ctx.code.TOKEN_ERROR,
            message: '用户令牌无效，请重新登录'
          });
          return;
        }

        if (
          options.checkExpired &&
          new Date().getTime() - parseInt(timestamp) >= (options.expiredTime * 1000 || 86400000)
        ) {
          socket.emit('msg', {
            type: 'AUTH',
            success: false,
            code: ctx.code.TOKEN_EXPIRED,
            message: '用户令牌失效，请重新登录'
          });
          return;
        }

        socket.join(id);

        socket.emit('msg', {
          type: 'AUTH',
          success: true,
          code: ctx.code.STATUS_OK,
          message: '用户验证成功'
        });
      } catch (err) {
        socket.emit('msg', {
          type: 'AUTH',
          success: false,
          code: ctx.code.STATUS_ERROR,
          message: '用户令牌无效，请登录'
        });
      }
    }

    async disconnect() {}

    async disconnecting() {}

    async error() {}
  }

  return BusinessController;
};
