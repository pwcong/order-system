import Vue from 'vue';

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

import App from './pages/App.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});
