'use strict';

const Controller = require('egg').Controller;

class AttachmentController extends Controller {
  /**
   * 查询账单
   */
  async upload() {
    const { ctx, service } = this;

    try {
      const id = ctx.user.id;

      const stream = await ctx.getFileStream();

      const res = await service.attachment.save(id, stream);

      ctx.body = {
        success: true,
        message: '上传成功',
        code: ctx.code.STATUS_OK,
        payload: res
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
module.exports = AttachmentController;
