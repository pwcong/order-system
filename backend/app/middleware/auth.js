'use strict';

const jwt = require('jwt-simple');

exports.authToken = options => {
  return async (ctx, next) => {
    const token = ctx.get('token');

    if (!token) {
      ctx.body = {
        success: false,
        code: ctx.code.TOKEN_NEEDED
      };
      return;
    }

    const t = token.split(':');
    if (t.length !== 2 || !t[0] || !t[1]) {
      ctx.body = {
        success: false,
        code: ctx.code.TOKEN_ERROR
      };
      return;
    }

    const flag = await ctx.app.redis.get(token);
    const decoded = jwt.decode(t[1], options.auth.secret);
    if (
      !flag ||
      !decoded ||
      decoded.id == null ||
      decoded.id !== parseInt(t[0]) ||
      decoded.uid == null ||
      decoded.type == null
    ) {
      ctx.body = {
        success: false,
        code: ctx.code.TOKEN_ERROR
      };
      return;
    }
    ctx.user = {};
    ctx.user.id = decoded.id;
    ctx.user.uid = decoded.uid;
    ctx.user.type = decoded.type;

    if (
      options.checkExpired &&
      Date.now() - new Date(flag) <= options.auth.expiredTime * 1000
    ) {
      ctx.body = {
        success: false,
        code: ctx.code.TOKEN_EXPIRED
      };
      return;
    }

    await next();
  };
};

exports.authUserType = options => {
  return async (ctx, next) => {
    await next();
  };
};
