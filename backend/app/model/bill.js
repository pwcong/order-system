'use strict';

const UserModel = require('./user');

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
        model: UserModel(app),
        key: 'id'
      }
    },
    name: {
      type: STRING,
      allowNull: false
    },
    amount: {
      type: DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    balance_before: {
      type: DECIMAL,
      allowNull: false
    },
    balance_after: {
      type: DECIMAL,
      allowNull: false
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
