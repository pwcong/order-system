'use strict';

module.exports = app => {
  class EnterpriseController extends app.Controller {
    async disconnect() {}

    async disconnecting() {}

    async error() {}
  }

  return EnterpriseController;
};
