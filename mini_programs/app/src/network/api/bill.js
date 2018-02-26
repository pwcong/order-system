import request from '../request';

import { BASE_API } from '@/const/config';

export function getBills(token, type, filter, pageSize = 15, pageNo = 1) {
  return request(
    `${BASE_API}/bills/${filter}?pageSize=${pageSize}&pageNo=${pageNo}`,
    'POST',
    {
      'X-Token': token
    },
    {
      type
    }
  );
}

export function billsStatistics(token, filter) {
  return request(`${BASE_API}/bills/statistics/${filter}`, 'GET', {
    'X-Token': token
  });
}
