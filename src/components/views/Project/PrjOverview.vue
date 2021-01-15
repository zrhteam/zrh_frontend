<template>
  <!--  <div></div>-->
  <el-row style="height: 100%;">
    <PrjDataScreen id="prj_small" style="display: none"></PrjDataScreen>
    <el-row id="large1" class="" style="height: 10%;">
      <el-col :span="4" style="height: 100%">
        <el-card class="title-box-card" shadow="never"
                 style="background-color: transparent; height: 99%; margin: 0px 5px 5px 5px">
          <label>Logo</label>
        </el-card>
      </el-col>
      <el-col :span="20" style="height: 100%">
        <el-card class="title-box-card " shadow="never"
                 style="background-color: transparent; height: 99%; margin: 0px 5px 5px 5px">
          <label>中瑞恒可视化系统</label>
        </el-card>
      </el-col>
    </el-row>
    <el-row id="large2" class="" style="height: 90%;">
      <el-col :span="4" class="" style="height: 100%">
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height:74%; margin: 0px 5px 5px 5px">
          <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText"
              size="mini">
          </el-input>
          <div style="height: 80%">
            <el-scrollbar>
              <el-tree
                  class="filter-tree"
                  :data="data"
                  :props="defaultProps"
                  @node-click="handleNodeClick"
                  default-expand-all
                  :filter-node-method="filterNode"
                  ref="tree">
                <!--                <span class="span-ellipsis" slot-scope="{ node, data }">-->
                <!--                  <span :title="node.label">{{ node.label }}</span>-->
                <!--                </span>-->
              </el-tree>
            </el-scrollbar>
          </div>
        </el-card>
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
      <PrjIndex></PrjIndex>
      <!--      </el-col>-->
      <el-col :span="10" id="prj_part" style="height: 100%">
        <!--      <el-card class="boundary-B" shadow="never" style="background-color: transparent; height: 100%">-->
        <el-row style="height: 100%">
          <el-card class="statistics-box-card " shadow="never"
                   style="background-color: transparent; height: 5%; margin: 0px 5px 5px 5px">
            <label>chart</label>
          </el-card>
          <!--          <el-row style="height: 42%">-->
          <el-col :span="12" style="height: 42%">
            <CheckHistoryPerc></CheckHistoryPerc>
          </el-col>
          <el-col :span="12" style="height: 42%">
            <el-card class="box-card " shadow="never"
                     style="background-color: transparent; height: 80%; left: 10%; top: 10%">
              <!--          当前未整改高风险隐患列表-->
              <UnsolvedList></UnsolvedList>
            </el-card>
          </el-col>
          <!--          </el-row>-->
          <!--          <el-row style="height: 42%">-->
          <el-col :span="12" style="height: 42%">
            <!--当前整改率-->
            <PrjCurrentCorrectionRate></PrjCurrentCorrectionRate>
          </el-col>
          <el-col :span="12" style="height: 42%">
            <CheckedHistory></CheckedHistory>
            <!--历次检查隐患数量变化-->
          </el-col>
          <!--          </el-row>-->
          <el-col :span="24" style="height: 9%">
            <el-card class="statistics-box-card" shadow="never"
                     style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px">
              <label>more</label>
            </el-card>
          </el-col>
        </el-row>
        <!--      </el-card>-->
      </el-col>
      <CheckOverview id="check_part"></CheckOverview>
    </el-row>
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

export default {
  name: "PrjOverview",
  components: {
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

  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted: function () {
    document.getElementById('map_1').style.display = 'none'
    document.getElementById('map_2').style.display = 'block'
    this.map = this.loadMap();//加载地图
    let m = document.getElementById("map_2")
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
  computed: {
    // getTreeData() {
    //   return this.$store.state.get_login.grant_data.data.value
    //   // console.log(this.dataset)
    // },
    //得到每次检查地理位置的所有信息
    //将各个点找到并显示
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },//对于总部
    getTreeData(tree_data) {
      let arr = []//树形控件
      let p_arr = []//包含每个检查经纬度坐标的一个数组
      let count = 1;
      let obj = {
        lat: 0,
        lng: 0
      }
      for (let i in tree_data['headquarter_tag']) {
        // let parent1 = [];
        let parent1 = {
          id: 0,
          label: '',
          children: []
        };
        parent1['id'] = count++
        parent1['label'] = i
        arr.push(parent1)
        for (let j in tree_data['headquarter_tag'][i]['region_tag']) {
          let parent2 = {
            id: 0,
            label: '',
            children: []
          };
          parent2['id'] = count++
          parent2['label'] = j
          parent1['children'].push(parent2)
          for (let k in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag']) {
            let child1 = {
              id: 0,
              label: '',
              children: []
            };
            child1['id'] = count++
            child1['label'] = k
            parent2['children'].push(child1)
            for (let l in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k]) {
              for (let m in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l]) {
                let child2 = {
                  id: 0,
                  label: ''
                };
                child2['id'] = count++
                child2['label'] = m
                child1['children'].push(child2)
                obj['lat'] = tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l][m].lat
                obj['lng'] = tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l][m].lng
                p_arr.push(obj)
              }
            }
          }
        }
      }
      console.log("arr", arr)
      this.data = arr
      this.$store.state.get_login.tree_data = arr
      this.p_data = p_arr
    },
    intoPrjDataScreen() {
      var large1 = document.getElementById('large1');
      large1.style.display = 'none'
      var large2 = document.getElementById('large2');
      large2.style.display = 'none'
      var prj_small = document.getElementById('prj_small');
      prj_small.style.display = 'block'
      prj_small.style.width = "500px"
      prj_small.style.width = "99%"
    },
    handleNodeClick(data, node) {
      // console.log(data);
      // console.log(node);
      if (node.level == 3) {
        let param = new URLSearchParams();
        param.append('project_name', data.label);
        this.$store.state.get_project.params = param

        this.$store.dispatch('get_project/getInitProjectRectification')
        this.$store.dispatch('get_project/getInitProjectRiskLevel')
        this.$store.dispatch('get_project/getInitProjectHistoryPerception')
        this.$store.dispatch('get_project/getInitProjectNumberChange')
        // // 当前未整改高风险隐患列表
        this.$store.dispatch('get_project/getInitPrjRisk')
        // // 当前未整改高风险隐患图片
        this.$store.dispatch('get_project/getInitProjectImage')
        //
        // //占比
        this.$store.dispatch('get_project/getInitProjectSystem')
        this.$store.dispatch('get_project/getInitProjectRegionDistribution')
        this.$store.dispatch('get_project/getInitProjectReason')

        //  历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
        this.$store.dispatch('get_project/getInitProjectRiskTop')
        var prj = document.getElementById('prj_part');
        prj.style.display = 'block'
        var check = document.getElementById('check_part');
        check.style.display = 'none'
        document.getElementById('map_1').style.display = 'none'
        document.getElementById('map_2').style.display = 'block'
        this.map.setZoom(4)
        setTimeout(function () {
          this.map.panTo(new L.LatLng(34, 107));
        }, 300)
      }
      if (node.level == 4) {
        let param1 = new URLSearchParams();
        param1.append('check_code', data.label);
        this.$store.state.get_check.params = param1
        this.$store.dispatch('get_check/getCheckRectification')
        this.$store.dispatch('get_check/getCheckRiskLevel')
        this.$store.dispatch('get_check/getCheckRiskRatio')
        this.$store.dispatch('get_check/getCheckHighRisk')
        this.$store.dispatch('get_check/getCheckHighImage')
        this.$store.dispatch('get_check/getCheckMajorSystem')
        this.$store.dispatch('get_check/getCheckMajorArea')
        this.$store.dispatch('get_check/getCheckMajorStage')
        this.$store.dispatch('get_check/getCheckRiskTop')
        var prj = document.getElementById('prj_part');
        prj.style.display = 'none'
        var check = document.getElementById('check_part');
        check.style.display = 'block'
        document.getElementById('map_1').style.display = 'none'
        document.getElementById('map_2').style.display = 'block'
        this.map.setZoom(12)
        setTimeout(function () {
          this.map.panTo(new L.LatLng(30, 30));
        }, 300)
      }
    },
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
      for (var i = 0; i < this.p_data.length; i++) {
        L.marker([this.p_data[i].lat, this.p_data[i].lng]).addTo(this.map);
        // var marker = L.marker([37.8542800187483, 112.534177962463]).addTo(this.map);
        // this.map.on("click", function (e) {
        //   var lat = e.latlng.lat;
        //   var lng = e.latlng.lng;
        //   marker.setLatLng([lat, lng]);
        // });
      }
      // this.map.panTo(new L.LatLng(40.737, -73.923));
      let myChart = this.$echarts.init(document.getElementById('index_chart'))
      let _this = this
      return this.map
    },
  },
  data() {
    return {
      filterText: '',
      data: [],
      p_data: [],
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
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  created() {
    console.log('grant', this.$store.state.get_login.grant_data)
    //得到树形控件的内容 还负责封装了地理位置信息
    this.getTreeData(this.$store.state.get_login.grant_data.data.value)
  }
}
</script>

<style scoped>

.filter-tree {
  max-width: 500px;
  max-height: 2000px;
  overflow: scroll;
  background-color: transparent;
}

.el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}

.span-ellipsis {
  font-size: 0.1em;
  text-align: left;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}

#map {
  width: 100%;
  height: calc(100vh);
}
</style>
