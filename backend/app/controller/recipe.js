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
   * 查询菜单列表
   */
  async searchByUserId() {
    const { ctx, service } = this;

    const { user_id } = ctx.params;

    const { pageSize, pageNo } = ctx.queries;

    try {
      const res = await service.recipe.findByUserId(user_id, pageSize, pageNo);

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: res.recipes
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
   * 查询菜单列表
   */
  async searchByUserIdWithCategoryId() {
    const { ctx, service } = this;

    const { user_id, category_id } = ctx.params;

    const { pageSize, pageNo } = ctx.queries;

    try {
      const res = await service.recipe.findByUserIdWithCategoryId(user_id, category_id, pageSize, pageNo);

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: res.recipes
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
   * 获取菜单信息
   */
  async searchById() {
    const { ctx, service } = this;

    const { id } = ctx.params;

    try {
      const res = await service.recipe.findById(id);

      ctx.body = {
        success: true,
        message: '获取成功',
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
   * 修改菜单信息
   */
  async modify() {}

  /**
   * 删除菜单信息
   */
  async remove() {}
}
module.exports = RecipeController;
