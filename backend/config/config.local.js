'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  config.auth = {
    checkExpired: false
  };

  // 数据库配置
  config.sequelize = {
    database: 'order_system_test'
  };

  return config;
};
