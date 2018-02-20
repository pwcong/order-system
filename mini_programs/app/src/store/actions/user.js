import { createAction } from 'redux-actions';
import { ACTION_SEARCH_BUSINESS } from '../types/user';

import { searchBusiness, register, login, check, modifyPWD } from '@/network/api/user';

export const asyncSearchBusiness = createAction(ACTION_SEARCH_BUSINESS, id => {
  return new Promise((resolve, reject) => {
    searchBusiness(id)
      .then(res => {
        resolve(res.payload);
      })
      .catch(err => {
        reject(err);
      });
  });
});

export const asyncLogin = createAction(ACTION_SEARCH_BUSINESS, params => {
  return login(params.username, params.password);
});
export const asyncRegister = createAction(ACTION_SEARCH_BUSINESS, params => {
  return register(params.username, params.password, 1);
});

export const asyncCheck = createAction(ACTION_SEARCH_BUSINESS, token => {
  return new Promise((resolve, reject) => {
    check(token)
      .then(res => {
        if (res.type !== 1) {
          reject({ message: '用户类型有误' });
          return;
        }
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
});

export const asyncModifyPWD = createAction(ACTION_SEARCH_BUSINESS, params => {
  return modifyPWD(params.token, params.password);
});
