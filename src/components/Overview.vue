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
      <div id="map" bordered :dataSource="$store.state.get_locations.data" style="pointer-events:inherit"></div>
    </div>
    <div
        style="background-color: #05283e; opacity: 0.8; margin-top: 20px; color: #1d87d7;position: absolute; z-index: 999999; text-align: center; width:100%">
      <span class="head">大型综合体生命系统大数据平台</span>
    </div>
    <svg style="position: absolute; z-index: 8; width: 100%; height: 100%" pointer-events="none"></svg>
    <Search class="search-component"
            style="position: absolute; z-index: 9; top: 150px; left: 20px; background-color: #00192E">

    </Search>
    <Statistics class="search-component"
                style="background-color: #00192E; position: absolute; z-index: 9; top: 150px; right: 50px">

    </Statistics>
  </el-container>

  <!--    </el-container>-->
</template>

<script>
import dataService from "@/service/dataService";
import OverviewLeftSide from "@/components/views/overview/OverviewLeftSide.vue";
import {mapState, mapGetters} from "vuex"
import * as d3 from "d3/dist/d3.js";
import Search from "@/components/views/overview/Search.vue";
import Statistics from "@/components/views/overview/Statistics.vue";
//在组件的created中提交dispatch，然后通过action调用一个封装好的axios
// 然后再触发mutation来提交状态改变state中的数据，然后在组件的计算属性中获取state的数据并渲染在页面上
export default {
  name: "Overview",
  components: {
    OverviewLeftSide,
    Search,
    Statistics
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
  },

  methods: {
    loadMap() {//加载地图
      let map = L.map("map", {
        center: [34, 107], // 地图中心
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
    this.$store.dispatch('get_locations/getLatestProjection')
    this.$store.dispatch('get_locations/getHighRiskRank')
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

      let level1CountRange = d3.extent(list, d => d.risk_level[1]);
      let level2CountRange = d3.extent(list, d => d.risk_level[2]);
      let level3CountRange = d3.extent(list, d => d.risk_level[3]);
      let minCount = d3.min([level1CountRange, level2CountRange, level3CountRange], d => d[0]);
      let maxCount = d3.max([level1CountRange, level2CountRange, level3CountRange], d => d[1]);

      console.log('minCount  maxCount', minCount, maxCount);
      let radiusScale = d3.scaleLinear().domain([minCount, maxCount]).range([0, 20]);

      this.radusScale = radiusScale;
      let locContainers = this.svg.selectAll('.locContainer').data(list).enter().append('g');
      // locContainers.append('circle').attr('class', 'locContainer').attr('fill', 'yellow').attr('r', 5);
      let _this = this;
      locContainers.each(function (d) {
        let loc = _this.map.latLngToContainerPoint(d.locs)
        d3.select(this).attr('transform', 'translate(' + [loc.x, loc.y] + ')');

        let pieChartContainer = d3.select(this).append('g');
        let risk_list = [];
        let countSum = 0;
        for (let key in d.risk_level) {
          countSum += d.risk_level[key];
          risk_list.push({
            'risk': key,
            'count': d.risk_level[key]
          })
        }
        risk_list.forEach(d => {
          d.countRatio = d.count / countSum;
        })

        let generateArc = function (risk) {
          let arcData = {
            'risk': risk['risk'],
            'count': risk.count
          };
          if (risk['risk'] == 1) {
            arcData['startAngle'] = 0 * 120 / 180 * Math.PI;
            arcData['endAngle'] = 1 * 120 / 180 * Math.PI;
          } else if (risk['risk'] == 2) {
            arcData['startAngle'] = 1 * 120 / 180 * Math.PI;
            arcData['endAngle'] = 2 * 120 / 180 * Math.PI;
          } else if (risk['risk'] == 3) {
            arcData['startAngle'] = 2 * 120 / 180 * Math.PI;
            arcData['endAngle'] = 3 * 120 / 180 * Math.PI;
          }
          let arc = d3.arc()
              .innerRadius(0)
              .outerRadius(radiusScale(arcData.count))
              .cornerRadius(0)

          return arc(arcData)
        };


        let countList = [d.risk_level[1], d.risk_level[2], d.risk_level[3]];
        var arcs = d3.pie()(countList);

        var arc = d3.arc()
            .innerRadius(5)
            .outerRadius(12)
            .cornerRadius(1)

        let colors =
            [
              '#25EAED',
              '#F19041',
              '#FA574D'
            ];

        var background = pieChartContainer.selectAll(".arcPath")
            .data(arcs)
            .enter()
            .append("path").attr('class', 'arcPath')
            .style("fill", function (d, i) {
              return colors[i];
            })
            .attr("d", arc)
            .attr('stroke-width', 0.5)
            .attr('stroke', 'white')
            .attr('fill-opacity', 0.8)
            .on('mouseover', d => {
              console.log('mouseover', d)
            })

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

.head {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 40px;
}
</style>