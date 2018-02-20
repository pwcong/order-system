import wepy from 'wepy';

import { handleActions } from 'redux-actions';
import {
  ACTION_SEARCH_BUSINESS,
  ACTION_LOGIN,
  ACTION_REGISTER,
  ACTION_CHECK,
  ACTION_MODIFYPWD,
  ACTION_MODIFYINFO,
  ACTION_LOGOUT
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
    },
    [ACTION_MODIFYINFO](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }

      return {
        ...state,
        userInfo: action.payload
      };
    },
    [ACTION_LOGOUT](state, action) {
      wepy.removeStorageSync('token');

      return {
        ...state,
        check: false,
        token: null,
        id: null,
        type: null,
        userInfo: {}
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
