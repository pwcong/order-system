'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // Cookie签名密钥
  config.keys = appInfo.name + '_powered_by_pwcong';

  // 安全设置
  config.security = {
    csrf: { enable: false }
  };

  // 启用超级管理员
  config.admin = {
    enable: true,
    password: '123456',
    phone: '13800138000',
    email: 'pwcong@foxmail.com'
  };

  // 中间件配置
  config.middleware = [];

  // 静态文件路由配置
  config.static = {
    prefix: '/public/',
    dir: 'app/public'
  };

  // Token验证设置
  config.auth = {
    secret: 'order_system',
    checkExpired: true,
    expiredTime: 86400
  };

  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,POST'
  };

  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    database: 'order_system',
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
