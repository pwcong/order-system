'use strict';

const Controller = require('egg').Controller;

class BillController extends Controller {
  /**
   * 查询账单
   */
  async search() {
    const { ctx, service } = this;

    try {
      const { type } = ctx.request.body;

      const { filter } = ctx.params;

      if (!type) {
        throw new Error('参数不足');
      }

      const { pageSize, pageNo } = ctx.query;
      const id = ctx.user.id;

      const res = await service.bill.search(id, type);

      const now = new Date();

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: ctx.pager(ctx.filter(res.bills, filter), pageSize, pageNo)
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
module.exports = BillController;
