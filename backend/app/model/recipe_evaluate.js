'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const RecipeEvaluate = app.model.define('recipe_evaluate', {
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
        model: app.model.Recipe,
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
     * 状态
     * 0.正常 1.删除
     */
    status: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  RecipeEvaluate.associate = function() {
    this.belongsTo(app.model.UserInfo, {
      as: 'user_info',
      foreignKey: 'user_info_id'
    });
  };

  return RecipeEvaluate;
};
