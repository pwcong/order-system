import { combineReducers } from 'redux';
import user from './user';
import recipe from './recipe';
import recipeCategory from './recipe_category';
import order from './order';
import bill from './bill';
import evaluation from './evaluation';

export default combineReducers({
  user,
  recipe,
  recipeCategory,
  order,
  bill,
  evaluation
});
