import { combineReducers } from 'redux';
import user from './user';
import recipe from './recipe';
import recipeCategory from './recipe_category';
import order from './order';
import bill from './bill';

export default combineReducers({
  user,
  recipe,
  recipeCategory,
  order,
  bill
});
