import { handleActions } from 'redux-actions';

import { ACTION_QUERY_EVALUATIONS, ACTION_QUERY_MORE_EVALUATIONS } from '../types/evaluation';

export default handleActions(
  {
    [ACTION_QUERY_EVALUATIONS](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }

      return {
        ...state,
        evaluations: action.payload.data
      };
    },
    [ACTION_QUERY_MORE_EVALUATIONS](state, action) {
      if (action.error) {
        return {
          ...state
        };
      }

      return {
        ...state,
        evaluations: state.evaluations.concat(action.payload.data)
      };
    }
  },
  {
    evaluations: []
  }
);
