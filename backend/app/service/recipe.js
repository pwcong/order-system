'use strict';

const Service = require('egg').Service;

const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

class RecipeService extends Service {
  async create(user_id, category_id, name, price, avatar, content) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipe = await app.model.Recipe.create({
          user_id,
          category_id,
          name,
          price,
          avatar,
          content
        });

        if (!_recipe) {
          throw new Error('创建失败');
        }

        resolve({
          recipe: _recipe
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async findByUserIdWithCategoryId(user_id, category_id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipes = await app.model.Recipe.findAll({
          where: {
            user_id,
            category_id,
            status: [0, 1]
          }
        });

        resolve({
          recipes: _recipes
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async findByUserId(user_id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipes = await app.model.Recipe.findAll({
          where: {
            user_id,
            status: [0, 1]
          }
        });

        resolve({
          recipes: _recipes
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async findById(id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipe = await app.model.Recipe.findById(id);

        if (!_recipe || [0, 1].indexOf(_recipe.status) < 0) {
          throw new Error('菜单不存在');
        }

        resolve({
          recipe: _recipe
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async modify(user_id, id, newRecipeInfo) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipe = await app.model.Recipe.findById(id);

        if (!_recipe || [0, 1].indexOf(_recipe.status) < 0) {
          throw new Error('菜单不存在');
        }

        if (_recipe.user_id !== user_id) {
          throw new Error('没有权限');
        }

        const editable = {
          category_id: true,
          name: true,
          price: true,
          avatar: true,
          content: true
        };

        Object.keys(newRecipeInfo).forEach((key, idx) => {
          if (editable[key]) {
            _recipe[key] = newRecipeInfo[key];
          }
        });

        await _recipe.save();

        resolve({
          recipe: _recipe
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async online(user_id, id) {
    return this.changeStatus(user_id, id, 0);
  }

  async offline(user_id, id) {
    return this.changeStatus(user_id, id, 1);
  }

  async remove(user_id, id) {
    return this.changeStatus(user_id, id, 2);
  }

  async changeStatus(user_id, id, status) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipe = await app.model.Recipe.findById(id);

        if (!_recipe || [0, 1].indexOf(_recipe.status) < 0) {
          throw new Error('菜单不存在');
        }

        if (_recipe.user_id !== user_id) {
          throw new Error('没有权限');
        }

        _recipe.status = status;

        await _recipe.save();

        resolve();
      } catch (err) {
        reject({ message: err.message });
      }
    });
  }
}

module.exports = RecipeService;
