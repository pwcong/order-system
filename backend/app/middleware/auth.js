'use strict';

const jwt = require('jwt-simple');

/**
 * 校验用户token
 * @param {object} options 配置信息
 */
exports.authToken = options => {
  return async (ctx, next) => {
    const token = ctx.get('X-Token');

    try {
      if (!token) {
        throw new Error(ctx.code.TOKEN_NEEDED);
      }

      const value = await ctx.app.redis.get(token);

      if (!value) {
        throw new Error(ctx.code.TOKEN_EXPIRED);
      }

      let content = null;

      try {
        content = jwt.decode(value, options.secret);
      } catch (err) {
        throw new Error(ctx.code.TOKEN_EXPIRED);
      }

      if (!content) {
        throw new Error(ctx.code.TOKEN_ERROR);
      }

      const { id, type, timestamp } = content;

      if (!id || !type || !timestamp) {
        throw new Error(ctx.code.TOKEN_ERROR);
      }

      ctx.user = {
        id,
        type,
        timestamp
      };

      await next();
    } catch (err) {
      ctx.body = {
        success: false,
        code: parseInt(err.message) || 40000,
        message: '用户令牌验证失败'
      };
    }
  };
};

/**
 * 校验用户类型，需要先校验token
 * @param {int} types
 */
exports.authUserType = types => {
  return async (ctx, next) => {
    if (!ctx.user || !ctx.user.type || types.indexOf(ctx.user.type) < 0) {
      ctx.body = {
        success: false,
        code: ctx.code.STATUS_ERROR,
        message: '没有权限'
      };
      return;
    }

    await next();
  };
};
