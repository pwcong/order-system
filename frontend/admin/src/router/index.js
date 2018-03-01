import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '@/views/layout/Layout';

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: _import('dashboard/index')
      }
    ]
  },
  { path: '/404', component: _import('404'), hidden: true }
];

export const businessRouterMap = [
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Order',
        component: _import('order/index'),
        meta: { title: '订单', icon: 'buycar' }
      }
    ]
  },
  {
    path: '/recipe',
    component: Layout,
    meta: { title: '菜单', icon: 'food' },
    children: [
      {
        path: 'index',
        name: 'Recipe',
        component: _import('recipe/index'),
        meta: { title: '所有菜单', icon: 'list' }
      },
      {
        path: 'category',
        name: 'RecipeCategory',
        component: _import('recipe/category'),
        meta: { title: '菜单分类', icon: 'category' }
      }
    ]
  },
  {
    path: '/bill',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Bill',
        component: _import('bill/index'),
        meta: { title: '账单', icon: 'bill' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    meta: { title: '设置', icon: 'setting' },
    children: [
      {
        path: 'index',
        name: 'Setting-Preview',
        component: _import('setting/index'),
        meta: { title: '预览', icon: 'eye' }
      },
      {
        path: 'edit',
        name: 'Setting-Edit',
        component: _import('setting/edit'),
        meta: { title: '编辑', icon: 'edit' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

export const enterpriseRouterMap = [
  {
    path: '/manage',
    component: Layout,
    meta: { title: '管理', icon: 'manager' },
    children: [
      {
        path: 'business',
        name: 'Manage-Businesses',
        component: _import('manage/business'),
        meta: { title: '店家', icon: 'shop' }
      },
      {
        path: 'business_details',
        name: 'Manage-Businesses-Details',
        component: _import('manage/business_details'),
        hidden: true,
        meta: { title: '店家详情' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    meta: { title: '设置', icon: 'setting' },
    children: [
      {
        path: 'index',
        name: 'Setting-Preview',
        component: _import('setting/index'),
        meta: { title: '预览', icon: 'eye' }
      },
      {
        path: 'edit',
        name: 'Setting-Edit',
        component: _import('setting/edit'),
        meta: { title: '编辑', icon: 'edit' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
