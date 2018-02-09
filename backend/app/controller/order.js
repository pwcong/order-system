'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  /**
   * 创建订单
   */
  async create() {
    const { ctx, service } = this;

    try {
      const { details, address } = ctx.request.body;

      if (!details || !address) {
        throw new Error('参数不足');
      }

      const sender_id = ctx.user.id;
      const receiver_id = ctx.params.id;

      const res = await service.order.create(sender_id, receiver_id, details, address);

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

      if (!status) {
        throw new Error('参数不足');
      }

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

      if (!status) {
        throw new Error('参数不足');
      }

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
   * 确认订单（余额付款）
   */
  async pay() {
    const { ctx, service } = this;

    try {
      const { id } = ctx.params;
      const sender_id = ctx.user.id;

      const res = await service.order.pay(id, sender_id, 1);

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
      const sender_id = ctx.user.id;

      const res = await service.order.finish(id, sender_id);

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
    const { ctx, service } = this;

    try {
      const { id } = ctx.params;
      const sender_id = ctx.user.id;

      const res = await service.order.cancel(id, sender_id);

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
