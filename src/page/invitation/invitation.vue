<template>
  <div class="invitation">
    <img src="./01.jpg" width="100%" height="100%" alt="图片1">
    <img src="./02.jpg" width="100%" height="100%" alt="图片2">
    <img src="./03.jpg" width="100%" height="100%" alt="图片3">
    <img src="./05.jpg" width="100%" height="100%" alt="图片5">
    <img src="./06.jpg" @click="toAnchor" width="100%" height="100%" alt="图片6">
    <img src="./07.jpg" width="100%" height="100%" alt="图片7">
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
  name: 'invitation',
  data() {
    return {
      uid: ''
    };
  },
  created() {
    this.getLocaltionHerf();
  },
  methods: {
     getLocaltionHerf() {
      let url = window.location.href;
      let obj = {};
      let reg = /[?&][^?&]+=[^?&]+/g;
      let arr = url.match(reg);
      // ['?id=12345', '&a=b']
      if (arr) {
        arr.forEach(item => {
          let tempArr = item.substring(1).split('=');
          let key = decodeURIComponent(tempArr[0]);
          let val = decodeURIComponent(tempArr[1]);
          obj[key] = val;
        });
        this.uid = obj.uid;
      }
      // 获取昵称
      this.getNickname(this.uid);
    },
    getNickname(uid) {
      axios({
      method: 'post',
      url: '/admindev/api/queryNicknameByUid',
      data: qs.stringify({uid: uid})
    }).then(res => {
      console.log('用户昵称', res.data.code);
      if (res.data.code === 0 && res.data.u) {
        this.nickname = res.data.u.nickname;
      } else {
        this.nickname = '';
      }
    });
    },
    toAnchor() {
      const URL = window.location.href.substr(window.location.href.indexOf('?'));
      if (this.uid && this.nickname) {
        this.$router.push(`/index${URL}&nickname=${this.nickname}`);
      } else {
        this.$router.push('/index');
      }
    }
  },
  destroyed() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
};
</script>

<style lang="stylus" scoped>
.invitation
  img
    display: block
</style>
