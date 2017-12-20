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
    }
  });

  return PaymentType;
};
