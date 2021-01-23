<template>
  <el-col :span="10" class="" style="height: 100%">
    <el-card class="box-card " shadow="never"
             style="background-color: transparent; height: 70%; margin: 0px 5px 5px 5px">
      <!--          放地图-->
      <div class="map_container" style="height: 100%; width: 100%; z-index:1; background-color: transparent">
        <div id="map_3"
             style="pointer-events:inherit; height: 100%; width: 100%;"></div>
<!--        <div id="map_4"-->
<!--             style="pointer-events:inherit; height: 100%; width: 100%; display: none"></div>-->
      </div>
      <!--          <div id="map" bordered style="pointer-events:inherit"></div>-->
      <!--          <svg style="position: absolute; z-index: 8; width: 100%; height: 100%" pointer-events="none"></svg>-->
    </el-card>
    <!--每个项目历次检查的指数，放到项目级默认下的地图下面-->
    <el-card class="box-card " shadow="never"
             style="background-color: transparent; height: 28%; margin: 0px 5px 5px 5px">
      <div class="level4" style="display: block">
        <span>项目累计高风险数量排名</span>
      </div>
      <div style='display: none; text-align: center'>
        {{ getHighRiskRank }}
      </div>
      <div id='risk_rank' style="height: 90%; width: 100%; display: block"></div>

    </el-card>
  </el-col>

</template>

<script>
//import RegionNumberHistogram from "@/components/views/functions/RegionNumberHistogram.vue";
import * as d3 from "d3/dist/d3";
import elementResizeDetectorMaker from "element-resize-detector";
import {bar_option} from "@/utils/constants";

export default {
  name: "Region3_3",
  //components: {RegionNumberHistogram}
  computed: {
    getHighRiskRank() {
      let data = this.$store.state.get_region.high_risk_rank
      console.log('高风险', data)
      let arr = []
      for (let i in data) {
        let obj = {
          name: '',
          count: 0
        }
        obj.name = i;
        obj.count = data[i]['count'];
        arr.push(obj)
      }//for
      arr.sort(this.sortNumber('count', true))
      console.log(arr)
      bar_option["dataset"]["source"] = arr
      bar_option["series"]["barMaxWidth"] = 20
      bar_option["xAxis"]["axisLabel"]["rotate"] = 20
      return bar_option
    },
  },
  updated() {
    this.drawBarChart();
  },
  mounted() {
    // document.getElementById('map_2').style.display = 'none'
    // document.getElementById('map_1').style.display = 'block'
    this.map = this.loadMap();//加载地图
    let m = document.getElementById("map_3")
    this.map_width = window.getComputedStyle(m).width
    this.map_height = window.getComputedStyle(m).height

    this.svg = d3.select(this.$el).select('svg');
    // this.svg = d3.select(this.map.getPanes().overlayPane).append("svg");

    let _this = this;
    this.map.on('drag', (e) => {
      let center_position = this.map.latLngToContainerPoint([22, 107]);

      if (this.locContainers) {
        this.locContainers.each(function (d) {
          let loc = _this.map.latLngToContainerPoint(d.locs)
          d3.select(this).attr('transform', 'translate(' + [loc.x, loc.y] + ')');
        })
      }
    });

    this.map.on('move', (e) => {
      let center_position = this.map.latLngToContainerPoint([22, 107]);
      if (this.locContainers) {
        this.locContainers.each(function (d) {
          let loc = _this.map.latLngToContainerPoint(d.locs)
          d3.select(this).attr('transform', 'translate(' + [loc.x, loc.y] + ')');
        })
      }
    });
    this.drawBarChart();
  },
  methods: {
    drawBarChart() {
      let myChart = this.$echarts.init(document.getElementById('risk_rank'))
      myChart.setOption(this.getHighRiskRank);
      myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("risk_rank"), element => {
        _this.$nextTick(() => {
          //监听到事件后执行的业务逻辑
          myChart.resize();
        });
      });
    },
    loadMap() {//加载地图
      this.map = L.map("map_3", {
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
      ).addTo(this.map);
      let p_data = this.$store.state.get_login.position
      // add a polygon
      // for (let i = 0; i < p_data.length; i++) {
        var polygon = L.polygon(p_data[0], {
          color: 'green',
          fillColor: '#f03',
          fillOpacity: 0.5
        }).addTo(this.map);
      // }
      for (let i = 0; i < p_data[0].length; i++) {
        L.marker([p_data[0][i][0], p_data[0][i][1]]).addTo(this.map);
      }
      // this.map.panTo(new L.LatLng(40.737, -73.923));
      let myChart = this.$echarts.init(document.getElementById('index_chart'))
      let _this = this
      myChart.on('click', function (params) {
        // console.log(params.data)
        let param1 = new URLSearchParams();
        param1.append('check_code', (params.data.name))
        _this.$store.state.get_check.params = param1
        _this.$store.dispatch('get_region/getInitRegionProjectNumber')
        _this.$store.dispatch('get_region/getInitRegionRiskLevel')
        _this.$store.dispatch('get_region/getInitRegionHighRisk')
        _this.$store.dispatch('get_region/getInitRegionImage')
        _this.$store.dispatch('get_region/getInitRegionMajor')
        _this.$store.dispatch('get_region/getInitRegionNumberTop')
        _this.$store.dispatch('get_region/getInitRegionSafetyIndex')
        _this.$store.dispatch('get_region/getInitRegionRiskRank')
        let region = document.getElementById('region_part');
        let prj = document.getElementById('prj_part');
        prj.style.display = 'none'
        let check = document.getElementById('check_part');
        check.style.display = 'block'
        // check.style.width = "500px"
        // check.style.width = "99%"
        document.getElementById('map_2').style.display = 'none'
        document.getElementById('map_1').style.display = 'block'
        _this.map.setZoom(12)
        setTimeout(function () {
          _this.map.panTo(new L.LatLng(params.data.lat, params.data.lng));
        }, 300)
      })

      return this.map
    },
    sortNumber(attr, rev) {
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = (rev) ? 1 : -1;
      }

      return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      }
    }

  }
}
</script>

<style scoped>

</style>