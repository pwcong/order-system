import { handleActions } from 'redux-actions';
import { ACTION_GET_RECIPECATEGORIES } from '../types/recipe_category';

export default handleActions(
  {
    [ACTION_GET_RECIPECATEGORIES](state, action) {
      return {
        ...state,
        recipeCategories: action.payload
      };
    }
  },
  {
    recipeCategories: []
  }
);
