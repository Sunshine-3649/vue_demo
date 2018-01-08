import Vue from 'vue';
import Router from 'vue-router';
// import home from 'page/home/home';
// import ceshi from 'page/ceshi';
import roadinfo from 'page/roadinfo/roadinfo';

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/', // 元旦活动
    //   name: 'home',
    //   component: home
    // },
    // {
    //   path: '/', // ceshi
    //   name: 'ceshi',
    //   component: ceshi
    // }
    // {
    //   path: '/ceshi', // ceshi
    //   name: 'ceshi',
    //   component: ceshi
    // },
    {
      path: '/', // roadinfo
      name: 'roadinfo',
      component: roadinfo
    }
  ]
});
