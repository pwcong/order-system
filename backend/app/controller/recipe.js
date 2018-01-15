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
  async modify() {
    const { ctx, service } = this;

    const newRecipeInfo = ctx.request.body;

    if (!newRecipeInfo) {
      ctx.body = {
        success: false,
        message: '参数不足',
        code: ctx.code.STATUS_ERROR
      };
      return;
    }

    const { id } = ctx.params;
    const user_id = ctx.user.id;

    try {
      const res = await service.recipe.modify(user_id, id, newRecipeInfo);

      ctx.body = {
        success: true,
        message: '修改成功',
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
   * 删除菜单
   */
  async remove() {
    const { ctx, service } = this;

    const { id } = ctx.params;
    const user_id = ctx.user.id;

    try {
      const res = await service.recipe.remove(user_id, id);

      ctx.body = {
        success: true,
        message: '删除成功',
        code: ctx.code.STATUS_OK,
        payload: {
          id
        }
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
   * 上线菜单
   */
  async online() {
    const { ctx, service } = this;

    const { id } = ctx.params;
    const user_id = ctx.user.id;

    try {
      const res = await service.recipe.online(user_id, id);

      ctx.body = {
        success: true,
        message: '上线成功',
        code: ctx.code.STATUS_OK,
        payload: {
          id
        }
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
   * 下线菜单
   */
  async offline() {
    const { ctx, service } = this;

    const { id } = ctx.params;
    const user_id = ctx.user.id;

    try {
      const res = await service.recipe.offline(user_id, id);

      ctx.body = {
        success: true,
        message: '下线成功',
        code: ctx.code.STATUS_OK,
        payload: {
          id
        }
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
module.exports = RecipeController;
