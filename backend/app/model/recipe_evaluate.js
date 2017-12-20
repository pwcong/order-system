'use strict';

const UserModel = require('./user');
const RecipeModel = require('./recipe');

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
        model: UserModel(app),
        key: 'id'
      }
    },
    recipe_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: RecipeModel(app),
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

  return RecipeEvaluate;
};
