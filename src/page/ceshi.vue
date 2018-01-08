<template>
  <div id='id'>
    <!-- <button @click="toSecond">去页面二</button> -->
    <form id="uploadIdCardImg" enctype="multipart/form-data">
      <label for="idCardFile" class='changeImg'>选择照片</label>
      <input class='chose' v-show="false" type="file" name="img" id="idCardFile" @change="idCardOnchange()" multiple>
      <input type="button" @click="uploadIdCardImg()" v-show="false" value="点击上传图片">
    </form>
    <!-- <cube-scroll
      style="height: 600px"
      ref="scroll"
      :data="items"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
    </cube-scroll> -->
    1233
    <div class="swiper">
      <cube-slide @change="changePage" :auto-play="false">
        <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
          <a href="javascript:;">
            <img src="../../static/img/02.jpg">
          </a>
        </cube-slide-item>
      </cube-slide>
      <div class="user">
        <img :src="imgurl" alt="">
      </div>
    </div>

    <!-- <img src="../../static/img/01.jpg" alt=""> -->
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
  data() {
    return {
      items: [1, 2, 3],
      arr: [
        '../../static/img/11.jpg',
        '../../static/img/22.jpg',
        '../../static/img/33.jpg',
        '../../static/img/44.jpg'
      ],
      imgurl: '../../static/img/11.jpg',
      options: {
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: 'Refresh success'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: 'Load more',
            noMore: 'No more data'
          }
        }
        // items: [
        //   {
        //     url: 'http://www.didichuxing.com/',
        //     image:
        //       '../../static/img/01.jpg'
        //   },
        //   {
        //     url: 'http://www.didichuxing.com/',
        //     image:
        //       '../../static/img/02.jpg'
        //   },
        //   {
        //     url: 'http://www.didichuxing.com/',
        //     image:
        //       '../../static/img/03.jpg'
        //   }
        // ]
      }
    };
  },
  created() {
    // this.getData();
    // this.upload();
  },
  methods: {
    // 上传语音
    upload() {
      axios
        .post(
          '/listenpro/comment/commentTopic',
          qs.stringify({
            token: '29694',
            topicId: 20212296,
            uid: 30005,
            toUid: 0,
            commentUrl: 123456,
            commentText: '',
            parentId: 0,
            preCommentId: 0
          })
        )
        .then(res => {
          console.log(res);
        });
    },
    // 身份证上传图片
    idCardOnchange(e) {
      // let file = document.querySelector('#idCardFile').files[0];
      // console.log(file);
      // //获得图片文件的url
      // let url = URL.createObjectURL(file);
      // let img = document.getElementById('show-pic');
      // img.src = url;
      // 调用图片上传
      this.uploadIdCardImg();
      // this.checkNickname();
    },
    // 身份证上传图片调用方法
    async uploadIdCardImg() {
      let form = new FormData(document.getElementById('uploadIdCardImg'));
      console.log(form);
      let config = {};
      config = {
        method: 'post',
        url: '/listendev/oss/uploadImg',
        timeout: 30000,
        cache: 'force-cache',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: form,
        credentials: 'include'
      };
      console.log(config);
      axios(config).then(res => {
        console.log('身份正上传图片：', res);
        if (res.data.status === 200) {
          this.cardImg = res.data.data.url;
          // Toast('手持身份证照片已上传');
        } else {
          // return Toast(res.data.msg);
        }
      });
    },
    toSecond() {
      this.$router.push('/ceshi2');
    },
    onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.items.unshift('I am new data: ' + +new Date());
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
        }
      }, 1000);
    },
    onPullingUp() {
      console.log('加载');
      // 更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          let newPage = [
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex
          ];

          this.items = this.items.concat(newPage);
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
          console.log('meiyou shuju le');
        }
      }, 1000);
    },
    getData() {
      // axios({
      //   type: 'post',
      //   url: '/myselfdev/sms/sendSmsCode',
      //   data: qs.stringify({ phone: '13683998822' }),
      //   success: function(res) {
      //     if (res.status === 200) {
      //       alert('短信已发送，注意查收');
      //     } else {
      //       alert(res.msg);
      //     }
      //   }
      // });
    },
    changePage(current) {
      console.log('当前轮播图序号为:' + current);
      this.imgurl = this.arr[current];
    },
    clickHandle(item, index) {
      console.log(item, index);
    }
  }
};
</script>

<style lang="stylus" scoped>
.swiper
  overflow hidden
  position: relative
  left: 0
  top: 0
  .user
    width: 300px
    position: absolute
    top: 80px
    left: 100px
    img
      width: 60px
      height: 60px
      border-radius: 50%
</style>
<style lang="stylus">
.swiper
  .cube-slide-dots
    position absolute
    bottom 20px
    left 0
</style>

