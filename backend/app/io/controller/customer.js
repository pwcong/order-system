'use strict';

module.exports = app => {
  class CustomerController extends app.Controller {
    async disconnect() {}

    async disconnecting() {}

    async error() {}
  }

  return CustomerController;
};
