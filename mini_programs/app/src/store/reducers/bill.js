import { handleActions } from 'redux-actions';
import { ACTION_GET_BILLS, ACTION_GET_MORE_BILLS, ACTION_BILLS_STATISTICS } from '../types/bill';

export default handleActions(
  {
    [ACTION_GET_BILLS](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }

      return {
        ...state,
        bills: action.payload.data
      };
    },
    [ACTION_GET_MORE_BILLS](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }

      return {
        ...state,
        bills: state.bills.concat(action.payload.data)
      };
    },
    [ACTION_BILLS_STATISTICS](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }

      return {
        ...state,
        in: action.payload.in,
        out: action.payload.out
      };
    }
  },
  {
    bills: [],
    in: '',
    out: ''
  }
);
