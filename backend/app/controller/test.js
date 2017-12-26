'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async default() {
    this.ctx.body = {
      status: 'ok'
    };
  }
}
module.exports = TestController;
