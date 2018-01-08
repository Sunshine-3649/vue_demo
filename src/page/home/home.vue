<template>
  <div class="index">
    <img class="text" src="./dianji.png" v-show="isProgress" @click="toplayvideo" />
    <!-- <audio ref="audiobegin" id="audiobegin" v-show="false" :src="audiobegin" preload controls>您的浏览器不支持 audio 标签。</audio> -->
    <audio ref="audioindex" id="audioindex" v-show="false" :src="audioindex" preload loop controls>您的浏览器不支持 audio 标签。</audio>
    <!-- 第一页开场 -->
    <transition name="fade">
      <div class="one" v-show="isPage1">
        <video class="myvideo" ref="myvideo"
              webkit-playsinline="true"
              x-webkit-airplay="true"
              x5-video-player-type="h5"
              x5-video-player-fullscreen="true"
              x5-video-orientation="portraint"
              :src="videoSrc"
              style="object-fit: fill;"
              playsinline="true"
              autoplay="autoplay"
              preload="true"
        >
          your browser does not support the video tag

        </video>
        <!-- <img @load="imgLoad" class='first_img' :src="imgsrc" alt=""> -->
        <img class='first_btn' v-show="isBeginBtn" @click="topage3" src="./btn_qiyuan@2x.png" alt="">
      </div>
    </transition>
    <!-- 第二页 -->
    <!-- 静音按钮 -->
    <div class="mute" @click="toggleMusic" v-show="isMuteBtn">
      <img class='music_off' v-show="!isMusic" src="./music_off.png" alt="" />
      <img class='music_on' v-show="isMusic" src="./music_on.png" alt="" />
    </div>
    <transition name="fade">
      <div class="two" v-show="isPage2">
        <img class='first_img' src="./page2.jpg" alt="">
        <img class='first_btn' v-show="isBeginBtn" @click="topage3" src="./btn_qiyuan@2x.png" alt="">
      </div>
    </transition>
    <!-- 第三页 -->
    <div class="three" v-show="isPage3">
      <img class='three_bgimg' src="./yuandan2.jpg" alt="">
      <div class="qiyuan_block1" @click="showRadio(0)">
        <img class="shouzhi" src="./shouzhi@2x.png" alt="">
        <img class='qiyuan' src="./qiyuanpaizi@2x.png" alt="">
      </div>
      <div class="qiyuan_block2" @click="showRadio(1)">
        <img class="shouzhi" src="./shouzhi@2x.png" alt="">
        <img class='qiyuan' src="./qiyuanpaizi@2x.png" alt="">
      </div>
      <div class="qiyuan_block3" @click="showRadio(2)">
        <img class="shouzhi" src="./shouzhi@2x.png" alt="">
        <img class='qiyuan' src="./qiyuanpaizi@2x.png" alt="">
      </div>
      <div class="qiyuan_block4" @click="showRadio(3)">
        <img class="shouzhi" src="./shouzhi@2x.png" alt="">
        <img class='qiyuan' src="./qiyuanpaizi@2x.png" alt="">
      </div>
      <div class="qiyuan_block5" @click="showRadio(4)">
        <img class="shouzhi" src="./shouzhi@2x.png" alt="">
        <img class='qiyuan' src="./qiyuanpaizi@2x.png" alt="">
      </div>
      <div class="qiyuan_block6" @click="showRadio(5)">
        <img class="shouzhi" src="./shouzhi@2x.png" alt="">
        <img class='qiyuan' src="./qiyuanpaizi@2x.png" alt="">
      </div>
      <div class="three_group" v-show="isBtn">
        <img class='btn1' @click="toPage4" src="./btn1@2x.png" alt="">
        <img class='btn2' @click="toShare" src="./btn2@2x.png" alt="">
        <img class='btn3' @click="tofaye" src="./btn3@2x.png" alt="">
        <img class='btn4' @click="tohangwen" src="./btn4@2x.png" alt="">
      </div>
    </div>
    <!-- 播放声音 -->
    <div class="radio" v-show="isRadio" @click="hideRadio">
      <img class='radio_bg' src="./zhufu.png" alt="">
      <div class="radio_btn" @click.stop="playRadio">
        <img class='radio_bofang' v-show="!isPlay" src="./bofang@2x.png" alt="">
        <img class='radio_zanting' v-show="isPlay" src="./zanting@2x.png" alt="">
      </div>
      <audio ref="audio" id="audio" v-show="false" :src="playUrl" preload loop controls>您的浏览器不支持 audio 标签。</audio>
    </div>
    <!-- 显示分享 -->
    <div class="share" v-show="isShare" @click="hideShare">
      <img class='share_img' src="./share.png" alt="">
    </div>
    <!-- 第四页 -->
    <div class="four" v-show="isPage4">
      <img class='four_bg' src="./page4_bg.jpg" alt="">
      <img class='four_shiting' @click="tryRecord" src="./shiting@2x.png" alt="">
      <img class='four_shangchuan' @click="uploadClick" src="./shangchuan@2x.png" alt="">
      <img class='four_zanting' @click="endRecord" v-show="isStar" src="./luzhi@2x.png" alt="">
      <img class='four_luzhi' @click="starRecord" v-show="!isStar" src="./zanting@2x_65.png" alt="">
      <p class='time'>{{time}}</p>
    </div>
    <!-- 表单提交 -->
    <div class="form" v-show="isForm">
      <img class='form_bg' src="./yuandan34.png" alt="">
      <img class='form_close' @click="hideForm" src="./close.png" alt="">
      <img class='form_ensure' @click="uploadVoice" src="./quereng@2x.png" alt="">
      <input class='phone' type="text" v-model.trim="myphone" placeholder="请输入你的手机号">
      <p @click="getMycard" class='btn'>{{codeText}}</p>
      <input class='card' type="text" v-model.trim="mycard" placeholder="请输入你的验证码">
    </div>
    <!-- success -->
    <div class="success" v-show="isSuccess">
      <img class='success_bg' src="./yunadna23.png" alt="">
    </div>
    <!-- success -->
    <div class="fail"  v-show="isFail">
      <img class='fail_bg' src="./yuandan33.jpg" alt="">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
// 微信录音保存的值
let voice = {
  localId: '',
  serverId: ''
};
let accessToken = '';
let uid = '';

export default {
  name: 'index',
  data() {
    return {
      videoTimer: null, // 视频长度计数
      currentVideoTime: 0, // 当前视频长度
      // audiobegin: 'static/audio/元旦录音.mp3', // 开头15s
      audioindex: 'static/audio/吉田兄弟 - 思い出の风.mp3', // bg音乐
      isMuteBtn: false, // 背景音乐显示按钮
      isMusic: true, // 背景音乐控制按钮
      isProgress: true,
      progress: 0,
      videoSrc: 'static/video/3.mp4',
      // imgsrc: '../../static/video/mygif.gif',
      arrList: [
        'static/audio/lianghuo.mp3',
        'static/audio/乐乐.mp3',
        'static/audio/余敏.mp3',
        'static/audio/可乐.mp3',
        'static/audio/金日成.mp3',
        'static/audio/阿虚.mp3'
      ],
      playUrl:
        'static/audio/阿虚.mp3',
      isPage1: false, // page1显示
      isBeginBtn: false, // 开始btn显示
      isPage2: false, // page2显示
      isPage3: false, // page3隐藏
      isBtn: true, // 按钮组显示
      isRadio: false, // 显示播放界面
      isPlay: false, // 显示播放按钮
      isShare: false, // 显示分享
      isPage4: false, // page4隐藏
      time: '00:00:00', // 默认时间
      isStar: false, // 开始
      starTime: 0, // 录制开始时间
      timer: null, // 定时器
      isForm: false, // 显示弹窗
      myphone: '', // 绑定的手机号
      mycard: '', // 绑定的验证码
      isSuccess: false, // 成功的状态
      isFail: false, // 失败的状态
      codeTime: 60, // 验证码时间
      timer2: null, // 验证码延时器
      codeText: '获取验证码' // 验证码文本
      // uid: '' // 用户id
    };
  },
  watch: {
    currentVideoTime(curVal) {
      if (curVal > 16) {
        clearInterval(this.videoTimer);
        setTimeout(() => {
          this.isBeginBtn = true;
        }, 1000);
        this.$refs.myvideo.pause();
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    imgLoad() {
      console.log('加载中。。');
    },
    toplayvideo() {
      this.isProgress = false;
      this.isPage1 = true;
      // this.$refs.audiobegin.play();
      this.$refs.myvideo.play();
      clearInterval(this.videoTimer);
      this.videoTimer = setInterval(() => {
        this.currentVideoTime = this.$refs.myvideo.currentTime;
        console.log(this.currentVideoTime);
      }, 700);
    },
    toggleMusic() {
      // 背景音乐切换
      this.isMusic = !this.isMusic;
      if (!this.isMusic) {
        this.$refs.audioindex.pause();
      } else {
        this.$refs.audioindex.play();
      }
    },
    topage3() {
      this.isPage1 = false;
      setTimeout(() => {
        this.isPage3 = true;
      }, 800);
      this.$refs.audioindex.play();
      this.isMuteBtn = true;
      this.saveRecordNum(1);
    },
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
          accessToken = res.data.data.access_token;
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
    // 显示播放页面
    showRadio(i) {
      this.isRadio = true;
      this.playUrl = this.arrList[i];
      this.saveRecordNum(2);
    },
    // 隐藏弹窗
    hideRadio() {
      this.isRadio = false;
      this.isBtn = true;
      // 重置按钮和播放状态
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.pause();
      this.isPlay = false;

      setTimeout(() => {
        this.$refs.audioindex.play();
        this.isMusic = true;
      }, 800);
    },
    // 播放暂停切换
    playRadio() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        this.$refs.audio.play();
        this.$refs.audioindex.pause();
        this.isMusic = false;
      } else {
        this.$refs.audio.pause();
        setTimeout(() => {
          this.$refs.audioindex.play();
          this.isMusic = true;
        }, 800);
      }
    },
    // 显示第四页
    toPage4() {
      this.isPage3 = false;
      this.isPage4 = true;
      this.time = '00:00:00';
      voice = {
        localId: '',
        serverId: ''
      };
      this.saveRecordNum(3);
    },
    // 显示分享页面
    toShare() {
      this.isShare = true;
      // 隐藏背景音乐按钮
      this.isMuteBtn = false;
      this.saveRecordNum(7);
    },
    // 隐藏分享页面
    hideShare() {
      this.isShare = false;
      // 显示背景音乐按钮
      this.isMuteBtn = true;
    },
    // 跳转到发耶下载页面
    tofaye() {
      window.location.href =
        'http://android.myapp.com/myapp/detail.htm?apkName=com.palcomm.hangwt&ADTAG=mobile';
    },
    // 跳转到杭文头下载页面
    tohangwen() {
      window.location.href =
        'http://a.app.qq.com/o/simple.jsp?pkgname=com.rd.hangwentou';
      this.saveRecordNum(6);
    },
    // 开始录制
    starRecord() {
      // 时间状态计时切换
      this.isStar = true;
      this.starTime = 0;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.starTime++;
        if (this.starTime < 10) {
          this.starTime = `0${this.starTime}`;
        }

        this.time = `00:00:${this.starTime}`;
        // 时长限制
        if (this.starTime > 60) {
          this.toast('录制时长不得大于60s');
        }
      }, 1000);

      // 重置语音localId
      voice = {
        localId: '',
        serverId: ''
      };

      // 微信
      wx.startRecord({
        cancel: function() {
          this.toast('用户拒绝授权录音');
        }
      });
      // 暂停背景音乐
      this.$refs.audioindex.pause();
      this.isMusic = false;
      this.saveRecordNum(4);
    },
    endRecord() {
      this.isStar = false;
      clearInterval(this.timer);

      // 微信
      wx.stopRecord({
        success: function(res) {
          voice.localId = res.localId;
        },
        fail: function(res) {
          alert(res.msg);
        }
      });

      // 延缓播放
      setTimeout(() => {
        this.$refs.audioindex.play();
        this.isMusic = true;
      }, 800);
    },
    // 试听
    tryRecord() {
      if (voice.localId === '') {
        this.toast('请先使用 startRecord 接口录制一段声音');
        return;
      }
      this.$refs.audioindex.pause();
      this.isMusic = false;
      wx.playVoice({
        localId: voice.localId
      });
      // 延缓播放
      const relay = this.starTime * 1060;
      setTimeout(() => {
        this.$refs.audioindex.play();
        this.isMusic = true;
      }, relay);
    },
    // 上传显示弹窗
    uploadClick() {
      if (voice.localId === '') {
        this.toast('请先使用 startRecord 接口录制一段声音');
        return;
      }

      // 时长显示
      if (this.starTime <= 5) {
        this.toast('录音时长不得低于五秒');
        return;
      }

      this.myphone = '';
      this.mycard = '';
      this.isForm = true;
      // 重置参数
      this.codeText = '获取验证码';
      this.codeTime = 60;
    },
    // 获取验证码
    getMycard() {
      if (this.myphone === '') {
        this.toast('请先输入手机号');
        return;
      }
      const isNum = /^-?[1-9]\d*$/;
      if (!isNum.test(this.myphone)) {
        this.toast('手机号只能是数字');
        return;
      }
      if (this.myphone.length !== 11) {
        this.toast('手机号格式不正确');
        return;
      }

      if (this.codeTime > 1 && this.codeTime < 60) {
        this.toast('请稍后点击');
        return;
      }
      this.codeTime = 60;
      clearInterval(this.timer2);
      // console.log(this.codeTime - 1);
      this.timer2 = setInterval(() => {
        this.codeTime--;

        if (this.codeTime > 0) {
          this.codeText = `倒计时${this.codeTime}秒`;
        } else {
          this.codeText = '获取验证码';
        }
        console.log(this.codeTime);
        console.log(this.codeText);
      }, 1000);

      // 清除延时器
      setTimeout(() => {
        clearInterval(this.timer2);
      }, 61000);
      // 根据手机号获取验证码
      this.getCard();
    },
    // 隐藏输入框
    hideForm() {
      this.isForm = false;
      // 重置参数
      this.codeText = '获取验证码';
      this.codeTime = 60;
      clearInterval(this.timer2);
    },
    // 获取验证码
    getCard() {
      axios
        .post(
          '/myselfpro/sms/sendSmsCode',
          qs.stringify({
            phone: this.myphone
          })
        )
        .then(res => {
          if (res.data.status === 200) {
            this.toast('短信已发送，注意查收', false);
          } else {
            this.toast('信息发送失败，请重试');
          }
        });
    },
    // 验证手机号和验证码是否正确
    checkCard() {
      axios
        .post(
          '/myselfpro/sms/checkSmsCode',
          qs.stringify({
            phone: this.myphone,
            smsCode: this.mycard
          })
        )
        .then(res => {
          if (res.data.status === 200) {
            // 验证成功发送密码
            this.sendPwdCode();
          } else {
            this.toast(res.msg);
          }
        });
    },
    // 发送随机密码
    sendPwdCode() {
      axios
        .post(
          '/myselfpro/sms/sendPwdCode',
          qs.stringify({
            phone: this.myphone
          })
        )
        .then(res => {
          if (res.data.status === 200) {
            uid = res.data.data.uid;
            // uid = uid.toString();
            this.getServerId();
          } else {
            this.toast(res.msg);
          }
        });
    },
    // 上传语音
    async uploadVoice() {
      this.saveRecordNum(5);
      // 判断不为空
      if (!this.myphone) {
        this.toast('手机号不能为空');
        return;
      }
      if (!this.mycard) {
        this.toast('手机号不能为空');
        return;
      }
      const isNum = /^-?[1-9]\d*$/;
      if (!isNum.test(this.mycard)) {
        this.toast('验证码只能是数字');
        return;
      }
      if (!voice.localId) {
        this.toast('请先录音');
        return;
      }
      // 1.验证手机号和验证码
      await this.checkCard();
    },
    // 2.上传语音
    async getServerId() {
      let self = this;
      wx.uploadVoice({
        localId: voice.localId,
        success: function(res) {
          voice.serverId = res.serverId;
          self.getvid();
        }
      });
    },
    async getvid() {
      axios
        .post(
          '/listenpro/voice/getVoiceUrl',
          qs.stringify({
            accessToken: accessToken,
            serverId: voice.serverId
          })
        )
        .then(res => {
          if (res.data.status === 200) {
            this.comment(res.data.data);
          } else {
            alert(res.msg);
          }
        });
    },
    // 上传到话题评论
    comment(vid) {
      axios
        .post(
          '/listenpro/comment/commentTopic',
          qs.stringify({
            token: uid + '',
            topicId: 20212296,
            uid: 30005,
            toUid: 0,
            commentUrl: vid,
            commentText: '',
            parentId: 0,
            preCommentId: 0
          })
        )
        .then(res => {
          if (res.data.status === 200) {
            this.isForm = false;
            this.isSuccess = true;
            // 1.5s成功状态消失，页面3出现
            setTimeout(() => {
              this.isSuccess = false;
              this.isPage4 = false;
              // 出现礼物盒和按钮
              this.isPage3 = true;
              this.isBtn = true;
            }, 1500);
          } else {
            // 失败状态
            this.isFail = true;
            this.isForm = false;
            setTimeout(() => {
              this.isFail = false;
              this.isForm = true;
            }, 1500);
          }
        });
    },
    toast(text, ismask = true) {
      const toast = this.$createToast({
        txt: text,
        mask: ismask
      });
      toast.show();
      setTimeout(() => {
        toast.hide();
      }, 1300);
    },
    // 埋点记录点击次数
    saveRecordNum(index) {
      axios
        .post(
          '/listenpro/voice/recordNum',
          qs.stringify({
            flag: index
          })
        )
        .then(res => {
          if (res.status === 200) {
            console.log('埋点成功');
          } else {
            console.log('埋点失败');
          }
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
img
  display: block
.index
  width: 100%
  height: 100%
  position: relative
  .text
    z-index: 0
    font-size: 5rem
    text-align: center
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
  .mute
    z-index: 50
    width: 3rem
    position: absolute
    top: 2rem
    right: 2rem
    .music_off, .music_on
      width: 3rem
      position: absolute
      left: 0
      top: 0
  .one, .two
    z-index: -20
    &.fade-enter-active, &.fade-leave-active
      transition: opacity 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
    .first_img
      width: 37.5rem
      position: absolute
      left: 0
      top: 0
    .first_btn
      width: 22.35rem
      height: 5.8rem
      position: absolute
      left: 7.4rem
      top: 9.4rem
    .myvideo
      width: 37.5rem
      height: 60.3rem
  .three
    z-index: 0
    .three_bgimg
      width: 37.5rem
      position: absolute
      left: 0
      top: 0
    .qiyuan_block1
      width: 6.7rem
      height: 14.9rem
      position: absolute
      left: 3.5rem
      top: 7.4rem
      .shouzhi
        z-index: 5
        width: 10rem
        height: 10rem
        position: absolute
        left: -1.8rem
        top: -2.5rem
      .qiyuan
        width: 6.7rem
        position: absolute
        left: 0
        bottom: 0
    .qiyuan_block2
      width: 6.7rem
      height: 14.9rem
      position: absolute
      left: 15.8rem
      top: 7.4rem
      .shouzhi
        z-index: 5
        width: 10rem
        height: 10rem
        position: absolute
        left: -1.8rem
        top: -2.5rem
      .qiyuan
        width: 6.7rem
        position: absolute
        left: 0
        bottom: 0
    .qiyuan_block3
      width: 6.7rem
      height: 14.9rem
      position: absolute
      left: 26.9rem
      top: 7.4rem
      .shouzhi
        z-index: 5
        width: 10rem
        height: 10rem
        position: absolute
        left: -1.8rem
        top: -2.5rem
      .qiyuan
        width: 6.7rem
        position: absolute
        left: 0
        bottom: 0
    .qiyuan_block4
      width: 6.7rem
      height: 14.9rem
      position: absolute
      left: 3.5rem
      top: 23.9rem
      .shouzhi
        z-index: 5
        width: 10rem
        height: 10rem
        position: absolute
        left: -1.8rem
        top: -2.5rem
      .qiyuan
        width: 6.7rem
        position: absolute
        left: 0
        bottom: 0
    .qiyuan_block5
      width: 6.7rem
      height: 14.9rem
      position: absolute
      left: 15.8rem
      top: 23.9rem
      .shouzhi
        z-index: 5
        width: 10rem
        height: 10rem
        position: absolute
        left: -1.8rem
        top: -2.5rem
      .qiyuan
        width: 6.7rem
        position: absolute
        left: 0
        bottom: 0
    .qiyuan_block6
      width: 6.7rem
      height: 14.9rem
      position: absolute
      left: 26.9rem
      top: 23.9rem
      .shouzhi
        z-index: 5
        width: 10rem
        height: 10rem
        position: absolute
        left: -1.8rem
        top: -2.5rem
      .qiyuan
        width: 6.7rem
        position: absolute
        left: 0
        bottom: 0
    .three_group
      .btn1
        width: 18.5rem
        height: 4.5rem
        position: absolute
        left: 0.1rem
        top: 44.2rem
      .btn2
        width: 18.5rem
        height: 4.5rem
        position: absolute
        right: 0.1rem
        top: 44.2rem
      .btn3
        width: 18.5rem
        height: 4.5rem
        position: absolute
        left: 0.1rem
        top: 49.8rem
      .btn4
        width: 18.5rem
        height: 4.5rem
        position: absolute
        right: 0.1rem
        top: 49.8rem
  .radio
    .radio_bg
      z-index: 10
      width: 37.5rem
      position: absolute
      left: 0
      top: 0
    .radio_btn
      z-index: 10
      width: 13.7rem
      height: 13.7rem
      position: absolute
      left: 11.7rem
      top: 29.4rem
      .radio_bofang, .radio_zanting
        width: 13.7rem
        height: 13.7rem
        position: absolute
        left: 0
        top: 0
  .share
    .share_img
      z-index: 10
      width: 37.5rem
      position: absolute
      left: 0
      top: 0
  .four
    height: 100%
    .four_bg
      width: 37.5rem
      position: absolute
      top: 0
      left: 0
    .four_shiting
      width: 9.1rem
      position: absolute
      left: 2.5rem
      top: 39rem
    .four_luzhi, .four_zanting
      width: 10.5rem
      position: absolute
      left: 13.7rem
      top: 38.3rem
    .four_shangchuan
      width: 9.1rem
      position: absolute
      left: 26.2rem
      top: 39rem
    .time
      z-index: 10
      width: 27rem
      font-size: 4.7rem
      text-align: center
      color: rgba(255, 245, 232, 1)
      position: absolute
      left: 5rem
      top: 14.6rem
  .form
    height: 100%
    .form_bg
      z-index: 30
      width: 37.5rem
      position: absolute
      left: 0
      top: 0
    .form_close
      z-index: 30
      width: 5.9rem
      position: absolute
      left: 16rem
      top: 4rem
    .form_ensure
      z-index: 30
      width: 28.5rem
      height: 4.7rem
      position: absolute
      left: 4.5rem
      top: 33.1rem
    .phone
      z-index: 30
      width: 18.5rem
      height: 4.7rem
      font-size: 2rem
      outline: none
      line-height: 4.7rem
      border-radius: 0.5rem
      padding-left: 1rem
      box-sizing: border-box
      position: absolute
      left: 4.5rem
      top: 18.5rem
    .btn
      z-index: 30
      width: 10rem
      height: 4.7rem
      font-size: 1.7rem
      text-align: center
      line-height: 4.7rem
      position: absolute
      left: 23rem
      top: 18.5rem
    .card
      z-index: 30
      width: 28.5rem
      height: 4.7rem
      font-size: 2rem
      outline: none
      line-height: 4.7rem
      border-radius: 0.5rem
      padding-left: 1rem
      box-sizing: border-box
      position: absolute
      left: 4.5rem
      top: 25rem
  .success, .fail
    height: 100%
    z-index: 1000
    .success_bg, .fail_bg
      z-index: 1000
      width: 37.5rem
      position: absolute
      left: 0
      top: 0
</style>
