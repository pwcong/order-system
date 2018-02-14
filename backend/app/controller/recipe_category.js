'use strict';

const Controller = require('egg').Controller;

class RecipeCategoryController extends Controller {
  /**
   * 添加菜单分类
   */
  async create() {
    const { ctx, service } = this;

    try {
      const { name } = ctx.request.body;

      if (!name) {
        throw new Error('参数不足');
      }

      const { id } = ctx.user;

      const res = await service.recipeCategory.create(id, name);

      ctx.body = {
        success: true,
        message: '创建成功',
        code: ctx.code.STATUS_OK,
        payload: res.recipeCategory
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
  async searchByUserId() {
    const { ctx, service } = this;

    try {
      const { user_id } = ctx.params;

      const { pageSize, pageNo } = ctx.query;

      const res = await service.recipeCategory.findByUserId(user_id);

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: ctx.pager(res.recipeCategories, pageSize, pageNo)
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
  async searchById() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.params;

      const res = await service.recipeCategory.findById(id);

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: res.recipeCategory
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
  async modify() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.params;
      const { name } = ctx.request.body;

      if (!name) {
        throw new Error('参数不足');
      }

      const user_id = ctx.user.id;

      const res = await service.recipeCategory.modify(user_id, id, name);

      ctx.body = {
        success: true,
        message: '修改成功',
        code: ctx.code.STATUS_OK,
        payload: res.recipeCategory
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
   * 删除菜单分类
   */
  async remove() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.params;
      const user_id = ctx.user.id;

      const res = await service.recipeCategory.remove(user_id, id);

      ctx.body = {
        success: true,
        message: '删除成功',
        code: ctx.code.STATUS_OK,
        payload: res.recipeCategory
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
   * 上架菜单分类
   */
  async up() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.params;
      const user_id = ctx.user.id;

      const res = await service.recipeCategory.online(user_id, id);

      ctx.body = {
        success: true,
        message: '上架成功',
        code: ctx.code.STATUS_OK,
        payload: res.recipeCategory
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
   * 下架菜单分类
   */
  async down() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.params;
      const user_id = ctx.user.id;

      const res = await service.recipeCategory.offline(user_id, id);

      ctx.body = {
        success: true,
        message: '下架成功',
        code: ctx.code.STATUS_OK,
        payload: res.recipeCategory
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
