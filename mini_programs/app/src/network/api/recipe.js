import request from '../request';

import { BASE_API } from '@/const/config';

export function getAllRecipes(userId) {
  return request(`${BASE_API}/recipes/${userId}`, 'GET');
}

export function getRecipesWithCategoryId(userId, categoryId) {
  return request(`${BASE_API}/recipes/${userId}/${categoryId}`, 'GET');
}
