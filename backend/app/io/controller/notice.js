module.exports = app => {
  class NoticeController extends app.Controller {
    async test() {
      const message = this.ctx.args[0];
      await this.ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
    }
  }

  return NoticeController;
};
