'use strict';

const jwt = require('jwt-simple');

module.exports = app => {
  return async (ctx, next) => {
    const token = ctx.socket.handshake.query.token;

    if (!token) {
      await next(new Error('用户令牌无效，请重新登录'));
      return;
    }

    try {
      const value = await app.redis.get(token);

      if (!value) {
        await next(new Error('用户令牌失效，请重新登录'));
        return;
      }

      const content = jwt.decode(value, app.config.auth.secret);

      const { id, type, timestamp } = content;

      if (!id || !type || !timestamp) {
        await next(new Error('用户令牌无效，请重新登录'));
        return;
      }

      if (
        app.config.auth.checkExpired &&
        new Date().getTime() - parseInt(timestamp) >= (app.config.auth.expiredTime * 1000 || 86400000)
      ) {
        await next(new Error('用户令牌失效，请重新登录'));
        return;
      }

      ctx.user = {};
      ctx.user.id = id;
      ctx.user.type = type;
      ctx.user.timestamp = timestamp;

      await next();
    } catch (err) {
      await next(new Error('用户令牌无效，请重新登录'));
    }
  };
};
