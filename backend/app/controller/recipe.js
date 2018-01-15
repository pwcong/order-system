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

    const user_id = ctx.user.id;

    try {
      const res = await service.recipe.create(user_id, category_id, name, price, avatar, content);

      ctx.body = {
        success: true,
        message: '创建成功',
        code: ctx.code.STATUS_OK,
        payload: res.recipe
      };
    } catch (err) {
      ctx.body = {
        success: false,
        message: err.message,
        code: ctx.code.STATUS_ERROR
      };
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
