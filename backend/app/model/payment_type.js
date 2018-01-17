'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const PaymentType = app.model.define('payment_type', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING,
      allowNull: false
    },

    /**
     * 状态：0可用、1不可用
     */
    status: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  return PaymentType;
};
