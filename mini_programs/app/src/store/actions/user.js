import { createAction } from 'redux-actions';
import {
  ACTION_SEARCH_BUSINESS,
  ACTION_LOGIN,
  ACTION_REGISTER,
  ACTION_CHECK,
  ACTION_MODIFYPWD,
  ACTION_MODIFYINFO,
  ACTION_LOGOUT
} from '../types/user';

import { searchBusiness, register, login, logout, check, modifyPWD, modifyInfo } from '@/network/api/user';

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

export const asyncModifyInfo = createAction(ACTION_MODIFYINFO, params => {
  return new Promise((resolve, reject) => {
    modifyInfo(params.token, params.userInfo)
      .then(res => {
        resolve(res.payload);
      })
      .catch(err => {
        reject(err);
      });
  });
});

export const asyncLogout = createAction(ACTION_LOGOUT, token => {
  return logout(token);
});
