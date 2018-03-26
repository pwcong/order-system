import { queryBusinesses, queryAllBusiness } from '@/api/manage';

export default {
  state: {
    id: null,
    businesses: [],
    pageSize: 15,
    pageNo: 1,
    selectedBusiness: null
  },

  mutations: {
    MANAGE_SET_ID: (state, id) => {
      state.id = id;
    },
    MANAGE_SET_BUSINESSES: (state, businesses) => {
      state.businesses = businesses;
    },
    MANAGE_SET_PAGESIZE: (state, pageSize) => {
      state.pageSize = pageSize;
    },
    MANAGE_SET_PAGENO: (state, pageNo) => {
      state.pageNo = pageNo;
    },
    MANAGE_SET_SELECTEDBUSINESS: (state, business) => {
      state.selectedBusiness = business;
    }
  },

  actions: {
    LoadBusinesses({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        const { id, pageSize, pageNo } = payload;

        id && commit('MANAGE_SET_ID', id);
        pageSize && commit('MANAGE_SET_PAGESIZE', pageSize);
        pageNo && commit('MANAGE_SET_PAGENO', pageNo);

        queryBusinesses(state.id, state.pageSize, state.pageNo)
          .then(response => {
            commit('MANAGE_SET_BUSINESSES', response.payload.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    LoadAllBusinesses({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        const { id } = payload;

        id && commit('MANAGE_SET_ID', id);

        queryAllBusiness(state.id)
          .then(response => {
            commit('MANAGE_SET_BUSINESSES', response.payload.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    SelectBusiness({ commit, state }, payload) {
      return new Promise(resolve => {
        commit('MANAGE_SET_SELECTEDBUSINESS', payload);
        resolve();
      });
    }
  }
};
