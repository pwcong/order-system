import request from '../request';

import { BASE_API } from '@/const/config';

export function createOrder(token, id, details, address) {
  return request(
    `${BASE_API}/order/create/${id} `,
    'POST',
    {
      'X-Token': token
    },
    {
      details,
      address
    }
  );
}

export function getOrders(token, status, pageSize = 15, pageNo = 1) {
  return request(
    `${BASE_API}/orders/sended?pageSize=${pageSize}&pageNo=${pageNo}`,
    'POST',
    {
      'X-Token': token
    },
    {
      status
    }
  );
}
