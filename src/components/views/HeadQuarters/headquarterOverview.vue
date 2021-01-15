<template>
  <el-row style="height: 100%;">
    <headquarterDataScreen id="head_small" style="display: none"></headquarterDataScreen>
    <el-row id="head_large1" class="" style="height: 10%;">
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
          <label style="color: #c4bcbc; font-family:宋体; height: 95% ">中瑞恒可视化系统</label>
        </el-card>
      </el-col>
    </el-row>
    <el-row id="head_large2" class="" style="height: 90%;">
      <el-col :span="4" class="" style="height: 100%">
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height:74%; margin: 0px 5px 5px 5px">
          <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText"
              size="mini">
          </el-input>
          <div style="height: 80%">
            <el-scrollbar style="height: 100%">
              <el-tree
                  class="filter-tree"
                  :data="data"
                  :props="defaultProps"
                  @node-click="handleNodeClick"
                  default-expand-all
                  :filter-node-method="filterNode"
                  ref="tree">
                <span class="span-ellipsis" slot-scope="{ node, data }">
                  <span :title="node.label">{{ node.label }}</span>
                </span>
              </el-tree>
            </el-scrollbar>
          </div>
        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 24%; margin: 0px 5px 5px 5px">
          <el-button size="mini" round
                     style="z-index: 9; left: 12%; background-color: transparent; color: #ffffff; position: absolute"
                     @click="intoHeadDataScreen">展开
          </el-button>
          <headquarterDataScreen id="head_small1"></headquarterDataScreen>

          <!--          <label>数据大屏缩略图</label>-->
        </el-card>
      </el-col>
      <!--地图+高风险隐患数量排名-->
      <HighProjectRisk></HighProjectRisk>
      <!--      </el-col>-->
      <el-col :span="10" id="head_part" style="height: 100%">
        <!--      <el-card class="boundary-B" shadow="never" style="background-color: transparent; height: 100%">-->
        <el-row style="height: 100%">
          <el-card class="statistics-box-card " shadow="never"
                   style="background-color: transparent; height: 5%; margin: 0px 5px 5px 5px">
<!--            <label>chart</label>-->
          </el-card>
          <!--          <el-row style="height: 42%">-->
          <el-col :span="12" style="height: 42%">
<!--            整改率-->
            <Rectification></Rectification>
          </el-col>
          <el-col :span="12" style="height: 42%">
            <el-card class="box-card " shadow="never"
                     style="background-color: transparent; height: 90%; left: 10%; top: 10%">
              <!--          当前未整改高风险隐患列表-->
              <UnsolvedList></UnsolvedList>
            </el-card>
          </el-col>
          <!--          </el-row>-->
          <!--          <el-row style="height: 42%">-->
          <el-col :span="12" style="height: 42%">
            <!--出现次数排名前10的隐患-->
            <TopAccumRisk></TopAccumRisk>
          </el-col>
          <el-col :span="12" style="height: 42%">
            <AccumRisk></AccumRisk>
            <!--各等级隐患数量变化-->
          </el-col>
          <!--          </el-row>-->
          <el-col :span="24" style="height: 9%">
            <el-col :span = '12' style="height: 5%">
              <el-button size="mini" round
                       style="z-index: 9; left: 12%; background-color: transparent; color: #fff; position: absolute">data analysis</el-button>
            </el-col>
            <el-col :span = '12' style="height: 5%">
              <el-button size="mini" round
                       style="z-index: 9; right: 12%; background-color: transparent; color: #fff; position: absolute">more</el-button>
            </el-col>
          </el-col>
        </el-row>
        <!--      </el-card>-->
      </el-col>
    </el-row>
    <RegionOverview id="region_part" style="display: none"></RegionOverview>
  </el-row>
</template>

<script>
import HighProjectRisk from "@/components/views/HeadQuarters/HighProjectRisk.vue";
import Rectification from "@/components/views/HeadQuarters/Rectification.vue";
import UnsolvedList from "@/components/views/HeadQuarters/UnsolvedList.vue";
import AccumRisk from "@/components/views/HeadQuarters/AccumRisk.vue";
import TopAccumRisk from "@/components/views/HeadQuarters/TopAccumRisk.vue";
import headquarterDataScreen from "@/components/views/HeadQuarters/headquarterDataScreen.vue";
import CheckOverview from "@/components/views/Check/CheckOverview.vue";
import RegionOverview from "@/components/views/Region/RegionOverview.vue";
export default {
  name: "headquarterOverview",
  components: {
    RegionOverview,
    CheckOverview,
    TopAccumRisk,
    AccumRisk,
    UnsolvedList,
    Rectification,
    HighProjectRisk,
    headquarterDataScreen
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {

  },
  methods: {
    filterNode(value, data){
      if(!value) return true;
      return data.label.indexOf(value) !== -1;
    },
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
    intoHeadDataScreen() {
      let head_large1 = document.getElementById('head_large1');
      head_large1.style.display = 'none'
      let head_large2 = document.getElementById('head_large2');
      head_large2.style.display = 'none'
      let head_small = document.getElementById('head_small');
      head_small.style.display = 'block'
      head_small.style.width = "500px"
      head_small.style.width = "99%"
      document.getElementById('region_part').style.display = 'none'
    },
    handleNodeClick(data, node) {
      if (node.level == 2) {
        let param1 = new URLSearchParams();
        param1.append('region_name', data.label);
        this.$store.state.get_region.params = param1
        this.$store.dispatch('get_region/getInitRegionProjectNumber')
        this.$store.dispatch('get_region/getInitRegionRiskLevel')
        this.$store.dispatch('get_region/getInitRegionHighRisk')
        this.$store.dispatch('get_region/getInitRegionImage')
        this.$store.dispatch('get_region/getInitRegionMajor')
        this.$store.dispatch('get_region/getInitRegionNumberTop')
        this.$store.dispatch('get_region/getInitRegionSafetyIndex')
        // this.$store.dispatch('get_region/getInitRegionRiskRank')
        document.getElementById('head_small').style.display = 'none'
        document.getElementById('head_large1').style.display = 'none'
        document.getElementById('head_large2').style.display = 'none'
        document.getElementById('region_part').style.display = 'block'
        // let check = document.getElementById('check_part');
        // check.style.display = 'none'
        // document.getElementById('map_1').style.display = 'none'
        // document.getElementById('map_2').style.display = 'block'
        // this.map.setZoom(12)
        // setTimeout(function () {
        //   this.map.panTo(new L.LatLng(30, 30));
        // }, 300)
      }else if (node.level == 1) {

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
      ).addTo(this.map);

      for (let i = 0; i < this.p_data.length; i++) {
        L.marker([this.p_data[i].lat, this.p_data[i].lng]).addTo(this.map);

      }
      // this.map.panTo(new L.LatLng(40.737, -73.923));
      let myChart = this.$echarts.init(document.getElementById('index_chart'))
      let _this = this
      return this.map
    },
  },
  data(){
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'http://www.zhongrh.com/Upfiles/Base/2020111937459.png',
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

    }
  },
  created() {
    console.log('grant', this.$store.state.get_login.grant_data)
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