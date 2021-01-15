<template>
  <!--  <div>-->
  <el-row id="region1" style="height: 100%;">
    <RegionDataScreen id="region_small" style="display: none"></RegionDataScreen>
    <el-row id="region_large1" class="" style="height: 10%;">
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
    <el-row id="region_large2" class="" style="height: 90%;">
      <el-col :span="4" class="" style="height: 100%">
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height:74%; margin: 0px 5px 5px 5px">
          <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText"
              size="mini">
          </el-input>
          <div style="height: 80%">
            <el-scrollbar style="height: 99%">
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
                     @click="intoRegionDataScreen">展开
          </el-button>
          <RegionDataScreen id="region_small1"></RegionDataScreen>

          <!--          <label>数据大屏缩略图</label>-->
        </el-card>
      </el-col>
      <!--地图+高风险隐患数量排名-->
      <Region3_3></Region3_3>
      <!--      </el-col>-->
      <el-col :span="10" id="region_part" style="height: 100%">
        <!--      <el-card class="boundary-B" shadow="never" style="background-color: transparent; height: 100%">-->
        <el-row style="height: 100%">
          <el-card class="statistics-box-card " shadow="never"
                   style="background-color: transparent; height: 5%; margin: 0px 5px 5px 5px">
            <label>chart</label>
          </el-card>
          <!--          <el-row style="height: 42%">-->
          <el-col :span="12" style="height: 42%">
            <!--            已整改项目数量-->
            <Region1_3></Region1_3>
          </el-col>
          <el-col :span="12" style="height: 42%">
            <el-card class="box-card " shadow="never"
                     style="background-color: transparent; height: 90%; left: 10%; top: 10%">
              <!--          当前未整改高风险隐患列表-->
              <Region2_1></Region2_1>
            </el-card>
          </el-col>
          <!--          </el-row>-->
          <!--          <el-row style="height: 42%">-->
          <el-col :span="12" style="height: 42%">
            <!--3维信息-->
            <Region2_3></Region2_3>
          </el-col>
          <el-col :span="12" style="height: 42%">
            <Region1_4></Region1_4>
            <!--各等级隐患数量变化-->
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
      <!--      <PrjOverviewPart id="prj_part" style="display: none"></PrjOverviewPart>-->
    </el-row>
    <PrjOverview id="prj_part" style="display: none"></PrjOverview>
  </el-row>

  <!--    </div>-->
</template>

<script>
import Region1_3 from "@/components/views/Region/Region1_3.vue";
import Region1_4 from "@/components/views/Region/Region1_4.vue";
import Region3_3 from "@/components/views/Region/Region3_3.vue";
import Region2_3 from "@/components/views/Region/Region2_3.vue";
import Region2_1 from "@/components/views/Region/Region2_1.vue";
import RegionDataScreen from "@/components/views/Region/RegionDataScreen.vue";
import PrjOverviewPart from "@/components/views/Project/PrjOverviewPart.vue";
import PrjOverview from "@/components/views/Project/PrjOverview.vue";

export default {
  name: "RegionOverview",
  components: {
    PrjOverview,
    PrjOverviewPart,
    Region1_3,
    Region1_4,
    Region2_1,
    Region2_3,
    Region3_3,
    RegionDataScreen
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {},
  methods: {
    filterNode(value, data) {
      if (!value) return true;
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
                // child1['children'].push(child2)
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
    intoRegionDataScreen() {
      let region_large1 = document.getElementById('region_large1');
      region_large1.style.display = 'none'
      let region_large2 = document.getElementById('region_large2');
      region_large2.style.display = 'none'
      let region_small = document.getElementById('region_small');
      region_small.style.display = 'block'
      region_small.style.width = "500px"
      region_small.style.width = "99%"
    },
    handleNodeClick(data, node) {
      if (node.level == 3) {
        // this.$router.push({path: '/prj_data_analysis'});
        let param1 = new URLSearchParams();
        param1.append('project_name', data.label);
        this.$store.state.get_project.params = param1
        this.$store.dispatch('get_project/getInitPrjRisk')
        this.$store.dispatch('get_project/getInitProjectHistoryPerception')
        this.$store.dispatch('get_project/getInitProjectImage')
        this.$store.dispatch('get_project/getInitProjectIndex')
        this.$store.dispatch('get_project/getInitProjectPerception')
        this.$store.dispatch('get_project/getInitProjectReason')
        this.$store.dispatch('get_project/getInitProjectNumberChange')
        this.$store.dispatch('get_project/getInitProjectRiskLevel')
        this.$store.dispatch('get_project/getInitProjectSystem')
        this.$store.dispatch('get_project/getInitProjectRiskTop')
        this.$store.dispatch('get_project/getInitProjectRegionDistribution')
        let region = document.getElementById('region_part');
        let region_large1 = document.getElementById('region_large1');
        region_large1.style.display = 'none'
        let region_large2 = document.getElementById('region_large2');
        region_large2.style.display = 'none'
        let region_small = document.getElementById('region_small');
        region_small.style.display = 'none'
        document.getElementById('prj_part').style.display = 'block'

        // let check = document.getElementById('check_part');
        // check.style.display = 'none'
        // document.getElementById('map_1').style.display = 'none'
        // document.getElementById('map_2').style.display = 'block'
        // this.map.setZoom(12)
        // setTimeout(function () {
        //   this.map.panTo(new L.LatLng(30, 30));
        // }, 100)
      } else if (node.level == 2) {
        let param1 = new URLSearchParams();
        param1.append('check_code', data.label);
        this.$store.state.get_region.params = param1
        this.$store.dispatch('get_region/getInitRegionProjectNumber')
        this.$store.dispatch('get_region/getInitRegionRiskLevel')
        this.$store.dispatch('get_region/getInitRegionHighRisk')
        this.$store.dispatch('get_region/getInitRegionImage')
        this.$store.dispatch('get_region/getInitRegionMajor')
        this.$store.dispatch('get_region/getInitRegionNumberTop')
        this.$store.dispatch('get_region/getInitRegionSafetyIndex')
        this.$store.dispatch('get_region/getInitRegionRiskRank')
        let region = document.getElementById('region_part');
        region.style.display = 'block'
        let prj = document.getElementById('prj_part');
        prj.style.display = 'node'
        // let check = document.getElementById('check_part');
        // check.style.display = 'none'
        // document.getElementById('map_1').style.display = 'none'
        // document.getElementById('map_2').style.display = 'block'
        // this.map.setZoom(12)
        // setTimeout(function () {
        //   this.map.panTo(new L.LatLng(30, 30));
        // }, 300)
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

      for (var i = 0; i < this.p_data.length; i++) {
        L.marker([this.p_data[i].lat, this.p_data[i].lng]).addTo(this.map);

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