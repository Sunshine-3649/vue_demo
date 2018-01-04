<template>
  <div class='index'>
    <img src="./02.png" alt="">
    <img src="./03.png" alt="">
    <div class="about">
      <img src="./04.png" alt="">
      <img src="./05.png" alt="">
    </div>
    <div class="button" @click="lookCheckStatus">
      <img src="./06.png" alt="">
    </div>
    <img src="./07.png" alt="">
    <img src="./08.png" alt="">
    <img src="./09.png" alt="">
    <img src="./10.png" alt="">
    <img src="./11.png" alt="">
    <img src="./12.png" alt="">
    <img src="./13.png" alt="">
    <div class="button" @click="lookCheckStatus">
      <img src="./14.png" alt="">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import { Toast } from 'mint-ui';
export default {
  name: 'index',
  data() {
    return {
      uid: '', // 用户uid
      phone: '', // 用户电话
      nickname: '' // 用户昵称
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
        this.phone = obj.phone;
        this.nickname = obj.nickname;
      }

      // this.page = obj.page;
      // const hrefUrl = window.location.href.substring(window.location.href.indexOf('?'));
      // console.log(hrefUrl);
      // if (this.page === 'radiodetail') {
      //   this.$router.push(`/radiodetail${hrefUrl}`);
      // }
    },
    async lookCheckStatus() {
      if (this.uid && this.phone && this.nickname) {
        await axios({
          method: 'post',
          url: '/myselfdev/userTopic/lookCheckStatus',
          data: qs.stringify({ uid: this.uid })
        }).then(res => {
          console.log(res);
          const result = res.data;
          if (result.status === 200) {
            // 审核中
            if (result.data.checkStatus === 0) {
              this.$router.push({
                path: '/anchorstatus',
                query: {
                  uid: this.uid,
                  phone: this.phone,
                  nickname: this.nickname
                }
              });
              // 审核拒绝
            } else if (result.data.checkStatus === 2) {
              this.$router.push({
                path: '/chose',
                query: {
                  uid: this.uid,
                  phone: this.phone,
                  nickname: this.nickname
                }
              });
              // 审核已通过
            } else if (result.data.checkStatus === 1) {
              Toast('您已是达人主播');
              // 未审核
            } else {
              this.$router.push({
                path: '/chose',
                query: {
                  uid: this.uid,
                  phone: this.phone,
                  nickname: this.nickname
                }
              });
            }
          } else {
            this.$router.push({
              path: '/chose',
              query: {
                uid: this.uid,
                phone: this.phone,
                nickname: this.nickname
              }
            });
          }
        });
      } else {
        window.location.href =
          'http://a.app.qq.com/o/simple.jsp?pkgname=com.palcomm.hangwt';
      }
    }
  },
  destroyed() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
};
</script>

<style lang="css" scoped>
img {
  width: 100%;
  display: block;
}
.about::after {
  display: block;
  content: '';
  clear: both;
}
.about > img {
  width: 50%;
  float: left;
}
</style>
