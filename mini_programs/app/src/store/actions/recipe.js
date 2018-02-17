import { createAction } from 'redux-actions';
import { ACTION_GET_RECIPES } from '../types/recipe';

import { getAllRecipes, getRecipesByCategoryId } from '@/network/api/recipe';

export const asyncGetAllRecipes = createAction(ACTION_GET_RECIPES, id => {
  return new Promise((resolve, reject) => {
    getAllRecipes(id)
      .then(res => {
        resolve(res.payload.data);
      })
      .catch(err => {
        reject(err);
      });
  });
});

export const asyncGetRecipesByCategoryId = createAction(ACTION_GET_RECIPES, params => {
  return new Promise((resolve, reject) => {
    getRecipesByCategoryId(params.userId, params.categoryId)
      .then(res => {
        resolve(res.payload.data);
      })
      .catch(err => {
        reject(err);
      });
  });
});
