import { getOrders } from '@/api/order';

export default {
  state: {
    orders: []
  },

  mutations: {
    SET_ORDERS: (state, orders) => {
      state.orders = orders;
    }
  },

  actions: {
    
    LoadOrders({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const { orderStatus, pageSize, pageNo, filter } = payload;

        getOrders(orderStatus, pageSize, pageNo, filter)
          .then(response => {
            commit('SET_ORDERS', response.payload.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
