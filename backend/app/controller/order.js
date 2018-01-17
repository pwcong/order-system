'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  /**
   * 创建订单
   */
  async create() {
    const { ctx, service } = this;

    try {
      const { details } = ctx.request.body;

      if (!details) {
        throw new Error('参数不足');
      }

      const sender_id = ctx.user.id;
      const receiver_id = ctx.params.id;

      const res = await service.order.create(sender_id, receiver_id, details);

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

      if (!status) {
        throw new Error('参数不足');
      }

      const { pageSize, pageNo } = ctx.query;

      const sender_id = ctx.user.id;

      const res = await service.order.findSendedOrdersWithStatus(
        sender_id,
        status,
        parseInt(pageSize),
        parseInt(pageNo)
      );

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: res.orders
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

      if (!status) {
        throw new Error('参数不足');
      }

      const { pageSize, pageNo } = ctx.query;

      const receiver_id = ctx.user.id;

      const res = await service.order.findReceivedOrdersWithStatus(
        receiver_id,
        status,
        parseInt(pageSize),
        parseInt(pageNo)
      );

      ctx.body = {
        success: true,
        message: '获取成功',
        code: ctx.code.STATUS_OK,
        payload: res.orders
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
  async finish() {}

  /**
   * 取消订单
   */
  async cancel() {}

  /**
   * 关闭订单
   */
  async close() {}
}
module.exports = OrderController;
