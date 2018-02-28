'use strict';

const Subscription = require('egg').Subscription;

const jwt = require('jwt-simple');

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10m', // 1 分钟间隔
      type: 'all' // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { app, config } = this;

    const keys = await app.redis.keys('*');

    keys.forEach(async key => {
      const value = await app.redis.get(key);

      try {
        const content = jwt.decode(value, config.auth.secret);

        if (config.auth.checkExpired) {
          const { exp } = content;
          if (!exp || Date.now() / 1000 - exp >= 0) {
            await app.redis.del(key);
          }
        }
      } catch (err) {
        await app.redis.del(key);
      }
    });
  }
}

module.exports = UpdateCache;
