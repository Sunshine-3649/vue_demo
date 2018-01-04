<template>
  <div id='id'>
    <cube-button @click="showCascadePicker">Cascade Picker</cube-button>
    <cube-button @click="showPicker">Picker</cube-button>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import { provinceList, cityList, areaList } from '@/data/areaData';
const cityData = provinceList;
cityData.forEach(province => {
  province.children = cityList[province.value];
  province.children.forEach(city => {
    city.children = areaList[city.value];
  });
});

export default {
  name: 'name',
  data() {
    return {
      cascadePicker: null,
      cascadeData: []
    };
  },
  created() {
    // this.getCityData();
    this.cityPicker();
  },
  mounted() {},
  methods: {
    getCityData() {
      axios.post('/myselfdev/city/getAllCity').then(res => {
        if (res.data.status === 200) {
          console.log(res.data.data);
          cascadeData = res.data.data;
          this.getCityDataSub();
          // this.cityPicker(this.cascadeData);
        }
      });
    },
    getCityDataSub(parentId = '1') {
      axios
        .post(
          '/myselfdev/city/getAllCityArea',
          qs.stringify({
            parentId: parentId
          })
        )
        .then(res => {
          if (res.data.status === 200) {
            console.log(res.data.data);
            cascadeData.forEach(item => {
              if (item.id === parentId) {
                item.children = res.data.data;
              }
            });
            console.log(cascadeData);
            this.cityPicker(cascadeData);
            // cascadeData = res.data.data;
            // this.cityPicker(cascadeData);
          }
        });
    },
    showCascadePicker() {
      this.cascadePicker.show();
    },
    showPicker() {
      this.picker.show();
    },
    cityPicker() {
      const selft = this;
      this.cascadePicker = this.$createCascadePicker({
        title: 'Cascade Picker',
        data: cityData,
        selectedIndex: [0, 0],
        cancelTxt: '取消',
        confirmTxt: '确定',
        onSelect: (selectedVal, selectedIndex, selectedText) => {
          console.log('select', selectedVal, selectedIndex, selectedText);
        },
        onCancel: () => {
          console.log('cancel');
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
