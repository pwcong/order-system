'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async default() {
    const { ctx } = this;

    this.ctx.body = {
      params: ctx.params,
      queries: ctx.queries,
      body: ctx.request.body
    };
  }
}
module.exports = TestController;
