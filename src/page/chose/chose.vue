<template>
  <div id='id'>
    <div class="geren" @click="toGeRen">
      <img class='bgimg' src="./sf_grrz@2x.png" alt="">
    </div>
    <div class="jigou"  @click="toJiGou">
      <img class='bgimg' src="./sf_jgrz@2x.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'name',
  data() {
    return {
      uid: this.$route.query.uid,
      phone: this.$route.query.phone,
      nickname: this.$route.query.nickname
    };
  },
  methods: {
    toGeRen() {
      this.$router.push({
        path: '/anchor',
        query: {
          uid: this.uid,
          phone: this.phone,
          nickname: this.nickname
        }
      });
    },
    toJiGou() {
      this.$router.push({
        path: '/org',
        query: {
          uid: this.uid,
          phone: this.phone,
          nickname: this.nickname
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.jigou, .geren
  width 100%
  .bgimg
    display block
    width 100%

</style>
