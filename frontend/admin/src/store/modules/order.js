import { getOrders } from '@/api/order';

export default {
  state: {
    orders: [],
    orderStatus: [],
    pageSize: 15,
    pageNo: 1,
    filter: ''
  },

  mutations: {
    ORDER_SET_ORDERS: (state, orders) => {
      state.orders = orders;
    },
    ORDER_SET_ORDERSTATUS: (state, orderStatus) => {
      state.orderStatus = orderStatus;
    },
    ORDER_SET_PAGESIZE: (state, pageSize) => {
      state.pageSize = pageSize;
    },
    ORDER_SET_PAGENO: (state, pageNo) => {
      state.pageNo = pageNo;
    },
    ORDER_SET_FILTER: (state, filter) => {
      state.filter = filter;
    }
  },

  actions: {
    LoadOrders({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        const { orderStatus, pageSize, pageNo, filter } = payload;

        orderStatus && commit('ORDER_SET_ORDERSTATUS', orderStatus);
        pageSize && commit('ORDER_SET_PAGESIZE', pageSize);
        pageNo && commit('ORDER_SET_PAGENO', pageNo);
        filter && commit('ORDER_SET_FILTER', filter);

        getOrders(state.orderStatus, state.pageSize, state.pageNo, state.filter)
          .then(response => {
            commit('ORDER_SET_ORDERS', response.payload.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
