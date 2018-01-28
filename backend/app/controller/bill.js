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

      const res = await service.bill.search(id, type, parseInt(pageSize), parseInt(pageNo));

      const now = new Date();

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: res.bills.filter((bill, idx) => {
          if (!filter) {
            return true;
          }

          const d = new Date(bill.created_at);
          const _d = new Date(filter.replace(/\-/g, '/'));

          switch (true) {
            case /^today$/.test(filter):
              return (
                now.getFullYear() === d.getFullYear() &&
                now.getMonth() === d.getMonth() &&
                now.getDate() === d.getDate()
              );
            case /^\d{4}\-\d{2}\-\d{2}$/.test(filter):
              return (
                _d.getFullYear() === d.getFullYear() &&
                _d.getMonth() === d.getMonth() &&
                _d.getDate() === d.getDate()
              );

            case /^\d{4}\-\d{4}$/.test(filter):
              return _d.getFullYear() === d.getFullYear() && _d.getMonth() === d.getMonth();
            case /^\d{4}$/.test(filter):
              return _d.getFullYear() === d.getFullYear();
            default:
              return false;
          }
        })
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
