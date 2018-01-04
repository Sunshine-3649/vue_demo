<template>
  <div class='org' ref="org">
    <!-- 机构资料 -->
    <div class="other">
      <mt-cell class='card' title="机构资料">
        <img slot="icon" src="./sq_iocn_jg@2x.png" width="23">
      </mt-cell>
      <mt-field label="机构全称" class='namereq' placeholder="机构全称" v-model.trim="userDesc" disableClear ></mt-field>
      <mt-cell title="所在地" is-link @click.native="showCascadePicker">
        <span>{{city}}</span>
      </mt-cell>
      <mt-cell title="营业执照">
        <span>（或其他具有同等效力的相关证明文件）</span>
      </mt-cell>
      <!-- 营业执照上传图片 -->
      <div class="upload">
        <form id="uploadImg" enctype="multipart/form-data">
          <label for="imgFile" class='changeImg'>选择照片</label>
          <input type="file" name="img" @change="oncolumnchange" v-show="false" id="imgFile" class='chose' multiple>
          <input type="button" @click="uploadImg()" v-show="false" value="点击上传图片">
        </form>
        <div class='intro'>
          <img v-show="isdefault" class='introImg' src="./sq_img1@2x.png">
          <img v-show="!isdefault" class='introImg' id="show-bic" src="./sq_img1@2x.png">
          <p class='desc'>请参考示意图拍摄证件，照片信息必须清晰可见，大小不超过3M，仅支持jpg或png格式</p>
        </div>
      </div>
    </div>

    <!-- 机构负责任人信息 -->
    <mt-cell class='card' title="机构负责人信息"><img slot="icon" src="./base.png" width="30"></mt-cell>
    <mt-field label="手机号" class='namereq' placeholder="手机号" disableClear v-model="phone"></mt-field>
    <mt-field label="邮箱" class='namereq' placeholder="请输入你常用的邮箱" v-model.trim="email"></mt-field>

    <!-- 身份信息认证 -->
    <div class="idcard">
      <!-- <mt-cell class='card' title="身份信息认证">
        <img slot="icon" src="./appro.png" width="29" height="22">
      </mt-cell> -->
      <mt-cell title="证件类型" is-link @click.native="clickShow1">
        <span>{{cardType}}</span>
      </mt-cell>
      <mt-field label="姓名" class='namereq' placeholder="请填写负责人真实姓名" v-model.trim="realName"></mt-field>
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
      <p class='remiInfo' @click.stop="changeCheck">
          <!-- <span class='title'><mt-switch v-model="ischecked"></mt-switch></span> -->
          <!-- <span class='agree'>{{ischecked?'我已阅读并同意《主持人认证协议》':'暂未阅读《主持人认证协议》'}}</span> -->
          <span class='title'>
            <img src="./radio_checked.png" alt="" width="14" height="14" v-show="ischecked">
            <img src="./radio_uncheck.png" alt="" width="14" height="14" v-show="!ischecked">
          </span>
          <span>我已阅读并同意<span @click.stop="checkorg" class='checkorg'>《主播认证协议》</span></span>
        </p>
        <mt-button :disabled="!ischecked" class='saveform' @click.native="saveform" type="primary">立即认证</mt-button>
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
import { provinceList, cityList, areaList } from '@/data/areaData';

// 城市三级联动
const cityData = provinceList;
cityData.forEach(province => {
  province.children = cityList[province.value];
  province.children.forEach(city => {
    city.children = areaList[city.value];
  });
});

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
  name: 'org',
  data() {
    return {
      uid: '', // 发起请求时传的uid
      phone: '', // 手机号
      email: '', // 机构负责人邮箱
      cardType: '请选择证件类型', // 机构负责人身份类型
      realName: '', // 机构负责人真实姓名
      cardNum: '', // 机构负责人证件号
      cardImg: '', // 机构负责人证件照片
      userDescImg: '', // 机构营业执照照片
      ischecked: false, // 选中已阅读
      isdefault: false, // 默认图片占位
      isShowproto: false, // 显示协议
      userDesc: '', // 机构全称
      city: '请选择机构所在地' // 机构所在地
    };
  },
  created() {
    this.getLocaltionHerf();
    // const a = this.$refs.org.offsetTop;
    // console.log(a);
  },
  mounted() {
    // 显示身份证类型
    this.picker1 = this.$createPicker({
      data: [col1Data1],
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        this.cardType = selectedVal.join();
      },
      onCancel: () => {}
    });

    this.cityPicker();
  },
  methods: {
    // 显示城市三级联动
    showCascadePicker() {
      this.cascadePicker.show();
    },
    // 获取城市列表
    cityPicker() {
      const selft = this;
      this.cascadePicker = this.$createCascadePicker({
        title: '',
        data: cityData,
        selectedIndex: [10, 0, 4],
        cancelTxt: '取消',
        confirmTxt: '确定',
        onSelect: (selectedVal, selectedIndex, selectedText) => {
          console.log('select', selectedVal, selectedIndex, selectedText);
          console.log(selectedText[2].match('市辖区'));
          let ischecked = false;
          selectedText.forEach(item => {
            ischecked = item.match('市辖区') ? (ischecked = true) : ischecked;
          });
          console.log(ischecked);
          if (ischecked) {
            return Toast({
              message: '请选择市辖区',
              duration: 2000
            });
          }
          const cityValue = selectedText.join('/');
          this.city = cityValue;
        },
        onCancel: () => {
          console.log('cancel');
        }
      });
    },
    getCityData() {},
    // 显示身份证类型
    clickShow1() {
      this.picker1.show();
    },
    // 获取url参数
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
      console.log(this.uid);
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
    },
    // 机构营业执照上传图片
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
    // 获取表单数据，参数过滤
    async saveform() {
      let checkNum = new RegExp(/^[\w\u4e00-\u9fa5]+$/, 'g'); // 检测中文数字字母下划线
      let istrue = checkNum.test(this.userDesc);
      console.log(istrue);
      if (this.userDesc === '') {
        return Toast('机构全称不能为空');
      }
      if (!istrue) {
        return Toast('机构全称只能包含中文字母数字下划线');
      }
      if (this.city === '请选择机构所在地') {
        return Toast('机构所在地不能为空');
      }
      if (this.userDescImg === '') {
        return Toast('营业执照不能为空');
      }
      if (!this.phone) {
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
      if (this.cardType === '请选择证件类型') {
        return Toast('机构负责人证件类型不能为空');
      }
      if (this.realName === '') {
        return Toast('姓名不能为空');
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
      if (this.cardImg === '') {
        return Toast('身份证照片不能为空');
      }

      const data = {
        uid: this.uid, // 用户ID
        userDesc: this.userDesc, // 机构全称
        city: this.city, // 所在地
        userDescImg: this.userDescImg, // 营业执照照片
        phone: this.phone, // 机构负责人手机号
        email: this.email, // 机构负责人邮箱
        cardType: this.cardType, // 机构负责人证件类型
        realName: this.realName, // 机构负责人姓名
        cardNum: this.cardNum, // 机构负责人证件号
        cardImg: this.cardImg, // 机构负责人证件照片
        orgOrUser: 2 // 机构传参类型
      };
      const params = {};
      Object.keys(data).forEach(key => {
        if (data[key] !== '') {
          params[key] = data[key];
        }
      });
      // 3.我同意
      if (this.ischecked) {
        console.log('params: ', params);
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
        console.log('机构上传图片', res);
        if (res.data.status === 200) {
          this.userDescImg = res.data.data.url;
          Toast('机构照片已上传');
        } else {
          return Toast(res.data.msg);
        }
      });
    },
    // 点击选中我同意
    changeCheck() {
      this.ischecked = !this.ischecked;
    },
    // 点击我同意展示文本
    checkorg() {
      this.isShowproto = true;
    },
    // 关闭我同意展示文本
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
.checkorg {
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
<style lang="stylus">
.org
  .mint-cell-wrapper
    .mint-field-core
      text-align: right
      padding-right: 1.5rem
</style>

