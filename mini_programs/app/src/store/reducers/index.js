import { combineReducers } from 'redux';
import user from './user';
import recipe from './recipe';
import recipeCategory from './recipe_category';

export default combineReducers({
  user,
  recipe,
  recipeCategory
});
