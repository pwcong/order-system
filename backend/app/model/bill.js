'use strict';

module.exports = app => {
  const { STRING, INTEGER, DECIMAL } = app.Sequelize;

  const Bill = app.model.define('bill', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: app.model.User,
        key: 'id'
      }
    },
    name: {
      type: STRING,
      allowNull: false
    },
    amount: {
      type: DECIMAL(10, 2),
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
     * 账单类型
     * 0.收入 1.支出
     */
    type: {
      type: INTEGER,
      allowNull: false
    }
  });

  return Bill;
};
