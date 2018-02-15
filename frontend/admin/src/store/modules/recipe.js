import { getRecipes, getRecipesWithCategoryId } from '@/api/recipe';

export default {
  state: {
    recipes: [],
    userId: '',
    categoryId: '',
    pageSize: 15,
    pageNo: 1
  },

  mutations: {
    RECIPE_SET_RECIPES: (state, recipes) => {
      state.recipes = recipes;
    },
    RECIPE_SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    RECIPE_SET_CATEGORYID: (state, categoryId) => {
      state.categoryId = categoryId;
    },
    RECIPE_SET_PAGESIZE: (state, pageSize) => {
      state.pageSize = pageSize;
    },
    RECIPE_SET_PAGENO: (state, pageNo) => {
      state.pageNo = pageNo;
    }
  },

  actions: {
    LoadRecipesWithCategoryId({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        const { userId, categoryId, pageSize, pageNo } = payload;

        userId && commit('RECIPE_SET_USERID', userId);
        categoryId && commit('RECIPE_SET_CATEGORYID', categoryId);
        pageSize && commit('RECIPE_SET_PAGESIZE', pageSize);
        pageNo && commit('RECIPE_SET_PAGENO', pageNo);

        getRecipesWithCategoryId(state.userId, state.categoryId, state.pageSize, state.pageNo)
          .then(response => {
            commit('RECIPE_SET_RECIPES', response.payload.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    LoadAllRecipes({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        const { userId, pageSize, pageNo } = payload;

        userId && commit('RECIPE_SET_USERID', userId);
        pageSize && commit('RECIPE_SET_PAGESIZE', pageSize);
        pageNo && commit('RECIPE_SET_PAGENO', pageNo);

        getRecipes(state.userId, state.pageSize, state.pageNo)
          .then(response => {
            commit('RECIPE_SET_RECIPES', response.payload.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
