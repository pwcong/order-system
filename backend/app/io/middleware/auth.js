'use strict';

const jwt = require('jwt-simple');

module.exports = app => {
  return async (ctx, next) => {
    const options = app.config.auth;
    const socket = ctx.socket;

    try {
      const { token } = ctx.socket.handshake.query;

      if (!token) {
        throw new Error('用户令牌缺失，请登录');
      }

      const value = await app.redis.get(token);

      if (!value) {
        throw new Error('用户令牌失效，请重新登录');
      }

      const content = jwt.decode(value, options.secret);

      const { id, type, timestamp } = content;

      if (!id || !type || !timestamp) {
        throw new Error('用户令牌无效，请重新登录');
      }

      if (
        options.checkExpired &&
        new Date().getTime() - parseInt(timestamp) >= (options.expiredTime * 1000 || 86400000)
      ) {
        throw new Error('用户令牌失效，请重新登录');
      }
      socket.join(id);
    } catch (err) {
      socket.disconnect();
    }
    await next();
  };
};
