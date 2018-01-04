import Vue from 'vue';
import Router from 'vue-router';

// 测试demo
import swiper from '@/page/demo/swiper';

// import login from '@/page/login/login';
// import index from '@/page/index/index';
// import chose from '@/page/chose/chose';
// import anchor from '@/page/anchor/anchor';
// import org from '@/page/org/org';
// import anchorstatus from '@/page/anchorstatus/anchorstatus';
// import radiodetail from '@/page/radiodetail/radiodetail';
// import invitation from '@/page/invitation/invitation';

Vue.use(Router);

export const RouterMap = [
  {
    path: '/',
    component: swiper
  }
  // {
  //   path: '/',
  //   component: login
  // },
  // {
  //   path: '/', // 申请主播达人首页
  //   // redirect: '/radiodetail'
  //   component: index
  // },
  // {
  //   path: '/chose', // 申请达人选择页面
  //   component: chose
  // },
  // {
  //   path: '/anchor', // 申请主播达人页面
  //   component: anchor
  // },
  // {
  //   path: '/org', // 申请机构达人页面
  //   component: org
  // },
  // {
  //   path: '/anchorstatus', // 申请主播达人提交状态页面
  //   component: anchorstatus
  // }
  // {
  //   path: '/', // 广播-话题详情页面
  //   component: radiodetail
  // }
  // {
  //   path: '/', // 邀请函
  //   component: invitation
  // }
];

export default new Router({
  routes: RouterMap
});
