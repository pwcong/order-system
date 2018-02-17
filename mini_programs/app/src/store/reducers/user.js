import { handleActions } from 'redux-actions';
import { ACTION_SEARCH_BUSINESS } from '../types/user';

export default handleActions(
  {
    [ACTION_SEARCH_BUSINESS](state, action) {
      return {
        ...state,
        business: action.payload
      };
    }
  },
  {
    business: {
      id: 1,
      type: 2,
      userInfo: {
        id: 1,
        nickname: 'business',
        birthday: null,
        sex: 0,
        address: '',
        contact: '',
        intro: '',
        avatar: '',
        banner: ''
      }
    }
  }
);
