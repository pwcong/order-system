import { getRecipeCategories } from '@/api/recipe_category';

export default {
  state: {
    userId: '',
    recipeCategories: [],
    pageSize: 15,
    pageNo: 1
  },

  mutations: {
    RECIPECATEGORY_SET_RECIPECATEGORIES: (state, recipeCategories) => {
      state.recipeCategories = recipeCategories;
    },
    RECIPECATEGORY_SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    RECIPECATEGORY_SET_PAGESIZE: (state, pageSize) => {
      state.pageSize = pageSize;
    },
    RECIPECATEGORY_SET_PAGENO: (state, pageNo) => {
      state.pageNo = pageNo;
    }
  },

  actions: {
    LoadRecipeCategories({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        const { userId, pageSize, pageNo } = payload;

        userId && commit('RECIPECATEGORY_SET_USERID', userId);
        pageSize && commit('RECIPECATEGORY_SET_PAGESIZE', pageSize);
        pageNo && commit('RECIPECATEGORY_SET_PAGENO', pageNo);

        getRecipeCategories(state.userId, state.pageSize, state.pageNo)
          .then(response => {
            commit('RECIPECATEGORY_SET_RECIPECATEGORIES', response.payload.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
