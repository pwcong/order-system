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
          reject({
            message: '创建失败'
          });
          return;
        }

        resolve({
          recipeCategory: _recipeCategory
        });
      } catch (err) {
        reject({
          message: err
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
          reject({
            message: '分类不存在'
          });
          return;
        }

        resolve({
          recipeCategory: _recipeCategory
        });
      } catch (err) {
        reject({
          message: err
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
          message: err
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
          reject({
            message: '分类不存在'
          });
          return;
        }

        if (_recipeCategory.user_id !== user_id) {
          reject({
            message: '没有权限'
          });
          return;
        }

        _recipeCategory.name = newName;
        await _recipeCategory.save();

        resolve({
          recipeCategory: _recipeCategory
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
        const _recipeCategory = await app.model.RecipeCategory.findById(id);

        if (!_recipeCategory || _recipeCategory.status !== 0) {
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
          message: err
        });
      }
    });
  }
}

module.exports = RecipeCategoryService;
