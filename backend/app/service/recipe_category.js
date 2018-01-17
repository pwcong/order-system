'use strict';

const Service = require('egg').Service;

const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

class RecipeCategoryService extends Service {
  async create(user_id, name) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipeCategory = await app.model.RecipeCategory.create({
          user_id,
          name
        });

        if (!_recipeCategory) {
          throw new Error('创建失败');
        }

        resolve({
          recipeCategory: _recipeCategory
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
        const _recipeCategory = await app.model.RecipeCategory.findById(id);

        if (!_recipeCategory || _recipeCategory.status !== 0) {
          throw new Error('分类不存在');
        }

        resolve({
          recipeCategory: _recipeCategory
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
        const _recipeCategories = await app.model.RecipeCategory.findAll({
          where: {
            user_id
          }
        });

        resolve({
          recipeCategories: _recipeCategories.filter(item => item.status === 0)
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async modify(user_id, id, newName) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipeCategory = await app.model.RecipeCategory.findById(id);

        if (!_recipeCategory || _recipeCategory.status !== 0) {
          throw new Error('分类不存在');
        }

        if (_recipeCategory.user_id !== user_id) {
          throw new Error('没有权限');
        }

        _recipeCategory.name = newName;
        await _recipeCategory.save();

        resolve({
          recipeCategory: _recipeCategory
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async remove(user_id, id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipeCategory = await app.model.RecipeCategory.findById(id);

        if (!_recipeCategory || _recipeCategory.status !== 0) {
          throw new Error('分类不存在');
        }

        if (_recipeCategory.user_id !== user_id) {
          throw new Error('没有权限');
        }

        _recipeCategory.status = 1;
        await _recipeCategory.save();

        resolve();
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }
}

module.exports = RecipeCategoryService;
