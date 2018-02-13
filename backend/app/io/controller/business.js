'use strict';

const jwt = require('jwt-simple');

module.exports = app => {
  class BusinessController extends app.Controller {
    async disconnect() {}

    async disconnecting() {}

    async error() {}
  }

  return BusinessController;
};
