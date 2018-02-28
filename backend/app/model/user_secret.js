'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const UserSecret = app.model.define('user_secret', {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: app.model.User,
        key: 'id'
      }
    },
    phone: {
      type: STRING,
      unique: true
    },
    email: {
      type: STRING,
      unique: true
    }
  });

  return UserSecret;
};
