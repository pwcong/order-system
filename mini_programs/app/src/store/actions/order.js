import { createAction } from 'redux-actions';
import {
  ACTION_GET_ORDERS,
  ACTION_PAY_ORDER,
  ACTION_CANCEL_ORDER,
  ACTION_FINISH_ORDER,
  ACTION_CREATE_ORDER
} from '../types/order';

import { createOrder, getOrders } from '@/network/api/order';

export const asyncGetOrders = createAction(ACTION_GET_ORDERS, params => {
  return new Promise((resolve, reject) => {
    getOrders(params.token, params.status, params.pageSize, params.pageNo)
      .then(res => {
        resolve(res.payload);
      })
      .catch(err => {
        reject(err);
      });
  });
});

export const asyncCreateOrder = createAction(ACTION_CREATE_ORDER, params => {
  return new Promise((resolve, reject) => {
    createOrder(params.token, params.id, params.details, params.address)
      .then(res => {
        resolve(res.payload);
      })
      .catch(err => {
        reject(err);
      });
  });
});
