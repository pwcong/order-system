'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const UserType = app.model.define('user_type', {
    id: {
      type: INTEGER,
      primaryKey: true
    },
    name: {
      type: STRING,
      allowNull: false
    }
  });

  return UserType;
};
