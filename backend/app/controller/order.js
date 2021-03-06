'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  /**
   * 创建订单
   */
  async create() {
    const { app, ctx, service } = this;

    try {
      const { details, address } = ctx.request.body;

      if (!details || !address) {
        throw new Error('参数不足');
      }

      const sender_id = ctx.user.id;
      const receiver_id = ctx.params.id;

      const res = await service.order.create(sender_id, receiver_id, details, address);

      app.io
        .of('/business')
        .to(receiver_id)
        .emit('msg', {
          type: 'BUSINESS_NEW_ORDER',
          success: true,
          message: '收到新的订单!',
          code: ctx.code.STATUS_OK
        });

      ctx.body = {
        success: true,
        message: '创建成功',
        code: ctx.code.STATUS_OK,
        payload: res.order
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
   * 获取发起的订单
   */
  async getSendedList() {
    const { ctx, service } = this;

    try {
      const { status } = ctx.request.body;
      const { filter } = ctx.params;

      const { pageSize, pageNo } = ctx.query;

      const sender_id = ctx.user.id;

      const res = await service.order.findSendedOrdersWithStatus(sender_id, status);

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: ctx.pager(ctx.filter(res.orders, filter), pageSize, pageNo)
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
   * 获取接收的订单
   */
  async getReceivedList() {
    const { ctx, service } = this;

    try {
      const { status } = ctx.request.body;
      const { filter } = ctx.params;

      const { pageSize, pageNo } = ctx.query;

      const receiver_id = ctx.user.id;

      const res = await service.order.findReceivedOrdersWithStatus(receiver_id, status);

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: ctx.pager(ctx.filter(res.orders, filter), pageSize, pageNo)
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
   * 获取接收的订单统计
   */
  async getReceivedListStatistics() {
    const { ctx, service } = this;

    try {
      const { filter } = ctx.params;

      const receiver_id = ctx.user.id;

      const res = await service.order.findReceivedOrdersWithStatus(receiver_id, [0, 1, 2, 3, 4]);
      const orders = ctx.filter(res.orders, filter);

      let ingCounts = 0,
        canceledCounts = 0,
        finishedCounts = 0;
      orders.forEach((order, idx) => {
        switch (order.status) {
          case 0:
          case 1:
          case 3:
            ingCounts++;
            break;
          case 2:
            finishedCounts++;
            break;
          case 4:
            canceledCounts++;
            break;
          default:
            break;
        }
      });

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: {
          ingCounts,
          canceledCounts,
          finishedCounts
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
   * 获取指定店家接收的订单统计（需企业权限）
   */
  async getSpecialReceivedListStatistics() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.request.body;
      if (!id || Object.prototype.toString.call(id) !== '[object Array]' || id.length <= 0) {
        throw new Error('参数不足');
      }

      const { filter } = ctx.params;

      const parent_id = ctx.user.id;

      const res = await service.order.findReceivedOrdersWithStatus(id, [0, 1, 2, 3, 4], parent_id);
      const orders = ctx.filter(res.orders, filter);

      let ingCounts = 0,
        canceledCounts = 0,
        finishedCounts = 0;
      orders.forEach((order, idx) => {
        switch (order.status) {
          case 0:
          case 1:
          case 3:
            ingCounts++;
            break;
          case 2:
            finishedCounts++;
            break;
          case 4:
            canceledCounts++;
            break;
          default:
            break;
        }
      });

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: {
          ingCounts,
          canceledCounts,
          finishedCounts
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
   * 确认订单（余额付款）
   */
  async pay() {
    const { ctx, service, app } = this;

    try {
      const { id } = ctx.params;
      const sender_id = ctx.user.id;

      const res = await service.order.pay(id, sender_id, 1);

      app.io
        .of('/business')
        .to(res.order.receiver_id + '')
        .emit('msg', {
          type: 'BUSINESS_PAY_ORDER',
          success: true,
          message: '确认新的订单!',
          code: ctx.code.STATUS_OK
        });

      ctx.body = {
        success: true,
        message: '支付订单',
        code: ctx.code.STATUS_OK,
        payload: res.order
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
   * 完成订单
   */
  async finish() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.params;
      const user_id = ctx.user.id;
      const user_type = ctx.user.type;

      const res = await service.order.finish(id, user_id, user_type);

      ctx.body = {
        success: true,
        message: '完成订单',
        code: ctx.code.STATUS_OK,
        payload: res.order
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
   * 取消订单
   */
  async cancel() {
    const { ctx, service, app } = this;

    try {
      const { id } = ctx.params;
      const sender_id = ctx.user.id;

      const res = await service.order.cancel(id, sender_id);

      app.io
        .of('/business')
        .to(res.order.receiver_id + '')
        .emit('msg', {
          type: 'BUSINESS_CANCEL_ORDER',
          success: true,
          message: '取消新的订单!',
          code: ctx.code.STATUS_OK
        });

      ctx.body = {
        success: true,
        message: '取消订单',
        code: ctx.code.STATUS_OK,
        payload: res.order
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
   * 确认订单
   */
  async confirm() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.params;
      const receiver_id = ctx.user.id;

      const res = await service.order.confirm(id, receiver_id);

      ctx.body = {
        success: true,
        message: '确认订单',
        code: ctx.code.STATUS_OK,
        payload: res.order
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
   * 关闭订单
   */
  async close() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.params;
      const receiver_id = ctx.user.id;

      const res = await service.order.close(id, receiver_id);

      ctx.body = {
        success: true,
        message: '关闭订单',
        code: ctx.code.STATUS_OK,
        payload: res.order
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
module.exports = OrderController;
