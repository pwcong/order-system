import { createAction } from 'redux-actions';
import {
  ACTION_GET_RECIPES,
  ACTION_PLUS_RECIPE,
  ACTION_MINUS_RECIPE,
  ACTION_CLEAR_RECIPESINCART,
  ACTION_VIEW_RECIPE,
  ACTION_SET_ADDRESS
} from '../types/recipe';

import { getAllRecipes, getRecipesWithCategoryId } from '@/network/api/recipe';

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

export const asyncGetRecipesWithCategoryId = createAction(ACTION_GET_RECIPES, params => {
  return new Promise((resolve, reject) => {
    getRecipesWithCategoryId(params.userId, params.categoryId)
      .then(res => {
        resolve(res.payload.data);
      })
      .catch(err => {
        reject(err);
      });
  });
});

export const asyncPlusRecipeInCart = createAction(ACTION_PLUS_RECIPE, recipe => recipe);
export const asyncMinusRecipeInCart = createAction(ACTION_MINUS_RECIPE, recipe => recipe);

export const asyncClearRecipeInCart = createAction(ACTION_CLEAR_RECIPESINCART, () => ({}));
export const asyncSetAddress = createAction(ACTION_SET_ADDRESS, address => address);

export const asyncViewRecipe = createAction(ACTION_VIEW_RECIPE, recipe => recipe);
