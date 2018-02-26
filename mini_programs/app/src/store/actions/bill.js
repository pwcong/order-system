import { createAction } from 'redux-actions';
import { ACTION_GET_BILLS, ACTION_GET_MORE_BILLS, ACTION_BILLS_STATISTICS } from '../types/bill';

import { getBills, billsStatistics } from '@/network/api/bill';

export const asyncGetBills = createAction(ACTION_GET_BILLS, params => {
  return new Promise((resolve, reject) => {
    getBills(params.token, params.type, params.filter, params.pageSize, params.pageNo)
      .then(res => {
        resolve(res.payload);
      })
      .catch(err => {
        reject(err);
      });
  });
});

export const asyncGetMoreBills = createAction(ACTION_GET_MORE_BILLS, params => {
  return new Promise((resolve, reject) => {
    getBills(params.token, params.type, params.filter, params.pageSize, params.pageNo)
      .then(res => {
        resolve(res.payload);
      })
      .catch(err => {
        reject(err);
      });
  });
});

export const asyncBillsStatistics = createAction(ACTION_BILLS_STATISTICS, params => {
  return new Promise((resolve, reject) => {
    billsStatistics(params.token, params.filter)
      .then(res => {
        resolve(res.payload);
      })
      .catch(err => {
        reject(err);
      });
  });
});
