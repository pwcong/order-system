import { createAction } from 'redux-actions';
import { ACTION_GET_RECIPECATEGORIES } from '../types/recipe_category';

import { getRecipeCategories } from '@/network/api/recipe_category';

export const asyncGetRecipeCategories = createAction(ACTION_GET_RECIPECATEGORIES, id => {
  return new Promise((resolve, reject) => {
    getRecipeCategories(id)
      .then(res => {
        resolve(res.payload.data);
      })
      .catch(err => {
        reject(err);
      });
  });
});
