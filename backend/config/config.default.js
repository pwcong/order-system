'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});

  // Cookie签名密钥
  config.keys = (appInfo.name || '') + '_powered_by_pwcong';

  // 安全设置
  config.security = {
    csrf: { enable: false }
  };

  // 开启测试接口
  config.testApi = {
    recharge: true
  };

  // 启用超级管理员
  config.admin = {
    enable: true,
    password: '123456'
  };

  // 中间件配置
  config.middleware = [];

  // 静态文件路由配置
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir || __dirname + '/..', 'public')
  };

  config.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb'
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

  config.io = {
    init: {},
    namespace: {
      '/customer': {
        connectionMiddleware: [],
        packetMiddleware: []
      },
      '/business': {
        connectionMiddleware: ['auth'],
        packetMiddleware: []
      },
      '/enterprise': {
        connectionMiddleware: [],
        packetMiddleware: []
      }
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 1
    }
  };

  // 业务配置
  config.service = {
    // 自动完成订单（已支付状态）
    auto_finish_order: {
      enable: true,
      deadline: 86400
    },

    // 自动评价订单（已完成状态）
    auto_evaluate_order: {
      enable: true,
      deadline: 592200
    }
  };

  return config;
};
