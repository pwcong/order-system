'use strict';

const Controller = require('egg').Controller;

class EvaluationController extends Controller {
  /**
   * 查询账单
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
}

module.exports = EvaluationController;
