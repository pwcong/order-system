import { createAction } from 'redux-actions';
import {
  ACTION_GET_ORDERS,
  ACTION_PAY_ORDER,
  ACTION_CANCEL_ORDER,
  ACTION_FINISH_ORDER,
  ACTION_CREATE_ORDER,
  ACTION_GET_MORE_ORDERS
} from '../types/order';

import { createOrder, getOrders, payOrder, cancelOrder, finishOrder } from '@/network/api/order';

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

export const asyncGetMoreOrders = createAction(ACTION_GET_MORE_ORDERS, params => {
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

export const asyncPayOrder = createAction(ACTION_PAY_ORDER, params => {
  return payOrder(params.token, params.id);
});
export const asyncCancelOrder = createAction(ACTION_CANCEL_ORDER, params => {
  return cancelOrder(params.token, params.id);
});
export const asyncFinishOrder = createAction(ACTION_FINISH_ORDER, params => {
  return finishOrder(params.token, params.id);
});
