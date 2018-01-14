const jwt = require('jwt-simple');

const TYPES = [1, 2, 3, 999];

/**
 * 校验用户token
 * @param {object} authOptions
 */
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
        message: 'Token无效，请重新登录'
      };
      return;
    }

    const flag = await ctx.app.redis.get(token);

    try {
      const decoded = jwt.decode(t[1], authOptions.secret);

      if (
        !flag ||
        !parseInt(decoded.id) ||
        parseInt(decoded.id) !== parseInt(t[0]) ||
        !parseInt(decoded.type) ||
        TYPES.indexOf(parseInt(decoded.type)) < 0
      ) {
        ctx.body = {
          success: false,
          code: ctx.code.TOKEN_ERROR,
          message: 'Token无效，请重新登录'
        };
        return;
      }

      if (
        authOptions.checkExpired &&
        new Date().getTime() - parseInt(flag) >= authOptions.expiredTime * 1000
      ) {
        ctx.body = {
          success: false,
          code: ctx.code.TOKEN_EXPIRED,
          message: 'Token失效，请重新登录'
        };
        return;
      }

      ctx.user = {};
      ctx.user.id = decoded.id;
      ctx.user.type = decoded.type;
      ctx.user.timestamp = decoded.timestamp;

      await next();
    } catch (err) {
      ctx.body = {
        success: false,
        code: ctx.code.TOKEN_ERROR,
        message: 'Token无效，请重新登录'
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
