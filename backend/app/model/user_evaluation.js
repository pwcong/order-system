'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT, BOOLEAN } = app.Sequelize;

  const UserEvaluation = app.model.define('user_evaluation', {
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
    user_info_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: app.model.UserInfo,
        key: 'id'
      }
    },
    target_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: app.model.User,
        key: 'id'
      }
    },

    /**
     * 评分（1-5）
     */
    score: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 5
    },

    /**
     * 评价
     */
    content: {
      type: STRING,
      allowNull: false
    },

    /**
     * 是否自动评价
     */
    is_auto: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },

    /**
     * 状态
     * 0.正常 1.删除
     */
    status: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  UserEvaluation.associate = function() {
    this.belongsTo(app.model.UserInfo, {
      as: 'user_info',
      foreignKey: 'user_info_id'
    });
  };

  return UserEvaluation;
};
