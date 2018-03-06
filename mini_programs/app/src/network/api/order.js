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

export function payOrder(token, id) {
  return request(`${BASE_API}/order/pay/${id}`, 'POST', {
    'X-Token': token
  });
}
export function cancelOrder(token, id) {
  return request(`${BASE_API}/order/cancel/${id}`, 'POST', {
    'X-Token': token
  });
}
export function finishOrder(token, id) {
  return request(`${BASE_API}/order/finish/${id}`, 'POST', {
    'X-Token': token
  });
}

export function evaluateOrder(token, id, data) {
  return request(
    `${BASE_API}/order/evaluate/${id}`,
    'POST',
    {
      'X-Token': token
    },
    data
  );
}
