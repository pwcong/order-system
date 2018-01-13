'use strict';

const jwt = require('jwt-simple');

exports.authToken = authOptions => {
  return async (ctx, next) => {
    const token = ctx.get('X-Token');

    if (!token) {
      ctx.body = {
        success: false,
        code: ctx.code.TOKEN_NEEDED,
        message: 'Token缺失，请登录'
      };
      return;
    }

    const t = token.split(':');
    if (t.length !== 2 || !t[0] || !t[1]) {
      ctx.body = {
        success: false,
        code: ctx.code.TOKEN_ERROR,
        message: '无效的Token，请重新登录'
      };
      return;
    }

    const flag = await ctx.app.redis.get(token);
    const decoded = jwt.decode(t[1], authOptions.secret);
    if (!flag || !decoded || decoded.id == null || decoded.id !== parseInt(t[0]) || decoded.type == null) {
      ctx.body = {
        success: false,
        code: ctx.code.TOKEN_ERROR,
        message: '无效的Token，请重新登录'
      };
      return;
    }
    ctx.user = {};
    ctx.user.id = decoded.id;
    ctx.user.type = decoded.type;

    if (authOptions.checkExpired && Date.now() - new Date(flag) <= authOptions.expiredTime * 1000) {
      ctx.body = {
        success: false,
        code: ctx.code.TOKEN_EXPIRED,
        message: 'Token失效，请重新登录'
      };
      return;
    }

    await next();
  };
};

exports.authUserType = types => {
  return async (ctx, next) => {
    if (!ctx.user || !ctx.user.type || types.indexOf(type) < 0) {
      ctx.body = {
        success: false,
        code: ctx.code.USERTYPE_MISMATCH,
        message: '当前用户类型没有权限'
      };
      return;
    }

    await next();
  };
};
