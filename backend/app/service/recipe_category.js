'use strict';

const Service = require('egg').Service;

const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

class UserService extends Service {
  async create(user_id, name) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipeCategory = await app.model.RecipeCategory.create({
          user_id,
          name
        });

        resolve({
          id: _recipeCategory.id,
          name
        });
      } catch (err) {
        reject({
          message: '未知错误'
        });
      }
    });
  }

  async findByUserId(user_id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipeCategories = await app.model.RecipeCategory.findAll({
          user_id
        });

        resolve({
          recipeCategories: _recipeCategories
        });
      } catch (err) {
        reject({
          message: '未知错误'
        });
      }
    });
  }

  async remove(user_id, id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipeCategory = await app.model.RecipeCategory.findById(id);

        if (!_recipeCategory) {
          reject({
            message: '分类不存在'
          });
          return;
        }

        if (_recipeCategory.user_id !== user_id) {
          reject({
            message: '删除失败'
          });
          return;
        }

        _recipeCategory.status = 1;
        await _recipeCategory.save();

        resolve();
      } catch (err) {
        reject({
          message: '删除失败'
        });
      }
    });
  }
}

module.exports = UserService;
