<template>
  <!--  <div>-->
  <el-row style="height: 100%;">
  <el-row id="region" style="height: 100%;">
    <RegionDataScreen id="region_small" style="display: none"></RegionDataScreen>
    <el-row id="region_large1" class="" style="height: 10%;">
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
          <label style="color: #c4bcbc; font-family:宋体; height: 95%; ">中瑞恒可视化系统</label>
        </el-card>
      </el-col>
    </el-row>
    <el-row id="region_large2" class="" style="height: 90%;">
      <el-col :span="4" class="" style="height: 100%">
        <Tree
          :treeObj="treeObj"
          @handleNodeClick="handleTrNodeClick"
        ></Tree>
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
            <!--            <label>chart</label>-->
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
          <el-col :span="24" style="height: 5%">
            <el-col :span='12' style="height: 5%">
              <el-button size="mini" round
                         style="z-index: 9; right: 12%; background-color: transparent; color: #fff; position: absolute">
                more
              </el-button>
            </el-col>


          </el-col>
        </el-row>
        <!--      </el-card>-->
      </el-col>
      <!--      <PrjOverviewPart id="prj_part" style="display: none"></PrjOverviewPart>-->
    </el-row>

<!--    <HeadquarterOverview id="head_up" style="display: none"></HeadquarterOverview>-->
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
// import HeadquarterOverview from "@/components/views/HeadQuarters/HeadquarterOverview.vue";
import Tree from "@/components/views/functions/Tree.vue"

export default {
  name: "RegionOverview",
  components: {
    // HeadquarterOverview,
    PrjOverview,
    PrjOverviewPart,
    Region1_3,
    Region1_4,
    Region2_1,
    Region2_3,
    Region3_3,
    RegionDataScreen,
    Tree
  },
  computed: {},
  methods: {
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
      treeObj: {},
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