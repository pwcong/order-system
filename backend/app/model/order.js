'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, BOOLEAN, DECIMAL } = app.Sequelize;

  const Order = app.model.define('order', {
    /**
     * 订单号，长度为26位数
     * 订单前缀（2位） + 订单类型（2） + 时间（17位） + 随机数（5位） = 26位，例如：
     * 66 00  20170101000000000 00000
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

    sender_info_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: app.model.UserInfo,
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

    receiver_info_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: app.model.UserInfo,
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
     * 订单详情(JSON)
     * {
     *  [id: 1, name: '蛋糕', counts: 1]
     *  ...
     * }
     */
    details: {
      type: TEXT,
      allowNull: false
    },

    address: {
      type: TEXT,
      allowNull: false
    },

    /**
     * 订单状态
     * 0.发起 1.已支付 2.已完成 3.取消中 4.已取消
     */
    status: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    /**
     * 是否支付订单
     */
    has_paid: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: 0
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
      type: DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    }
  });

  Order.associate = function() {
    this.belongsTo(app.model.UserInfo, {
      as: 'receiver_info',
      foreignKey: 'receiver_info_id'
    });
    this.belongsTo(app.model.UserInfo, {
      as: 'sender_info',
      foreignKey: 'sender_info_id'
    });
  };

  return Order;
};
