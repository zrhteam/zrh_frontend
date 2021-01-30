<template>
  <!--  <div></div>-->
<!--  第一行放标题-->
  <el-row style="height: 100%;">
    <PrjDataScreen id="prj_small" style="display: none"></PrjDataScreen>
    <el-row id="large1" class="" style="height: 10%;">
      <el-col :span="4" style="height: 100%">
        <el-card class="title-box-card" shadow="never"
                 style="background-color: transparent; height: 99%; margin: 0px 5px 5px 5px">
          <el-image
              style="width: 90%; height: 90%"
              :src="url"
              :fit="fit"></el-image>
        </el-card>
      </el-col>
      <el-col :span="20" style="height: 100%">
        <el-card class="title-box-card " shadow="never"
                 style="background-color: transparent; height: 99%; margin: 0px 5px 5px 5px">
          <label id="prj_title1" style="color: #c4bcbc; font-family:宋体; font-size: 1em; height: 80% ">{{title1}}</label>
          <label id="prj_title2" style="color: #c4bcbc; font-family:宋体; font-size: 1em; height: 80% ">{{title2}}</label>
          <label id="prj_title3" style="color: #c4bcbc; font-family:宋体; font-size: 0.5em; height: 40% ">{{title3}}</label>
        </el-card>
      </el-col>
    </el-row>
<!--    第二行放图片-->
    <el-row id="large2" class="" style="height: 90%;">
<!--      第一列放树状图和缩略图-->
      <el-col :span="4" class="" style="height: 100%">
        <Tree
          :treeObj="treeObj"
          @handleNodeClick="handleTrNodeClick"
        ></Tree>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 24%; margin: 0px 5px 5px 5px">
          <el-button size="mini" round
                     style="z-index: 9; left: 12%; background-color: transparent; color: #ffffff; position: absolute"
                     @click="intoPrjDataScreen">展开
          </el-button>
          <PrjDataScreen id="small1"></PrjDataScreen>

          <!--          <label>数据大屏缩略图</label>-->
        </el-card>
      </el-col>
      <!--地图+历次检查指数-->
<!--      <PrjIndex></PrjIndex>-->
      <!--      </el-col>-->
<!--      第二列放pie、bar、table-->
      <el-col :span="15" class="" style="height: 100%">
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 98%; margin: 0px 2px 2px 2px">
<!--          第二列分为3行2列-->
<!--          第一行-->
          <el-row>

              <!--            第一列-->
            <el-col :span="12">
              <CheckHistoryPerc></CheckHistoryPerc>
            </el-col>

<!--            第二列-->
            <el-col>

            </el-col>
          </el-row>
<!--          第二行-->
          <el-row>
<!--            第1列-->
            <el-col :span="12">
              <CheckedHistory></CheckedHistory>
            </el-col>
<!--            第二列-->
            <el-col :span="12">
              <CheckedProject></CheckedProject>
            </el-col>
          </el-row>
<!--          第三行-->
          <el-row>
<!--            第一列-->
            <el-col :span="12">
              <HistoryTopRisk></HistoryTopRisk>
            </el-col>
<!--            第二列-->
            <el-col  :span="12">
              <UnsolvedImageList></UnsolvedImageList>
            </el-col>
          </el-row>

        </el-card>
      </el-col>
<!--      第三列放image、table-->
      <PrjOverviewPart></PrjOverviewPart>
      <CheckOverview id="check_part" style="display: none"></CheckOverview>
    </el-row>
<!--    <RegionOverview id="region_part" style="display: none"></RegionOverview>-->
  </el-row>
  <!--  <PrjDataScreen></PrjDataScreen>-->
</template>

<script>
import CheckedHistory from "@/components/views/Project/CheckedHistory.vue";
import Granularity from "@/components/views/Project/Granularity.vue";
import HistoryTopRisk from "@/components/views/Project/HistoryTopRisk.vue";
import PerctangePerc from "@/components/views/Project/PerctangePerc.vue";
import LastCheckPerc from "@/components/views/Project/LastCheckPerc.vue";
import CheckHistoryPerc from "@/components/views/Project/CheckHistoryPerc.vue";
import UnsolvedList from "@/components/views/Project/UnsolvedList.vue";
import UnsolvedImageList from "@/components/views/Project/UnsolvedImageList.vue";
import CheckedProject from "@/components/views/Project/CheckedProject.vue";
import IndexView from "@/components/views/HeadQuarters/IndexView.vue";
import PrjCurrentCorrectionRate from "@/components/views/Project/PrjCurrentCorrectionRate.vue";
import PrjIndex from "@/components/views/Project/PrjIndex.vue";
import PrjDataScreen from '@/components/views/Project/PrjDataScreen.vue'
import * as d3 from "d3/dist/d3";
import CheckOverview from "@/components/views/Check/CheckOverview.vue";
import PrjOverviewPart from "@/components/views/Project/PrjOverviewPart.vue";
import RegionOverview from "@/components/views/Region/RegionDataScreen.vue";
import Tree from "@/components/views/functions/Tree.vue";

export default {
  name: "PrjOverview",
  components: {
    RegionOverview,
    PrjOverviewPart,
    CheckOverview,
    Granularity,
    HistoryTopRisk,
    PerctangePerc,
    LastCheckPerc,
    CheckHistoryPerc,
    UnsolvedList,
    UnsolvedImageList,
    CheckedHistory,
    CheckedProject,
    IndexView,
    PrjCurrentCorrectionRate,
    // PrjEHSDataAnalysis3,
    PrjIndex,
    PrjDataScreen,
    Tree
  },
  // mounted: function () {
  //   document.getElementById('map_1').style.display = 'none'
  //   document.getElementById('map_2').style.display = 'block'
  //   this.map = this.loadMap();//加载地图
  //   let m = document.getElementById("map_2")
  //   this.map_width = window.getComputedStyle(m).width
  //   this.map_height = window.getComputedStyle(m).height
  //
  //   this.svg = d3.select(this.$el).select('svg');
  //   // this.svg = d3.select(this.map.getPanes().overlayPane).append("svg");
  //
  //   let _this = this;
  //   this.map.on('drag', (e) => {
  //     let center_position = this.map.latLngToContainerPoint([22, 107]);
  //
  //     if (this.locContainers) {
  //       this.locContainers.each(function (d) {
  //         let loc = _this.map.latLngToContainerPoint(d.locs)
  //         d3.select(this).attr('transform', 'translate(' + [loc.x, loc.y] + ')');
  //       })
  //     }
  //   });
  //
  //   this.map.on('move', (e) => {
  //     let center_position = this.map.latLngToContainerPoint([22, 107]);
  //     if (this.locContainers) {
  //       this.locContainers.each(function (d) {
  //         let loc = _this.map.latLngToContainerPoint(d.locs)
  //         d3.select(this).attr('transform', 'translate(' + [loc.x, loc.y] + ')');
  //       })
  //     }
  //   });
  // },
  methods: {
    intoPrjDataScreen() {
      var large1 = document.getElementById('large1');
      large1.style.display = 'none'
      var large2 = document.getElementById('large2');
      large2.style.display = 'none'
      var prj_small = document.getElementById('prj_small');
      prj_small.style.display = 'block'
      prj_small.style.width = "500px"
      document.getElementById('prj_charts').style.height = "500px"
      document.getElementById('check_charts').style.height = "500px"
      setTimeout(function () {
        prj_small.style.width = "99%"
        document.getElementById('prj_charts').style.height = "99%"
        document.getElementById('check_charts').style.height = "99%"
      }, 100)
      prj_small.style.width = "99%"
    },
    //PrjOverview.vue中的map_1首先被加载
    loadMap() {//加载地图
      this.map = L.map("map_2", {
        center: [34, 107], // 地图中心
        zoom: 4, //缩放比列
        zoomControl: false, //禁用 + - 按钮
        // doubleClickZoom: false, // 禁用双击放大
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
      // this.map.on('click', function (e) {
      //   console.log(e);
      //   alert('纬度：' + e.latlng.lat + '\n经度：' + e.latlng.lng);
      // });
      let p_data = this.$store.state.get_login.position
      let _this = this
      for (var i = 0; i < p_data[0][0].length; i++) {
        L.marker([p_data[0][0][i][0], p_data[0][0][i][1]]).addTo(_this.map);
        // var marker = L.marker([37.8542800187483, 112.534177962463]).addTo(this.map);
        // this.map.on("click", function (e) {
        //   var lat = e.latlng.lat;
        //   var lng = e.latlng.lng;
        //   marker.setLatLng([lat, lng]);
        // });
      }
      // this.map.panTo(new L.LatLng(40.737, -73.923));
      let myChart = _this.$echarts.init(document.getElementById('index_chart'))
      return _this.map
    },
    handleTrNodeClick(data, node) {
      this.handleTreeNodeClick(data, node)
    }
  },
  data() {
    return {
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      fit: 'fill',
      url: 'http://www.zhongrh.com/Upfiles/Base/2020111937459.png',
      filterText: '',
      treeObj: this.$store.state.get_login.grant_data.data.value,
      map: "",
      mapInfo: {},
      dataset: {},
      form: {
        name: '',
      },
      map_width: 0,
      map_height: 0,
      timer: '',
      input: 'test',
      title1: this.$store.state.get_login.grant_data.data.headquarter_tag,
      title2: this.$store.state.get_login.grant_data.data.region_tag,
      title3: this.$store.state.get_login.grant_data.data.project_tag
    };
  },
  created() {
    console.log('grant', this.$store.state.get_login.grant_data)
    //得到树形控件的内容 还负责封装了地理位置信息
    this.treeObj = this.$store.state.get_login.grant_data.data.value
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: calc(100vh);
}
</style>
