import { createAction } from 'redux-actions';
import { ACTION_SEARCH_BUSINESS } from '../types/user';

import { searchBusiness } from '@/network/api/user';

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
