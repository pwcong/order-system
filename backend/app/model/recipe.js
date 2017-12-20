'use strict';

const UserModel = require('./user');
const RecipeCategoryModel = require('./recipe_category');

module.exports = app => {
  const { STRING, INTEGER, DECIMAL, TEXT } = app.Sequelize;

  const Recipe = app.model.define('recipe', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: INTEGER,
      references: {
        model: UserModel(app),
        key: 'id'
      }
    },
    category_id: {
      type: INTEGER,
      references: {
        model: RecipeCategoryModel(app),
        key: 'id'
      }
    },
    name: {
      type: STRING,
      allowNull: false
    },
    price: {
      type: DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    avatar: STRING,
    content: TEXT,

    /**
     * 菜单状态
     * 0.正常 1.下线 2.删除
     */
    status: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  return Recipe;
};
