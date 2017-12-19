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

    // const decoded = jwt.decode(token, options.secret);


    const flag = await ctx.app.redis.get(token);
    if (!flag) {
      ctx.body = {
        success: false,
        code: ctx.code.TOKEN_ERROR
      };
      return;
    }


    const t = flag.split(':');
    

    console.log(flag);

    await next();
  };
};

exports.authUserType = options => {
  return async (ctx, next) => {
    await next();
  };
};
