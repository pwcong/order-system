'use strict';

const Controller = require('egg').Controller;

class RecipeCategoryController extends Controller {
  /**
   * 添加菜单分类
   */
  async create() {
    const { ctx, service } = this;

    const { name } = ctx.request.body;

    if (!name) {
      ctx.body = {
        success: false,
        message: '缺少参数',
        code: ctx.code.STATUS_ERROR
      };
      return;
    }

    const { id } = ctx.user;

    try {
      const recipeCategory = await service.recipeCategory.create(id, name);

      ctx.body = {
        success: false,
        message: '创建成功',
        code: ctx.code.STATUS_OK,
        payload: recipeCategory
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
   * 查询菜单分类
   */
  async search() {
    const { ctx, service } = this;

    const { id } = ctx.user;

    try {
      const res = await service.recipeCategory.findByUserId(id);

      ctx.body = {
        success: false,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: res.recipeCategories
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
   * 修改菜单分类
   */
  async modify() {}

  /**
   * 删除菜单分类
   */
  async remove() {
    const { ctx, service } = this;

    const { id } = ctx.request.body;

    if (!id) {
      ctx.body = {
        success: false,
        message: '缺少参数',
        code: ctx.fcode.STATUS_ERROR
      };
      return;
    }

    const userId = ctx.user.id;

    try {
      const recipeCategories = await service.recipeCategory.remove(userId, id);

      ctx.body = {
        success: false,
        message: '删除成功',
        code: ctx.code.STATUS_OK,
        payload: recipeCategories
      };
    } catch (err) {
      ctx.body = {
        success: false,
        message: err.message,
        code: ctx.code.STATUS_ERROR
      };
    }
  }
}
module.exports = RecipeCategoryController;
