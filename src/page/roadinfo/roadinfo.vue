<template>
  <div class="roadinfo">
    <div class="top">
      <img src="./a.png" alt="">
      <div class="mid">
        <div class="left">
          <img class='avator' :src="imgurl" alt="">
        </div>
        <div class="right" @click="play">
          <!-- <img class='radio' src="static/imgs/5.png" alt=""> -->
          <img class='radio' src="static/imgs/voicebg.png" alt="">
          <img class='radiovoice' v-show="!isStar" src="static/imgs/voice.png" alt="">
          <img class='radiovoicegif' v-show="isStar" src="static/imgs/voice.gif" alt="">
          <p class='desc'>{{textdesc}}</p>
        </div>
      </div>
    </div>
    <div class="swiper">
      <img class='swiper_bg' src="static/imgs/swiper_bg.png" alt="">
      <cube-slide class='slide' @change="changePage" :auto-play="false"  ref="slide">
        <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
          <img class='bgimg' src="static/imgs/swiper_wz.png">
        </cube-slide-item>
      </cube-slide>
       <audio ref="audio" id="audio" v-show="false" :src="audiourl" preload controls>您的浏览器不支持 audio 标签。</audio>
    </div>
    <div class="footer">
      <img src="./c.png" alt="">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
  name: 'name',
  data() {
    return {
      isStar: false,
      items: [1, 2, 3, 4],
      textList: [
        '萌系甜美女主播向你发来一条语音',
        '温暖治愈系女主播向你发来一条语音',
        '磁性低音炮男主播向你发来一条语音',
        '青春活力型女主播向你发来一条语音'
      ],
      textdesc: '萌系甜美女主播向你发来一条语音',
      arr: [
        'static/imgs/1.png',
        'static/imgs/2.png',
        'static/imgs/3.png',
        'static/imgs/4.png'
      ],
      imgurl: 'static/imgs/1.png',
      audioList: [
        'static/audio/乐乐.mp3',
        'static/audio/余敏.mp3',
        'static/audio/可乐.mp3',
        'static/audio/阿虚.mp3'
      ],
      audiourl: 'static/audio/乐乐.mp3',
      currenttime: 0,
      duration: 0,
      timer: null
      // isPlay: false
    };
  },
  watch: {
    currenttime(val) {
      console.log(val);
      console.log(this.duration);
      console.log(val > this.duration);
      const self = this;
      if (val > this.duration - 0.1) {
        const a = val > this.duration;
        console.log(a);
        setTimeout(() => {
          self.isStar = false;
          // self.isPlay = true;
        }, 100);
        clearInterval(this.timer);
        console.log('结束了');
      }
    }
  },
  mounted() {
    this.getData();
    setTimeout(() => {
      this.$refs.slide.refresh();
      // this.$refs.audio.play();
      // this.playTime();
    }, 200);
  },
  methods: {
    // 获取微信数据
    async getData() {
      await axios({
        method: 'post',
        url: '/myselfdev/weixin/getSign',
        data: qs.stringify({
          url: window.location.href.split('#')[0]
        })
      }).then(res => {
        console.log(res);
        if (res.data.status === 200) {
          let appId = res.data.data.appId;
          let noncestr = res.data.data.noncestr;
          let signature = res.data.data.signature;
          let timestamp = res.data.data.timestamp;
          // accessToken = res.data.data.access_token;
          console.log(signature);
          wx.config({
            debug: false,
            appId: appId,
            timestamp: timestamp,
            nonceStr: noncestr,
            signature: signature,
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'translateVoice',
              'startRecord',
              'stopRecord',
              'onVoiceRecordEnd',
              'playVoice',
              'onVoicePlayEnd',
              'pauseVoice',
              'stopVoice',
              'uploadVoice',
              'downloadVoice'
            ]
          });
          wx.ready(function() {
            wx.onMenuShareAppMessage({
              title: '这件事2018年我一定要完成',
              desc: '种下一颗种子，用365天等它开花',
              link: window.location.href.split('#')[0],
              imgUrl:
                'https://lbs-img.oss-cn-shanghai.aliyuncs.com/img/20171229/1bbc95f2-d4e9-4c8b-8395-9b8eaf4f5b82.jpg',
              success: function() {
                this.toast('分享成功');
              },
              cancel: function() {
                this.toast('已取消');
              }
            });
            wx.onMenuShareTimeline({
              title: '这件事2018年我一定要完成',
              desc: '种下一颗种子，用365天等它开花',
              link: window.location.href.split('#')[0],
              imgUrl:
                'https://lbs-img.oss-cn-shanghai.aliyuncs.com/img/20171229/1bbc95f2-d4e9-4c8b-8395-9b8eaf4f5b82.jpg',
              success: function() {
                this.toast('分享成功');
              },
              cancel: function() {
                this.toast('已取消');
              }
            });
            wx.onMenuShareQQ({
              title: '这件事2018年我一定要完成',
              desc: '种下一颗种子，用365天等它开花',
              link: window.location.href.split('#')[0],
              imgUrl:
                'https://lbs-img.oss-cn-shanghai.aliyuncs.com/img/20171229/1bbc95f2-d4e9-4c8b-8395-9b8eaf4f5b82.jpg',
              success: function() {
                this.toast('分享成功');
              },
              cancel: function() {
                this.toast('已取消');
              }
            });
            wx.onMenuShareWeibo({
              title: '这件事2018年我一定要完成',
              desc: '种下一颗种子，用365天等它开花',
              link: window.location.href.split('#')[0],
              imgUrl:
                'https://lbs-img.oss-cn-shanghai.aliyuncs.com/img/20171229/1bbc95f2-d4e9-4c8b-8395-9b8eaf4f5b82.jpg',
              success: function() {
                this.toast('分享成功');
              },
              cancel: function() {
                this.toast('已取消');
              }
            });
          });
        } else {
          alert(res.msg);
        }
      });
    },
    playTime() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.currenttime = this.$refs.audio.currentTime;
      }, 100);
    },
    changePage(current) {
      console.log('当前轮播图序号为:' + current);
      this.imgurl = this.arr[current];
      this.audiourl = this.audioList[current];
      this.textdesc = this.textList[current];
      this.isStar = false;
      // this.isPlay = true;
      setTimeout(() => {
        this.$refs.audio.load();
      }, 200);
    },
    clickHandler(item, index) {
      console.log(item, index);
    },
    play() {
      // this.isPlay = !this.isPlay;
      if (!this.isStar) {
        this.$refs.audio.play();
        this.isStar = true;
        this.playTime();
        this.duration = this.$refs.audio.duration;
        console.log(this.duration);
      } else {
        this.$refs.audio.pause();
        this.isStar = false;
        clearTimeout(this.timer);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
img
  width: 100%
  display: block
.roadinfo, .mid, .swiper, .footer
  width: 100%
  overflow: hidden
  .top
    position: relative
    top: 0
    left: 0
    .mid
      position: absolute
      left: 0
      bottom: -3.027rem
      z-index: 20
      .left
        width: 6.055rem
        height: 6.055rem
        display: inline-block
        vertical-align: top
        margin: 0 .425rem 0 .325rem
      .right
        width: 29.9rem
        height: 5.5rem
        display: inline-block
        vertical-align: top
        padding-top: 0.425rem
        line-height: 4.2rem
        @media only screen and (max-width: 320px)
          width: 26rem
          padding-top: 0.8rem
          line-height: 4.2rem
        .radiovoice
          width: 1.9rem
          position: absolute
          left: 9.55rem
          top: 1.675rem
          @media only screen and (max-width: 320px)
            width: 1.6rem
            position: absolute
            left: 9.55rem
            top: 1.675rem
        .radiovoicegif
          width: 2.4rem
          position: absolute
          left: 9.55rem
          top: 1.675rem
          @media only screen and (max-width: 320px)
            width: 2.2rem
            position: absolute
            left: 9.55rem
            top: 1.675rem
        .desc
          width: 23rem
          position: absolute
          left: 12.5rem
          top: 0.875rem
          text-align: center
          font-size 1.4rem
          @media only screen and (max-width: 320px)
            width: 21rem
            font-size 1.4rem
            position: absolute
            left: 12rem
            top: 0.875rem
  .swiper
    height: 22.505rem
    position: relative
    top: 0
    left: 0
    .swiper_bg
      position absolute
      top 0
      left 0

  .footer
    position: relative
    top: 0
    left: 0
</style>

<style lang="stylus">
.roadinfo
  .cube-slide-dots
    position absolute
    bottom 165px
    @media only screen and (max-width: 320px)
      position absolute
      bottom 165px
    span
      width 6px
      height 6px
      border-radius 50%


</style>
