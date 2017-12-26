'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const UserInfo = app.model.define('user_info', {
    id: {
      type: INTEGER,
      primaryKey: true,
      references: {
        model: app.model.User,
        key: 'id'
      }
    },
    nickname: STRING,
    birthday: DATE,

    /**
     * 性别
     * 0.未知 1.男 2.女
     */
    sex: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    address: STRING,
    intro: STRING,
    avatar: STRING
  });

  return UserInfo;
};
