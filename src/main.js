// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import Cube from 'cube-ui';

import filters from './filters'; // 全局vue filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.use(Cube);
Vue.use(MintUI);
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});