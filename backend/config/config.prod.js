'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  config.auth = {
    checkExpired: true
  };

  // 数据库配置
  // config.sequelize = {
  //   database: 'order_system'
  // };

  return config;
};
