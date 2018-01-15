'use strict';

const Controller = require('egg').Controller;

class RecipeController extends Controller {
  /**
   * 添加菜单信息
   */
  async create() {
    const { ctx, service } = this;

    const { category_id, name, price, avatar, content } = ctx.request.body;

    if (!category_id || !name || !price || !avatar || !content) {
      ctx.body = {
        success: false,
        message: '缺少参数',
        code: ctx.code.STATUS_ERROR
      };
      return;
    }
  }

  /**
   * 查询菜单信息
   */
  async search() {}

  /**
   * 修改菜单信息
   */
  async modify() {}

  /**
   * 删除菜单信息
   */
  async remove() {}
}
module.exports = RecipeController;
