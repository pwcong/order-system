'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // Cookie签名密钥
  config.keys = appInfo.name + '_powered_by_pwcong';

  // 中间件配置
  config.middleware = [];

  // 静态文件路由配置
  config.static = {
    prefix: '/public/',
    dir: 'app/public'
  };

  // Token加密密钥
  config.auth = {
    secret: 'order_system'
  };

  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,POST'
  };

  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    database: 'order_system',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: 'root'
  };

  // 缓存数据库配置
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0
    }
  };

  return config;
};
