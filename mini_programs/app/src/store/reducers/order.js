import { handleActions } from 'redux-actions';
import {
  ACTION_GET_ORDERS,
  ACTION_PAY_ORDER,
  ACTION_CANCEL_ORDER,
  ACTION_FINISH_ORDER,
  ACTION_CREATE_ORDER
} from '../types/order';

export default handleActions(
  {
    [ACTION_GET_ORDERS](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }

      return {
        ...state,
        orders: action.payload
      };
    },
    [ACTION_CREATE_ORDER](state, action) {
      return {
        ...state
      };
    }
  },
  {
    orders: []
  }
);
