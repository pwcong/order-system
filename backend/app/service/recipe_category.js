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
            user_id,
            status: [0, 1]
          },
          order: [['created_at', 'DESC']]
        });

        resolve({
          recipeCategories: _recipeCategories
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
        const _recipeCategory = await app.model.RecipeCategory.findOne({
          where: {
            id,
            status: [0, 1]
          }
        });

        if (!_recipeCategory) {
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

  async offline(user_id, id) {
    return this.changeStatus(user_id, id, 1);
  }

  async online(user_id, id) {
    return this.changeStatus(user_id, id, 0);
  }

  async remove(user_id, id) {
    return this.changeStatus(user_id, id, 2);
  }

  async changeStatus(user_id, id, status) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _recipeCategory = await app.model.RecipeCategory.findOne({
          where: {
            id,
            status: [0, 1]
          }
        });

        if (!_recipeCategory) {
          throw new Error('菜单分类不存在');
        }

        if (_recipeCategory.user_id !== user_id) {
          throw new Error('没有权限');
        }

        _recipeCategory.status = status;

        await _recipeCategory.save();

        resolve({
          recipeCategory: _recipeCategory
        });
      } catch (err) {
        reject({ message: err.message });
      }
    });
  }
}

module.exports = RecipeCategoryService;
