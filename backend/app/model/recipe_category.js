'use strict';

const UserModel = require('./user');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const RecipeCategory = app.model.define('recipe_category', {
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

    /**
     * 菜单分类状态
     * 0.正常 1.删除
     */
    status: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  return RecipeCategory;
};
