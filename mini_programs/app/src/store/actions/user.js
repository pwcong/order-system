import { createAction } from 'redux-actions';
import {
  ACTION_SEARCH_BUSINESS,
  ACTION_LOGIN,
  ACTION_REGISTER,
  ACTION_CHECK,
  ACTION_MODIFYPWD
} from '../types/user';

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

export const asyncLogin = createAction(ACTION_LOGIN, params => {
  return new Promise((resolve, reject) => {
    login(params.username, params.password)
      .then(res => {
        if (res.payload.type !== 1) {
          reject({ message: '用户类型有误' });
          return;
        }
        resolve(res.payload);
      })
      .catch(err => {
        reject(err);
      });
  });
});
export const asyncRegister = createAction(ACTION_REGISTER, params => {
  return register(params.username, params.password, 1);
});

export const asyncCheck = createAction(ACTION_CHECK, token => {
  return new Promise((resolve, reject) => {
    check(token)
      .then(res => {
        if (res.payload.type !== 1) {
          reject({ message: '用户类型有误' });
          return;
        }
        resolve(res.payload);
      })
      .catch(err => {
        reject(err);
      });
  });
});

export const asyncModifyPWD = createAction(ACTION_MODIFYPWD, params => {
  return modifyPWD(params.token, params.password);
});
