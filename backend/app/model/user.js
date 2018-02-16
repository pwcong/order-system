'use strict';

module.exports = app => {
  const { STRING, INTEGER, DECIMAL } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    /**
     * 用户类型 0.企业 1.商家 2.客户 999.管理员
     */
    type: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: app.model.UserType,
        key: 'id'
      }
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: STRING,
      unique: true
    },
    email: {
      type: STRING,
      unique: true
    },
    password: {
      type: STRING,
      allowNull: false
    },
    password_salt: {
      type: STRING,
      allowNull: false
    },

    /**
     * 用户状态 0.正常 1.锁定 2.注销
     */
    status: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    /**
     * 账户余额（保留两位）
     */
    balance: {
      type: DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    }
  });

  User.associate = function() {
    this.belongsTo(app.model.UserType, { as: 'user_type', foreignKey: 'type' });
    this.hasOne(app.model.UserInfo, { as: 'user_info', foreignKey: 'id' });
  };

  User.findByUPE = function(upe) {
    return this.findOne({
      where: {
        [app.model.Op.or]: [{ username: upe }, { phone: upe }, { email: upe }]
      },
      include: [
        {
          model: app.model.UserInfo,
          as: 'user_info'
        }
      ]
    });
  };

  User.findByUsername = function(username) {
    return this.findOne({
      where: {
        username
      },
      include: [
        {
          model: app.model.UserInfo,
          as: 'user_info'
        }
      ]
    });
  };

  User.findByPhone = function(phone) {
    return this.findOne({
      where: { phone },
      include: [
        {
          model: app.model.UserInfo,
          as: 'user_info'
        }
      ]
    });
  };

  User.findByEmail = function(email) {
    return this.findOne({
      where: { email },
      include: [
        {
          model: app.model.UserInfo,
          as: 'user_info'
        }
      ]
    });
  };

  return User;
};
