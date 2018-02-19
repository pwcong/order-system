import { handleActions } from 'redux-actions';
import { ACTION_GET_RECIPECATEGORIES, ACTION_SET_RECIPECATEGORY_CHECKED } from '../types/recipe_category';

export default handleActions(
  {
    [ACTION_GET_RECIPECATEGORIES](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }

      return {
        ...state,
        recipeCategories: [
          { name: '全部', value: -1, all: true, checked: true },
          ...action.payload.map(rc => ({
            name: rc.name,
            value: rc.id,
            all: false,
            checked: false
          }))
        ]
      };
    },
    [ACTION_SET_RECIPECATEGORY_CHECKED](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }

      return {
        ...state,
        recipeCategories: state.recipeCategories.map(rc => ({
          ...rc,
          checked: rc.value === action.payload
        }))
      };
    }
  },
  {
    recipeCategories: []
  }
);
