import request from '@/utils/request';

export function getRecipes(userId, pageSize = '', pageNo = '') {
  return request({
    url: `/recipes/${userId}?pageSize=${pageSize}&pageNo=${pageNo}`,
    method: 'get'
  });
}

export function getRecipesWithCategoryId(userId, categoryId, pageSize = '', pageNo = '') {
  return request({
    url: `/recipes/${userId}/${categoryId}?pageSize=${pageSize}&pageNo=${pageNo}`,
    method: 'get'
  });
}

export function upRecipe(id) {
  return request({
    url: `/recipe/up/${id}`,
    method: 'post'
  });
}

export function createRecipe(recipe) {
  return request({
    url: '/recipe/create',
    method: 'post',
    data: recipe
  });
}

export function downRecipe(id) {
  return request({
    url: `/recipe/down/${id}`,
    method: 'post'
  });
}

export function removeRecipe(id) {
  return request({
    url: `/recipe/remove/${id}`,
    method: 'post'
  });
}

export function modifyRecipe(id, newInfo) {
  return request({
    url: `/recipe/${id}`,
    method: 'post',
    data: newInfo
  });
}
