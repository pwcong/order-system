import wepy from 'wepy';

import { handleActions } from 'redux-actions';
import {
  ACTION_SEARCH_BUSINESS,
  ACTION_LOGIN,
  ACTION_REGISTER,
  ACTION_CHECK,
  ACTION_MODIFYPWD
} from '../types/user';

export default handleActions(
  {
    [ACTION_SEARCH_BUSINESS](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }
      return {
        ...state,
        business: action.payload
      };
    },
    [ACTION_LOGIN](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }

      wepy.setStorageSync('token', action.payload.token);

      return {
        ...state,
        token: action.payload.token,
        check: true,
        type: action.payload.type,
        id: action.payload.id,
        userInfo: action.payload.userInfo
      };
    },
    [ACTION_REGISTER](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }

      wepy.setStorageSync('token', action.payload.token);

      return {
        ...state,
        token: action.payload.token,
        check: true,
        type: action.payload.type,
        id: action.payload.id,
        userInfo: action.payload.userInfo
      };
    },
    [ACTION_CHECK](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }
      return {
        ...state,
        token: action.payload.token,
        check: true,
        type: action.payload.type,
        id: action.payload.id,
        userInfo: action.payload.userInfo
      };
    },
    [ACTION_MODIFYPWD](state, action) {
      return {
        ...state
      };
    }
  },
  {
    business: {},
    check: false,
    token: null,
    id: null,
    type: null,
    userInfo: {}
  }
);
