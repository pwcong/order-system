import { getBills } from '@/api/bill';

export default {
  state: {
    bills: [],
    billType: [],
    pageSize: 15,
    pageNo: 1,
    filter: ''
  },

  mutations: {
    BILL_SET_BILLS: (state, bills) => {
      state.bills = bills;
    },
    BILL_SET_BILLTYPE: (state, billType) => {
      state.billType = billType;
    },
    BILL_SET_PAGESIZE: (state, pageSize) => {
      state.pageSize = pageSize;
    },
    BILL_SET_PAGENO: (state, pageNo) => {
      state.pageNo = pageNo;
    },
    BILL_SET_FILTER: (state, filter) => {
      state.filter = filter;
    }
  },

  actions: {
    LoadBills({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        const { billType, pageSize, pageNo, filter } = payload;

        billType && commit('BILL_SET_BILLTYPE', billType);
        pageSize && commit('BILL_SET_PAGESIZE', pageSize);
        pageNo && commit('BILL_SET_PAGENO', pageNo);
        filter && commit('BILL_SET_FILTER', filter);

        getBills(state.billType, state.filter, state.pageSize, state.pageNo)
          .then(response => {
            commit('BILL_SET_BILLS', response.payload.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
