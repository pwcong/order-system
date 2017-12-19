'use strict';

module.exports = app => {
  return {
    schedule: {
      interval: '1m',
      type: 'all'
      // disable: app.config.env === 'local' // 本地开发环境不执行
    },
    async task(ctx) {}
  };
};
