import { handleActions } from 'redux-actions';
import { ACTION_SEARCH_BUSINESS } from '../types/user';

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
    }
  },
  {
    business: {}
  }
);
