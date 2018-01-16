const jwt = require('jwt-simple');

const TYPES = [1, 2, 3, 999];

/**
 * 校验用户token
 * @param {object} options
 */
exports.authToken = options => {
  return async (ctx, next) => {
    const token = ctx.get('X-Token');

    if (!token) {
      ctx.body = {
        success: false,
        code: ctx.code.TOKEN_NEEDED,
        message: '用户令牌缺失，请登录'
      };
      return;
    }

    try {
      const value = await ctx.app.redis.get(token);

      if (!value) {
        ctx.body = {
          success: false,
          code: ctx.code.TOKEN_EXPIRED,
          message: '用户令牌失效，请重新登录'
        };
        return;
      }

      const content = jwt.decode(value, options.secret);

      const { id, type, timestamp } = content;

      if (!id || !type || !timestamp) {
        ctx.body = {
          success: false,
          code: ctx.code.TOKEN_ERROR,
          message: '用户令牌无效，请重新登录'
        };
        return;
      }

      if (
        options.checkExpired &&
        new Date().getTime() - parseInt(timestamp) >= (options.expiredTime * 1000 || 86400000)
      ) {
        ctx.body = {
          success: false,
          code: ctx.code.TOKEN_EXPIRED,
          message: '用户令牌失效，请重新登录'
        };
        return;
      }

      ctx.user = {};
      ctx.user.id = id;
      ctx.user.type = type;
      ctx.user.timestamp = timestamp;

      await next();
    } catch (err) {
      ctx.body = {
        success: false,
        code: ctx.code.TOKEN_ERROR,
        message: '用户令牌无效，请登录'
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
        code: ctx.code.USERTYPE_MISMATCH,
        message: '用户类型不匹配'
      };
      return;
    }

    await next();
  };
};
