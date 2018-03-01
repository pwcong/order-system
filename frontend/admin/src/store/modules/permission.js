import { constantRouterMap, businessRouterMap, enterpriseRouterMap } from '@/router';

export default {
  state: {
    routes: constantRouterMap,
    addRoutes: []
  },

  mutations: {
    SET_ROUTERS: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRouterMap.concat(routes);
    }
  },
  actions: {
    GenerateRoutes({ commit }, type) {
      return new Promise((resolve, reject) => {
        switch (type) {
          case 2:
            commit('SET_ROUTERS', businessRouterMap);
            break;
          case 3:
            commit('SET_ROUTERS', enterpriseRouterMap);
            break;
          default:
            break;
        }

        resolve();
      });
    }
  }
};
