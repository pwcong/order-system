'use strict';

exports.static = true;

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
};

exports.redis = {
  enable: true,
  package: 'egg-redis'
};

exports.cors = {
  enable: true,
  package: 'egg-cors'
};

exports.io = {
  enable: true,
  package: 'egg-socket.io'
};
