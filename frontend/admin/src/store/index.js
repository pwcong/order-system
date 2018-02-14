import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import order from './modules/order';
import bill from './modules/bill';
import recipeCategory from './modules/recipe_category';

import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    order,
    bill,
    recipeCategory
  },
  getters
});

export default store;
