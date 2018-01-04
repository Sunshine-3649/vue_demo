<template>
  <div id='id'>
    <div class='org' ref="org">
      <div class="main" v-show="!isShowproto">

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

    </div>
  </div>
</template>

<script>
export default {
  name: 'name'
};
</script>

<style scoped>

</style>
