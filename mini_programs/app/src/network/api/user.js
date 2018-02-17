import request from '../request';

import { BASE_API } from '@/const/config';

export function searchBusiness(id) {
  return request(`${BASE_API}/user/business/${id}`, 'GET');
}
