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

      const { pageSize, pageNo } = ctx.query;
      const id = ctx.user.id;

      const res = await service.bill.search(id, type);

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

  async statistics() {
    const { ctx, service } = this;

    try {
      const { filter } = ctx.params;

      const id = ctx.user.id;

      const res = await service.bill.search(id, [0, 1]);
      const bills = ctx.filter(res.bills, filter);

      let _in = 0,
        _out = 0;

      bills.forEach((bill, idx) => {
        if (bill.type === 0) {
          _in += parseFloat(bill.amount) || 0;
        } else if (bill.type === 1) {
          _out += parseFloat(bill.amount) || 0;
        }
      });

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: {
          in: (_in || 0).toFixed(2),
          out: (_out || 0).toFixed(2)
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

  async specialStatistics() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.request.body;
      if (!id || Object.prototype.toString.call(id) !== '[object Array]' || id.length <= 0) {
        throw new Error('参数不足');
      }

      const { filter } = ctx.params;

      const parent_id = ctx.user.id;

      const res = await service.bill.search(id, [0, 1], parent_id);
      const bills = ctx.filter(res.bills, filter);

      let _in = 0,
        _out = 0;

      bills.forEach((bill, idx) => {
        if (bill.type === 0) {
          _in += parseFloat(bill.amount) || 0;
        } else if (bill.type === 1) {
          _out += parseFloat(bill.amount) || 0;
        }
      });

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: {
          in: (_in || 0).toFixed(2),
          out: (_out || 0).toFixed(2)
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
module.exports = BillController;
