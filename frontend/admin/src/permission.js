import router from './router';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth'; // 验权

const whiteList = ['/login']; // 不重定向白名单

/**
 * 校验用户类型
 * @param {int} type
 * @param {function} next
 */
function checkType(type, next, NProgress) {
  if ([2, 3, 999].indexOf(type) < 0) {
    store.dispatch('FedLogOut').then(() => {
      Message.error('用户类型不匹配');
      next({ path: '/login' });
      NProgress.done();
    });
  } else {
    next();
  }
}

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (!store.getters.type || !store.getters.id) {
      store
        .dispatch('Check')
        .then(res => {
          const { type } = res;
          checkType(type, next, NProgress);
        })
        .catch(err => {
          Message.error(err);
          next({ path: '/login' });
          NProgress.done();
        });
    } else {
      if (to.path === '/login') {
        next({ path: '/' });
        NProgress.done();
      } else {
        checkType(store.getters.type, next, NProgress);
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
