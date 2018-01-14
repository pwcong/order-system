import Vue from 'vue';

import MintUI from 'mint-ui';
Vue.use(MintUI);

import 'mint-ui/lib/style.css';

import 'amfe-flexible';

import store from './store';
import router from './routes';

import App from './pages/App.vue';

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
