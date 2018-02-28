'use strict';

const Controller = require('egg').Controller;

class EvaluationController extends Controller {
  /**
   * 评价订单
   */
  async evaluateOrder() {
    const { ctx, service } = this;

    try {
      const { userEvaluation, recipeEvaluation } = ctx.request.body;

      if (!userEvaluation || !recipeEvaluation) {
        throw new Error('参数不足');
      }

      const { id } = ctx.params;
      const userId = ctx.user.id;

      await service.evaluation.evaluateOrder(id, userId, userEvaluation, recipeEvaluation);

      ctx.body = {
        success: true,
        message: '评价成功',
        code: ctx.code.STATUS_OK
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
   * 查询用户评价
   */
  async queryUserEvaluations() {
    const { ctx, service } = this;

    try {
      const { id, filter } = ctx.params;
      const { pageSize, pageNo } = ctx.query;

      const res = await service.evaluation.findUserEvaluations(id);

      ctx.body = {
        success: true,
        message: '查询成功',
        code: ctx.code.STATUS_OK,
        payload: ctx.pager(ctx.filter(res.evaluations, filter), pageSize, pageNo)
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
   * 查询菜单评价
   */
  async queryRecipeEvaluations() {
    const { ctx, service } = this;

    try {
      const { id, filter } = ctx.params;
      const { pageSize, pageNo } = ctx.query;

      const res = await service.evaluation.findRecipeEvaluations(id);

      ctx.body = {
        success: true,
        message: '查询成功',
        code: ctx.code.STATUS_OK,
        payload: ctx.pager(ctx.filter(res.evaluations, filter), pageSize, pageNo)
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

module.exports = EvaluationController;
