import request from '../request';

import { BASE_API } from '@/const/config';

export function getRecipeCategories(userId) {
  return request(`${BASE_API}/recipe_categories/${userId}`, 'GET');
}
