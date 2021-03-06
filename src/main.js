// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Cube from 'cube-ui';
import store from './store/';
import Mint from 'mint-ui';
import 'common/js/index';
import 'common/stylus/index.styl';
Vue.config.productionTip = false;

Vue.use(Cube);
Vue.use(Mint);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
