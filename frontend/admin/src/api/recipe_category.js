import request from '@/utils/request';

export function getRecipeCategories(userId, pageSize = '', pageNo = '') {
  return request({
    url: `/recipe_categories/${userId}?pageSize=${pageSize}&pageNo=${pageNo}`,
    method: 'get'
  });
}

export function upRecipeCategory(id) {
  return request({
    url: `/recipe_category/up/${id}`,
    method: 'post'
  });
}

export function createRecipeCategory(name) {
  return request({
    url: '/recipe_category/create',
    method: 'post',
    data: {
      name
    }
  });
}

export function downRecipeCategory(id) {
  return request({
    url: `/recipe_category/down/${id}`,
    method: 'post'
  });
}

export function removeRecipeCategory(id) {
  return request({
    url: `/recipe_category/remove/${id}`,
    method: 'post'
  });
}

export function modifyRecipeCategory(id, name) {
  return request({
    url: `/recipe_category/${id}`,
    method: 'post',
    data: {
      name
    }
  });
}
