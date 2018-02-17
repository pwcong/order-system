import { handleActions } from 'redux-actions';
import { ACTION_GET_RECIPES } from '../types/recipe';

export default handleActions(
  {
    [ACTION_GET_RECIPES](state, action) {
      return {
        ...state,
        recipes: action.payload
      };
    }
  },
  {
    recipes: []
  }
);
