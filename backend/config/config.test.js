'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  config.auth = {
    checkExpired: false
  };

  return config;
};
