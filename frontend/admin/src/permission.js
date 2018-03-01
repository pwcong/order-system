import router from './router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { getToken } from '@/utils/auth'; // 验权

import store from './store';

const whiteList = ['/login']; // 不重定向白名单

/**
 * 校验用户类型
 * @param {int} type
 * @param {function} next
 */

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (!store.getters.checked) {
      store
        .dispatch('Check')
        .then(res => {
          store.dispatch('GenerateRoutes', res.payload.type).then(() => {
            router.addRoutes(store.getters.addRoutes);
            next({ ...to, replace: true });
          });
        })
        .catch(err => {
          next('/login');
          NProgress.done();
        });
    } else {
      if (to.path === '/login') {
        next({ path: '/' });
        NProgress.done();
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
