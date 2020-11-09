<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <OverviewLeftSide></OverviewLeftSide>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>overview</span>
      </el-header>

      <el-main>
        <div id="map"></div>
      </el-main>
    </el-container>

    <OverviewRightSide></OverviewRightSide>
  </el-container>
</template>

<script>
// import axios from "axios";
import dataService from "@/service/dataService";
import OverviewRightSide from "@/components/OverviewRightSide.vue";
import OverviewLeftSide from "@/components/OverviewLeftSide.vue";

export default {
  name: "Overview",
  components: {OverviewLeftSide, OverviewRightSide},
  data() {
    return {
      map: "",
      dataset: [],
      form: {
          name: '',
      }
    }
  },
  mounted: function () {
    this.initDate();
    let _this = this
    let code_set = new Set()
    dataService.getLocation(function (records) {
      _this.dataset = records
      console.log(records.length)
      for (var i = 0; i < _this.dataset.length; i++) {
        let marker = L.marker([_this.dataset[i].lat, _this.dataset[i].lng]).addTo(_this.map);
        // marker.bindPopup(_this.dataset[i].city).openPopup(); // openPopup 是自动打开气泡
        code_set.add(_this.dataset[i].code)
      }
      console.log(code_set)
    })
    dataService.getPrjPie(code_set, function (records) {

    })
  },
  methods: {
    initDate() {
      this.map = L.map("map", {
        center: [22, 107], // 地图中心
        zoom: 5, //缩放比列
        zoomControl: false, //禁用 + - 按钮
        doubleClickZoom: false, // 禁用双击放大
        attributionControl: false // 移除右下角leaflet标识
      });
      let name = L.tileLayer(
          // 'https://api.mapbox.com/styles/v1/zhaiyzh/ckes4nsma2yls19op279otef9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemhhaXl6aCIsImEiOiJja2VyeWYzNTYwbHB1MnhzYTV0Z3didG1hIn0.forlrmKVYKXTsyP7voWu9Q'
          "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",//初始化一个 openlayers 地图
          // 天地图影像图层
          // "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d", //parent.TiandituKey()为天地图密钥
          // 天地图影像注记图层
          // "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d", //parent.TiandituKey()为天地图密钥
          // 加载谷歌地图
          // "http://webrd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8"
          // 加载高德地图
          // 'http://webrd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'
      ).addTo(this.map);
      //点击地图弹出经纬度
      // this.map.on('click', function (e) {
      //   console.log(e);
      //   alert('纬度：' + e.latlng.lat + '\n经度：' + e.latlng.lng);
      // });
      // 添加marker
      // let marker = L.marker([23.09, 114.23]).addTo(this.map)
      //添加marker pp
      // marker.bindPopup("我是popup").openPopup(); // openPopup 是自动打开气泡
      // axios.post(`http://localhost:5000/api/overview`)
      //           .then((ret) => {
      //               var jsonObj = JSON.parse(JSON.stringify(ret));
      //               // console.log(JSON.stringify(jsonObj));
      //               this.dataset = ret.data
      //               for(var i = 0; i < this.dataset.length; i++) {
      //                 L.marker([this.dataset[i].latitude, this.dataset[i].longitude]).addTo(this.map);
      //               }
      //           })
      //           .catch(function (error) {
      //               console.log(error.response)
      //           })

      //多点过滤
      // var marker = L.marker([31.8963, 117.293]).addTo(this.map);
      // L.marker([39.94, 116.33]).addTo(this.map);
      // var someFeatures = [{
      //   "type": "Feature",
      //   "properties": {
      //     "show_on_map": false
      //   },
      //   "geometry": {
      //     "type": "Point",
      //     "coordinates": [39.94, 116.33]
      //   }
      // }, {
      //   "type": "Feature",
      //   "properties": {
      //     "show_on_map": true
      //   },
      //   "geometry": {
      //     "type": "Point",
      //     "coordinates": [-104.98404, 44.74621]
      //   }
      // }];
      //
      // L.geoJSON(someFeatures, {
      //   filter: function (feature, layer) {
      //     return feature.properties.show_on_map;
      //   }
      // }).addTo(this.map);

    },
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

#map {
  width: 100%;
  height: calc(100vh);
}

.draw {
  display: flex;
  z-index: 2;
  width: 100px;
  height: 50px;
  position: absolute;
  left: 50px;
  justify-content: center;
  align-items: center;
}

.disDraw {
  display: flex;
  z-index: 2;
  width: 100px;
  height: 50px;
  position: absolute;
  left: 200px;
  justify-content: center;
  align-items: center;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: left;
}
</style>