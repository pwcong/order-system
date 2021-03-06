'use strict';

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
      allowNull: false,
      references: {
        model: app.model.User,
        key: 'id'
      }
    },
    category_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: app.model.RecipeCategory,
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

  Recipe.associate = function() {
    this.belongsTo(app.model.RecipeCategory, { as: 'recipe_category', foreignKey: 'category_id' });
  };

  return Recipe;
};
