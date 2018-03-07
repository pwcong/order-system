import { createAction } from 'redux-actions';
import {
  ACTION_QUERY_EVALUATIONS,
  ACTION_QUERY_MORE_EVALUATIONS,
  ACTION_QUERY_USER_EVALUATIONS,
  ACTION_QUERY_MORE_USER_EVALUATIONS,
  ACTION_QUERY_RECIPE_EVALUATIONS,
  ACTION_QUERY_MORE_RECIPE_EVALUATIONS
} from '../types/evaluation';

import { getUserEvaluations, getRecipeEvaluations } from '@/network/api/evaluation';

export const asyncQueryUserEvaluations = createAction(ACTION_QUERY_EVALUATIONS, params => {
  return new Promise((resolve, reject) => {
    getUserEvaluations(params.id, params.pageSize, params.pageNo)
      .then(res => {
        resolve(res.payload);
      })
      .catch(err => {
        reject(err);
      });
  });
});

export const asyncQueryMoreUserEvaluations = createAction(ACTION_QUERY_MORE_EVALUATIONS, params => {
  return new Promise((resolve, reject) => {
    getUserEvaluations(params.id, params.pageSize, params.pageNo)
      .then(res => {
        resolve(res.payload);
      })
      .catch(err => {
        reject(err);
      });
  });
});

export const asyncQueryRecipeEvaluations = createAction(ACTION_QUERY_EVALUATIONS, params => {
  return new Promise((resolve, reject) => {
    getRecipeEvaluations(params.id, params.pageSize, params.pageNo)
      .then(res => {
        resolve(res.payload);
      })
      .catch(err => {
        reject(err);
      });
  });
});

export const asyncQueryMoreRecipeEvaluations = createAction(
  ACTION_QUERY_MORE_EVALUATIONS,
  params => {
    return new Promise((resolve, reject) => {
      getRecipeEvaluations(params.id, params.pageSize, params.pageNo)
        .then(res => {
          resolve(res.payload);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
);
