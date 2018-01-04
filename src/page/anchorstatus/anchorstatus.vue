<template>
  <div class='anchorstatus'>
    <div v-show="!isShow" class="submit">
      <img src="./submit.png" alt="已提交">
    </div>
    <div v-show="isShow" class="nopass">
      <img src="./nopass.png" alt="未通过">
       <mt-button class='again' @click.native="again">再次申请</mt-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import { Toast } from 'mint-ui';
export default {
  name: 'anchorstatus',
  data() {
    return {
      isShow: false
    };
  },
  created() {
    this.lookCheckStatus();
    console.log(this.$route.query);
  },
  methods: {
    async lookCheckStatus() {
      await axios({
        method: 'post',
        url: '/myselfdev/userTopic/lookCheckStatus',
        data: qs.stringify({ uid: this.$route.query.uid })
      }).then(res => {
        const result = res.data;
        console.log(result);
        if (result.status === 200) {
          // 审核中
          if (result.data.checkStatus === 0) {
            this.isShow = false;
            // 审核拒绝
          } else if (result.data.checkStatus === 2) {
            this.isShow = true;
            // 审核通过
          } else if (result.data.checkStatus === 1) {
            this.isShow = false;
          }
        }
      });
    },
    again() {
      this.$router.push({
        path: '/anchor',
        query: {
          uid: this.$route.query.uid,
          phone: this.$route.query.phone,
          nickname: this.nickname
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
img {
  width: 100%;
}
.again {
  width: 100%;
  color: rgb(255, 255, 255);
  background-color: rgba(173, 0, 33, 1) !important;
}
</style>
