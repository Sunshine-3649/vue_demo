<template>
  <div class='anchor' ref="anchor">
    <div class="main" v-show="!isShowproto">
      <!-- 基本信息认证 -->
      <div class="base">
        <mt-cell class='card' title="基本信息认证">
          <img slot="icon" src="./base.png" width="27" height="22">
        </mt-cell>
        <mt-field label="绑定手机号" class='namereq' placeholder="手机号" disableClear readonly disabled v-model="phone"></mt-field>
        <mt-field label="邮箱" class='namereq' placeholder="请输入你常用的邮箱" v-model.trim="email"></mt-field>
        <mt-field label="昵称" class='namereq' placeholder="请输入你的昵称" disableClear readonly disabled v-model.trim="nickname"></mt-field>
      </div>
      <!-- <button @click="checkNickname">检测昵称</button> -->

      <!-- 身份信息认证 -->
      <div class="idcard">
        <mt-cell class='card' title="身份信息认证">
          <img slot="icon" src="./appro.png" width="29" height="22">
        </mt-cell>
        <mt-cell title="证件类型" is-link @click.native="clickShow1">
          <span>{{cardType}}</span>
        </mt-cell>
        <mt-field label="真实姓名" class='namereq' placeholder="请填写证件上的姓名" v-model.trim="realName"></mt-field>
        <mt-field label="证件号" class='namereq' placeholder="请填写证件上的号码" v-model.trim="cardNum"></mt-field>
        <mt-cell title="手持身份证正面照" ></mt-cell>

      <!-- 身份证上传图片 -->
        <div class="upload">
          <form id="uploadIdCardImg" enctype="multipart/form-data">
            <label for="idCardFile" class='changeImg'>选择照片</label>
            <input class='chose' v-show="false" type="file" name="img" id="idCardFile" @change="idCardOnchange()" multiple>
            <input type="button" @click="uploadIdCardImg()" v-show="false" value="点击上传图片">
          </form>
          <div class='intro'>
            <img v-show="isdefault" class='introImg' src="./idcardimg.png">
            <img v-show="!isdefault" class='introImg' id="show-pic" src="./idcardimg.png">
            <p class='desc'>请参考示意图拍摄证件，照片信息必须清晰可见，大小不超过3M，仅支持jpg或png格式</p>
          </div>
        </div>
      </div>

      <!-- 主播信息认证 -->
      <div class="radio">
        <mt-cell class='card' title="达人主播信息">
          <img slot="icon" src="./radio.png" width="14" height="22">
        </mt-cell>
        <mt-cell title="类型" is-link @click.native="clickShow2">
          <span>{{topicName}}</span>
        </mt-cell>
        <mt-field label="简介" placeholder="请填写主播定位、主要节目内容" type="textarea" rows="4" v-model.trim="descri"></mt-field>
      </div>

      <!-- 其他信息认证 -->
      <div class="other">
        <mt-cell class='card' title="其他信息认证(选填)">
          <img slot="icon" src="./other.png" width="22" height="22">
        </mt-cell>
        <mt-cell title="身份" is-link @click.native="clickShow3">
          <span>{{otherType}}</span>
        </mt-cell>
        <mt-field :label="prograTitle" placeholder="请填写主持栏目名称" type="textarea" rows="4" v-model.trim="otherDesc"></mt-field>
        <mt-cell :title="otherTitle" ></mt-cell>
        <!-- 其他信息上传图片 -->
        <div class="upload">
          <form id="uploadImg" enctype="multipart/form-data">
            <label for="imgFile" class='changeImg'>选择照片</label>
            <input type="file" name="img" @change="oncolumnchange" v-show="false" id="imgFile" class='chose' multiple>
            <input type="button" @click="uploadImg()" v-show="false" value="点击上传图片">
          </form>
          <div class='intro'>
            <img v-show="isdefault" class='introImg' src="./workcard.png">
            <img v-show="!isdefault" class='introImg' id="show-bic" src="./workcard.png">
            <p class='desc'>请参考示意图拍摄证件，照片信息必须清晰可见，大小不超过3M，仅支持jpg或png格式</p>
          </div>
        </div>
      </div>
      <p class='remiInfo' @click.stop="changeCheck">
        <!-- <span class='title'><mt-switch v-model="ischecked"></mt-switch></span> -->
        <!-- <span class='agree'>{{ischecked?'我已阅读并同意《主持人认证协议》':'暂未阅读《主持人认证协议》'}}</span> -->
        <span class='title'>
          <img src="./radio_checked.png" alt="" width="14" height="14" v-show="ischecked">
          <img src="./radio_uncheck.png" alt="" width="14" height="14" v-show="!ischecked">
        </span>
        <span>我已阅读并同意<span @click.stop="checkAnchor" class='checkAnchor'>《主播认证协议》</span></span>
      </p>
      <mt-button :disabled="!ischecked" class='saveform' @click.native="saveform" type="primary">立即认证</mt-button>




      <!-- 身份信息认证 证件类型 -->
      <!-- <mt-popup v-model="popupcredent" position="bottom" class="mint-popup-4">
        <mt-picker :slots="dateSlots" @change="idCardChange" :visible-item-count="5" :show-toolbar="false"></mt-picker>
      </mt-popup> -->

      <!-- 主播信息认证 证件类型 -->
      <!-- <mt-popup v-model="popupradio" position="bottom" class="mint-popup-4">
        <mt-picker :slots="radioArr" @change="onRadioChange" :visible-item-count="5" :show-toolbar="false"></mt-picker>
      </mt-popup> -->

      <!-- 其他信息认证 证件类型 -->
      <!-- <mt-popup v-model="popupother" position="bottom" class="mint-popup-4">
        <mt-picker :slots="otherArr" @change="otherChange" :visible-item-count="5" :show-toolbar="false"></mt-picker>
      </mt-popup> -->

    </div>
    <div class="wrapper" v-show="isShowproto">
        <span class="close" @click="hideProto">关闭</span>
        <div class="info">
          <h2>主播认证协议</h2>
          <p>我们支持MP3, WMA，AIFF，AIF, WAV, FLAC, OGG, MP2, AAC，AMR等文件格式，文件≤200M，请尽量上传高音质音频</p>
          <p>请遵守 版权声明 相关约定，只上传版权拥有者允许你上传的声音文件 如上传盗版内容，将会导致下架、封号、索赔，甚至被追究刑事责任。 </p>
          <h3>版权声明</h3>
          <p>杭州影投网络科技有限公司及其经营的发耶（以下简称：“发耶”）根据用户指令提供作品上传、下载以及传播等，向来十分重视网络版权及其他知识产权以及用户权益的保护。</p>
          <p>如果您认为发耶用户通过发耶提供的信息存储空间所上载、传播的视听内容侵犯了您的相关权益的，请您向发耶发出权利通知，发耶将根据相关法律规定采取措施删除相关内容，您可以向发耶邮箱发送通知书。</p>
          <h3>版权、肖像、名誉等申诉</h3>
          <p>侵犯个人或单位的著作权、商标权等知识产权的、侵犯公民个人名誉权、肖像权的投诉资料请发至： fayeht@0571hg.com</p>
          <h3>申诉需知</h3>
          <p>投诉方应当提供包含下列文件:</p>
          <p>1、完整填写的申请书</p>
          <p>2、权利人的姓名（名称）、联系方式、地址、身份证扫描件（自然人）、企业法人营业执照（单位）、法定代表人身份证明（单位）；</p>
          <p>3、要求删除或者断开链接的侵权作品的准确名称和网络地址，以便发耶能够发现并初步审核涉嫌侵权作品；</p>
          <p>4、认为构成侵权的初步证明材料，包括但不限于对作品享有版权或依法享有信息网络传播权的权属证明，以及对涉嫌侵权作品侵权事实的举证。</p>
          <p>5、通知书需由权利人或其合法授权人亲笔签名，若为单位则需加盖单位公章。</p>
          <p>6、权利人应对通知书的真实性负责。若通知书的内容不真实，权利人将承担由此造成的全部法律责任。</p>
          <p>一旦收到符合上述要求之通知，我们将在合理时间内删除涉嫌侵权的作品。如不符合上述条件，我们会请阁下提供相应信息，且暂不采取包括删除等相应措施。</p>
          <p>在发耶上载作品的用户视为同意发耶就前款情况所采用的相应措施。发耶不因此而承担任何违约责任或其他任何法律责任。</p>
          <p>发耶在收到上述通知后会发送电子邮件通知上载该等作品的用户。对于多次上载涉嫌侵权作品的用户，我们将取消其用户资格。</p>
          <p></p>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import { Toast } from 'mint-ui';
import IDValidator from 'id-validator';
// import uploadImg from './upload-img.vue';
/* eslint-disable no-new */
let Validator = new IDValidator();
const col1Data1 = [
  { text: '二代身份证', value: '二代身份证' },
  { text: '台湾居民来往大陆通行证', value: '台湾居民来往大陆通行证' },
  { text: '港澳居民来往内地通行证', value: '港澳居民来往内地通行证' },
  { text: '护照', value: '护照' }
];
const col1Data3 = [
  { text: '广播电台主持人', value: '广播电台主持人' },
  { text: '电视主持人', value: '电视主持人' },
  { text: '大V', value: '大V' }
];
export default {
  name: 'anchor',
  data() {
    return {
      uid: this.$route.query.uid, // 发起请求时传的uid
      phone: this.$route.query.phone, // 手机号
      email: '', // 邮箱
      // nickname: '', // 昵称
      nickname: this.$route.query.nickname, // 昵称
      cardType: '', // 身份
      realName: '', // 真实姓名
      cardNum: '', // 证件号
      cardImg: '', // 证件照片
      topicName: '', // 主播证件类型 name
      topicType: '', // 主播证件类型 id
      descri: '', // 主播信息认证简介
      otherType: '', // 其他证件类型
      userType: '', // 证件类型
      otherDesc: '', // 其他简介
      otherDescImg: '', // 其他说明照片
      ischecked: false, // 选中已阅读
      // popupcredent: false, // 身份证件类型弹窗
      // popupradio: false, // 主播证件类型弹窗
      // popupother: false, // 其他证件类型弹窗
      // dateSlots: [
      //   {
      //     values: ['二代身份证', '台湾居民来往大陆通行证', '港澳居民来往内地通行证', '护照'],
      //     textAlign: 'center'
      //   }
      // ], // 身份信息认证类型
      // radioArr: [
      //   {
      //     values: ['电台头条1', '电台头条2', '电台头条3'],
      //     textAlign: 'center'
      //   }
      // ], // 主播信息认证类型
      // otherArr: [
      //   {
      //     values: ['广播电台主持人', '电视主持人', '大V'],
      //     textAlign: 'center'
      //   }
      // ], // 其他信息认证类型
      issave: false, // 点击保存
      isdefault: false, // 默认图片占位
      // isCheckNickName: false, // 昵称是否可用
      arrdefault: [], // 保存的证件类型
      prograTitle: '栏目',
      otherTitle: '工作证照片',
      isShowproto: false // 显示协议
    };
  },
  created() {
    this.getTopicLabelList();
    // this.getLocaltionHerf();
    // const a = this.$refs.anchor.offsetTop;
    // console.log(a);
  },
  mounted() {
    this.picker1 = this.$createPicker({
      data: [col1Data1],
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        this.cardType = selectedVal.join();
      },
      onCancel: () => {}
    });

    this.picker3 = this.$createPicker({
      data: [col1Data3],
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        this.otherType = selectedVal.join();
        if (this.otherType === '大V') {
          this.prograTitle = '大V属性';
          this.otherTitle = '个人主页照片';
        } else {
          this.prograTitle = '栏目';
          this.otherTitle = '工作证照片';
        }
      },
      onCancel: () => {}
    });
  },
  methods: {
    clickShow1() {
      this.picker1.show();
    },
    clickShow2() {
      this.picker2.show();
    },
    clickShow3() {
      this.picker3.show();
    },
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
      }
      this.uid = obj.uid;
      this.phone = obj.phone;
    },
    // 身份证上传图片
    idCardOnchange(e) {
      let file = document.querySelector('#idCardFile').files[0];
      console.log(file);
      // //获得图片文件的url
      let url = URL.createObjectURL(file);
      let img = document.getElementById('show-pic');
      img.src = url;
      // 调用图片上传
      this.uploadIdCardImg();
      // this.checkNickname();
    },
    // 其他上传图片
    oncolumnchange(e) {
      let file = document.querySelector('#imgFile').files[0];
      console.log(file);
      // //获得图片文件的url
      let url = URL.createObjectURL(file);
      let img = document.getElementById('show-bic');
      img.src = url;
      // 调用图片上传
      this.uploadImg();
    },
    // 身份信息认证 证件类型
    // idCardChange(picker, values) {
    //   console.log(values);
    //   this.cardType = values.join();
    // },
    // 主播信息认证 证件类型
    // onRadioChange(picker, values) {
    //   console.log(values);
    //   this.topicName = values.join();
    // },
    // 其他信息认证 证件类型
    // otherChange(picker, values) {
    //   console.log(values);
    //   this.otherType = values.join();
    // },
    async saveform() {
      if (this.phone === '') {
        return Toast('手机号不能为空');
      }
      if (this.email === '') {
        return Toast('邮箱不能为空');
      }
      if (
        !this.email.match(
          RegExp('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$')
        )
      ) {
        return Toast('请输入正确的邮箱格式');
      }
      if (this.nickname === '') {
        return Toast('昵称不能为空');
      }
      if (this.cardType === '') {
        return Toast('身份信息证件类型不能为空');
      }
      if (this.realName === '') {
        return Toast('真实姓名不能为空');
      }
      if (this.cardNum === '') {
        return Toast('证件号不能为空');
      }
      // 身份证号验证
      if (this.cardType === '二代身份证') {
        if (!Validator.isValid(this.cardNum)) {
          return Toast('身份号格式不正确');
        }
      } else {
        if (!this.cardNum.match(RegExp('^[0-9]*$'))) {
          return Toast('证件号只能输入数字');
        }
      }
      if (this.topicName === '') {
        return Toast('达人主播类型不能为空');
      }
      if (this.descri === '') {
        return Toast('达人主播简介不能为空');
      }

      this.arrdefault.forEach(item => {
        if (item.text === this.topicName) {
          this.topicType = item.value;
          console.log('labelId: ', item.value);
          console.log('topicType: ', this.topicType);
          return false;
        }
      });

      // 昵称验证
      const data = {
        phone: this.phone, // 手机号
        uid: this.uid, // 用户ID
        // phone: this.phone, // 手机号
        email: this.email, // 邮箱
        nickname: this.nickname, // 昵称
        cardType: this.cardType, // 证件类型
        realName: this.realName, // 真实姓名
        cardNum: this.cardNum, // 证件号
        cardImg: this.cardImg, // 证件照片
        topicType: this.topicType, // 主播证件类型
        descri: this.descri, // 主播信息认证简介
        orgOrUser: 1, // 个人达人主播
        userType: this.userType, // 证件类型
        otherDesc: this.otherDesc, // 其他简介
        otherDescImg: this.otherDescImg, // 其他说明照片
        otherType: this.otherType // 其他类型
      };
      const params = {};
      Object.keys(data).forEach(key => {
        if (data[key] !== '') {
          params[key] = data[key];
        }
      });
      // 1.验证昵称
      // await this.checkNickname();
      // 2.上传图片
      // await this.uploadIdCardImg();
      // await this.uploadImg();
      // 3.我同意
      if (this.ischecked) {
        // 身份图片验证
        // if (this.cardImg === '') {
        //   return Toast('手持身份证照片不能为空');
        // }
        // 验证昵称是否可用
        // if (!this.isCheckNickName) {
        //   return Toast('昵称不可用');
        // }

        // console.log('apply');
        console.log(params);
        await this.apply(params);
      }
    },
    // 申请主播达人认证
    async apply(data) {
      axios({
        method: 'post',
        url: '/myselfdev/userTopic/apply',
        data: qs.stringify(data)
      }).then(res => {
        console.log(res.data.data);
        if (res.data.status === 200) {
          // Toast(res.data.msg);
          this.$router.push({
            path: '/anchorstatus',
            query: {
              uid: this.uid
            }
          });
        } else {
          Toast(res.data.msg);
        }
      });
    },
    // 获取主播证件类型
    async getTopicLabelList() {
      axios({
        method: 'post',
        url: '/listendev/topic/topicLabelList'
      }).then(res => {
        console.log(res.data.data);
        if (res.data.status === 200) {
          // const arr = [];
          const arrdefault = [];
          res.data.data.forEach(item => {
            // arr.push(item.labelName);
            const obj = {
              text: item.labelName,
              value: item.labelId
            };
            arrdefault.push(obj);
          });
          // this.radioArr[0].values = arr;
          this.arrdefault = arrdefault;
          this.picker2 = this.$createPicker({
            data: [this.arrdefault],
            onSelect: (selectedVal, selectedIndex, selectedText) => {
              this.topicName = selectedText.join();
              console.log(selectedVal);
              console.log(selectedIndex);
              console.log(selectedText);
            },
            onCancel: () => {}
          });
        }
      });
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
      axios(config).then(res => {
        console.log('身份正上传图片：', res);
        if (res.data.status === 200) {
          this.cardImg = res.data.data.url;
          Toast('手持身份证照片已上传');
        } else {
          return Toast(res.data.msg);
        }
      });
    },
    // 其他信息上传图片
    async uploadImg() {
      let form = new FormData(document.getElementById('uploadImg'));
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
      axios(config).then(res => {
        console.log('其他信息上传图片', res);
        if (res.data.status === 200) {
          this.otherDescImg = res.data.data.url;
          Toast('其他信息照片已上传');
        } else {
          return Toast(res.data.msg);
        }
      });
    },
    // 昵称验证
    // async checkNickname() {
    //   let config = {};
    //   config = {
    //     method: 'post',
    //     url: '/myselfdev/userData/checkNickname',
    //     timeout: 30000,
    //     cache: 'force-cache',
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //     },
    //     data: qs.stringify({ nickName: this.nickname })
    //   };
    //   axios(config).then(res => {
    //     console.log('昵称：', res);
    //     if (res.data.status === 200) {
    //       this.isCheckNickName = true;
    //     } else {
    //       this.isCheckNickName = false;
    //     }
    //   });
    // },

    changeCheck() {
      this.ischecked = !this.ischecked;
    },
    checkAnchor() {
      this.isShowproto = true;
    },
    hideProto() {
      this.isShowproto = false;
    }
  }
};
</script>

<style lang="css" scoped>
.card {
  margin: 5px 0 0 0;
  font-weight: 900;
}
.saveform {
  width: 100%;
}
.avator {
  width: 70px;
  display: block;
  margin: 0 auto;
}
.intro {
  text-align: center;
}
.introImg {
  width: 100px;
  display: inline-block;
  margin: 0 10px;
}
.desc {
  display: inline-block;
  width: 40%;
  vertical-align: top;
  line-height: 24px;
  text-align: left;
  font-size: 14px;
}
.chose {
  padding-left: 10px;
}

.agree {
  display: inline-block;
  vertical-align: top;
  line-height: 35px;
  padding-left: 20px;
  font-size: 12px;
}
/* .namereq::before {
  display: inline-block;
  content: '*';
  color: rgb(255, 0, 0);
  position: relative;
  left: 7px;
  top: 20px;
} */
.remiInfo {
  text-align: center;
  margin: 15px 0;
}
.checkAnchor {
  color: blue;
}
.title {
  display: inline-block;
  padding-right: 10px;
  position: relative;
  top: 1px;
}
.changeImg {
  width: 200px;
  margin: 20px auto;
  color: #ffffff;
  padding: 5px;
  display: block;
  text-align: center;
  border-radius: 5px;
  background-color: rgba(173, 0, 33, 1) !important;
}
.idcard,
.radio,
.other {
  margin-top: 10px;
}
p {
  margin: 0;
}
.wrapper {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
}
.wrapper h2 {
  margin: 20px 0;
  text-align: center;
}
.wrapper .close {
  width: 32px;
  height: 32px;
  color: red;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 200;
}
.wrapper .info {
  background: #ffffff;
  line-height: 18px;
  padding: 10px;
}
.wrapper .info p {
  margin-bottom: 5px;
}
.wrapper .info h3 {
  margin: 10px 0;
  font-weight: 700;
}
</style>
<style lang="css">
.mint-header {
  background-color: rgba(255, 255, 255, 1) !important;
  color: rgba(43, 43, 43, 1) !important;
  line-height: 25px;
}
.mint-radio-label {
  font-size: 14px;
}
.mint-popup-4 {
  width: 100%;
  z-index: 10;
}
.mint-button--primary {
  background-color: rgba(173, 0, 33, 1) !important;
}
h1 {
  margin: 0;
}
</style>

