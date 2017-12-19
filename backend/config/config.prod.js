'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  config.auth = {
    checkExpired: true,
    expiredTime: 86400
  };

  return config;
};
