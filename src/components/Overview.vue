<template>
  <!--  <div style="height: 50%; width:100%; border: 1px solid #eee">-->
  <!--    <el-header style="text-align: right; font-size: 12px">-->
  <!--      <span>overview</span>-->
  <!--      <h1 style="display: none">{{ getLocationData }}</h1>-->
  <!--    </el-header>-->
  <!--    <div id="map" bordered :dataSource="$store.state.get_locations.data"></div>-->
  <!--  </div>-->
  <!--  <el-container style="height: 100%; width:100%; border: 1px solid #eee">-->
  <!--    <OverviewLeftSide></OverviewLeftSide>-->


  <el-container style="width: 100%; height: 100%">
    <!--    <el-header style="text-align: right; font-size: 12px">-->
    <!--      <span>overview</span>-->
    <!--      <h1 style="display: none">{{ getLocationData }}</h1>-->
    <!--    </el-header>-->
    <!--        <el-main>-->

    <div class="map_container" style="height: 100%; width: 100%; z-index:1; background-color: #13E8E9">
      <div id="map" bordered :dataSource="$store.state.get_locations.data"></div>
    </div>

    <svg style="position: absolute; z-index: 999998; width: 100%; height: 100%" pointer-events="none"></svg>
    <Search class="search-component"
            style="position: absolute; z-index: 99999;  top: 50px; left: 50px; background-color: #00192E">

    </Search>
  </el-container>

  <!--  </el-container>-->
</template>

<script>
import dataService from "@/service/dataService";
import OverviewLeftSide from "@/components/views/overview/OverviewLeftSide.vue";
import {mapState, mapGetters} from "vuex"
import * as d3 from "d3/dist/d3.js";
import Search from "@/components/views/overview/Search.vue";
//在组件的created中提交dispatch，然后通过action调用一个封装好的axios
// 然后再触发mutation来提交状态改变state中的数据，然后在组件的计算属性中获取state的数据并渲染在页面上
export default {
  name: "Overview",
  components: {
    OverviewLeftSide,
    Search
  },
  data() {
    return {
      map: "",
      dataset: {},
      form: {
        name: '',
      },
      map_width: 0,
      map_height: 0,
      timer: '',
      input: 'test'
    }
  },
  mounted: function () {
    this.map = this.loadMap();//加载地图
    let m = document.getElementById("map")
    this.map_width = window.getComputedStyle(m).width
    this.map_height = window.getComputedStyle(m).height

    let center_position = this.map.latLngToContainerPoint([22, 107])
    this.svg = d3.select(this.$el).select('svg');
    let circle = this.svg.append('circle')
        .attr('cx', center_position.x)
        .attr('cy', center_position.y)
        .attr('fill', 'yellow')
        .attr('fill-opacity', 0.5)
        .attr('r', 5);

    let _this = this;
    this.map.on('drag', (e) => {
      let center_position = this.map.latLngToContainerPoint([22, 107]);
      circle.attr('cx', center_position.x).attr('cy', center_position.y)
      if (this.locContainers) {
        this.locContainers.each(function (d) {
          let loc = _this.map.latLngToContainerPoint(d.locs)
          d3.select(this).attr('transform', 'translate(' + [loc.x, loc.y] + ')');
        })
      }
    });

    this.map.on('move', (e) => {
      let center_position = this.map.latLngToContainerPoint([22, 107]);
      circle.attr('cx', center_position.x).attr('cy', center_position.y);
      if (this.locContainers) {
        this.locContainers.each(function (d) {
          let loc = _this.map.latLngToContainerPoint(d.locs)
          d3.select(this).attr('transform', 'translate(' + [loc.x, loc.y] + ')');
        })
      }
    });


  },

  methods: {
    loadMap() {//加载地图
      let map = L.map("map", {
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
      ).addTo(map);
      return map
    },
    onSubmit() {
      console.log('submit!');
    },

  },
  computed: {
    //得到该地理位置的所有信息，包括地图上显示该位置并显示该位置所对应的风险等级
    //将各个点找到并显示
    dataList() {
      return this.$store.state.get_locations.data
      // console.log(this.dataset)
    }

  },
  created() {
    this.$store.dispatch('get_locations/getLocation')
  },
  watch: {
    dataList(valMap) {
      console.log('datalist', valMap)
      let list = [];
      for (let key in valMap) {
        let val = valMap[key];
        val.locs = [val.latitude, val.longitude]
        val['key'] = key;
        list.push(val);
      }

      let locContainers = this.svg.selectAll('.locContainer').data(list).enter().append('g');
      locContainers.append('circle').attr('class', 'locContainer').attr('fill', 'yellow').attr('r', 5);
      let _this = this;
      locContainers.each(function (d) {
        let loc = _this.map.latLngToContainerPoint(d.locs)
        d3.select(this).attr('transform', 'translate(' + [loc.x, loc.y] + ')');
      })
      this.locContainers = locContainers;

    }
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

.search-component {
  opacity: 0.1;

  border: dashed #0641ad 1px;
}

.search-component:hover {
  opacity: 1;
  border: dashed #0641ad 1px;
}


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