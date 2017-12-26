'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, BOOLEAN, DECIMAL } = app.Sequelize;

  const Order = app.model.define('order', {
    /**
     * 订单号，长度为26位数
     * 订单前缀（2位） + 订单类型（3） + 时间（17位） + 随机数（4位） = 26位，例如：
     * 66 000  20170101000000000 0000
     */
    id: {
      type: STRING,
      primaryKey: true
    },

    /**
     * 订单发起人ID
     */
    sender_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: app.model.User,
        key: 'id'
      }
    },

    /**
     * 订单接收人ID
     */
    receiver_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: app.model.User,
        key: 'id'
      }
    },

    /**
     * 订单标题
     */
    name: {
      type: STRING,
      allowNull: false
    },

    /**
     * 订单详情
     */
    details: {
      type: TEXT,
      allowNull: false
    },

    /**
     * 订单状态
     * 0.发起 1.已支付 2.已完成 3.取消 4.已取消
     */
    status: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    payment_type: {
      type: INTEGER,
      references: {
        model: app.model.PaymentType,
        key: 'id'
      }
    },

    /**
     * 是否取消订单
     */
    has_refunded: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },

    /**
     * 是否完成订单
     */
    has_finished: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },

    /**
     * 是否评价订单
     */
    has_evaluated: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },

    /**
     * 订单金额
     */
    amount: {
      type: DECIMAL,
      allowNull: false,
      defaultValue: 0
    }
  });

  return Order;
};
