import request from '../request';

import { BASE_API } from '@/const/config';

export function getUserEvaluations(id, pageSize = 15, pageNo = 1) {
  return request(`${BASE_API}/evaluation/user/${id}?pageSize=${pageSize}&pageNo=${pageNo}`, 'GET');
}

export function getRecipeEvaluations(id, pageSize = 15, pageNo = 1) {
  return request(`${BASE_API}/evaluation/recipe/${id}?pageSize=${pageSize}&pageNo=${pageNo}`, 'GET');
}
