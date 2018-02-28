'use strict';

const Subscription = require('egg').Subscription;

class AutoFinishOrder extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10m', // 1 分钟间隔
      type: 'all' // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { app, config, service } = this;

    if (config.service && config.service.auto_finish_order && config.service.auto_finish_order.enable) {
      try {
        await service.order.autoFinish();
      } catch (err) {}
    }
  }
}

module.exports = AutoFinishOrder;
