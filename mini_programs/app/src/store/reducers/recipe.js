import { handleActions } from 'redux-actions';
import {
  ACTION_GET_RECIPES,
  ACTION_PLUS_RECIPE,
  ACTION_MINUS_RECIPE,
  ACTION_CLEAR_RECIPESINCART,
  ACTION_VIEW_RECIPE,
  ACTION_SET_ADDRESS
} from '../types/recipe';

export default handleActions(
  {
    [ACTION_GET_RECIPES](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }
      return {
        ...state,
        recipes: action.payload.filter(r => r.status === 0 && r.recipe_category.status === 0)
      };
    },
    [ACTION_PLUS_RECIPE](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }

      let recipesInCart = state.recipesInCart;

      if (recipesInCart['' + action.payload.id]) {
        recipesInCart['' + action.payload.id].counts++;
      } else {
        recipesInCart['' + action.payload.id] = {
          counts: 1,
          info: action.payload
        };
      }

      return {
        ...state,
        recipesInCart
      };
    },
    [ACTION_MINUS_RECIPE](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }

      let recipesInCart = state.recipesInCart;

      if (recipesInCart['' + action.payload.id]) {
        recipesInCart['' + action.payload.id].counts--;

        if (recipesInCart['' + action.payload.id].counts <= 0) {
          delete recipesInCart['' + action.payload.id];
        }
      }

      return {
        ...state,
        recipesInCart
      };
    },
    [ACTION_CLEAR_RECIPESINCART](state, action) {
      return {
        ...state,
        recipesInCart: {}
      };
    },
    [ACTION_SET_ADDRESS](state, action) {
      return {
        ...state,
        address: action.payload
      };
    },
    [ACTION_VIEW_RECIPE](state, action) {
      return {
        ...state,
        viewRecipe: action.payload
      };
    }
  },
  {
    recipes: [],
    recipesInCart: {},
    viewRecipe: {},
    address: ''
  }
);
