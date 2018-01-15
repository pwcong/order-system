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
          reject({
            message: '创建失败'
          });
          return;
        }

        resolve({
          recipe: _recipe
        });
      } catch (err) {
        reject({
          message: err
        });
      }
    });
  }

  async findByUserId(user_id, pageSize = 50, pageNo = 1) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipes = await app.model.Recipe.findAll({
          where: {
            user_id
          },
          limit: pageSize,
          offset: pageSize * (pageNo - 1)
        });

        resolve({
          recipes: _recipes.filter(item => [0, 1].indexOf(item.status) > 0)
        });
      } catch (err) {
        reject({
          message: err
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
          reject({
            message: '菜单不存在'
          });
          return;
        }

        if (_recipe.user_id !== user_id) {
          reject({
            message: '没有权限'
          });
          return;
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
          message: err
        });
      }
    });
  }

  async remove(user_id, id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipe = await app.model.Recipe.findById(id);

        if (!_recipe || [0, 1].indexOf(_recipe.status) < 0) {
          reject({
            message: '菜单不存在'
          });
          return;
        }

        if (_recipe.user_id !== user_id) {
          reject({
            message: '没有权限'
          });
          return;
        }

        _recipe.status = 2;

        await _recipe.save();

        resolve();
      } catch (err) {
        reject({
          message: err
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

  async changeStatus(user_id, id, status) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipe = await app.model.Recipe.findById(id);

        if (!_recipe || [0, 1].indexOf(_recipe.status) < 0) {
          reject({
            message: '菜单不存在'
          });
          return;
        }

        if (_recipe.user_id !== user_id) {
          reject({
            message: '没有权限'
          });
          return;
        }

        _recipe.status = status;

        await _recipe.save();

        resolve();
      } catch (err) {
        reject({ message: err });
      }
    });
  }
}

module.exports = RecipeService;