<template>
  <!--  <div>-->
  <el-row style="height: 100%;">
    <el-row id="region" style="height: 100%;">
      <RegionDataScreen id="region_small" style="display: none"></RegionDataScreen>
      <el-row id="region_large1" class="" style="height: 10%;">
        <!--      <el-col :span="4" style="height: 100%">-->
        <!--        <el-card class="title-box-card" shadow="never"-->
        <!--                 style="background-color: transparent; height: 99%; margin: 0px 5px 5px 5px">-->
        <!--          <el-image-->
        <!--              style="width: 90%; height: 90%"-->
        <!--              :src="url"-->
        <!--              :fit="fit"></el-image>-->
        <!--        </el-card>-->
        <!--      </el-col>-->
        <el-col :span="24" style="height: 100%">
          <el-card class="title-box-card " shadow="never"
                   style="background-color: transparent; height: 99%; margin: 0px 5px 5px 5px">
            <h4>
              <span id="region_title1"
                    style="color: #c4bcbc; font-family:Noto Sans SC; font-size: 0.5em; vertical-align: 65%; height: 100%">{{ title1 }}</span>
              <span id="region_title2"
                    style="color: #c4bcbc; font-family:Noto Sans SC; font-size: 0.5em; vertical-align: 65%; height: 100%">{{ title2 }}</span>
            </h4>
          </el-card>
        </el-col>
      </el-row>
      <el-row id="region_large2" class="" style="height: 90%;">
        <el-col :span="5" class="" style="height: 100%; padding-left: 2%; padding-top: 1.5%">
          <Tree
              :treeObj="treeObj"
              @handleNodeClick="handleTrNodeClick"
          ></Tree>
          <el-card class="box-card " shadow="never"
                   style="background-color: transparent; height: 10%; margin: 0px 5px 5px 5px">
            <el-button size="mini" round
                       style="z-index: 9; left: 12%; background-color: transparent; color: #ffffff; float: left"
                       @click="intoRegionDataScreen">展开
            </el-button>
<!--            <RegionDataScreen id="region_small1"></RegionDataScreen>-->

            <!--          <label>数据大屏缩略图</label>-->
          </el-card>
        </el-col>
        <!--地图+高风险隐患数量排名-->
        <Region3_3></Region3_3>
        <!--      </el-col>-->
        <el-col :span="9" id="region_part" style="height: 100%; padding-right: 2.5%">
          <!--      <el-card class="boundary-B" shadow="never" style="background-color: transparent; height: 100%">-->
          <el-row style="height: 100%">
            <!--            <label>chart</label>-->
            <!--          <el-row style="height: 42%">-->
            <!--          <el-col :span="12" style="height: 42%">-->
            <!--            &lt;!&ndash;            已整改项目数量&ndash;&gt;-->
            <!--          </el-col>-->
            <!--          <el-col :span="12" style="height: 42%">-->
            <!--            <el-card class="box-card " shadow="never"-->
            <!--                     style="background-color: transparent; height: 90%; left: 10%; top: 10%">-->
            <!--              &lt;!&ndash;          当前未整改高风险隐患列表&ndash;&gt;-->
            <!--              <Region2_1></Region2_1>-->
            <!--            </el-card>-->
            <!--          </el-col>-->
            <!--          </el-row>-->
            <!--                    <el-row style="height: 42%">-->
            <el-col :span="24" style="height: 29%; margin: 2% 0 2% 2%">
              <!--3维信息-->
              <!--            <Region2_3></Region2_3>-->
              <TopRisk
                  :context="{
          title:'重复出现隐患列表',
          label1:'隐患描述',
          label2:'出现频率',
          sign:'region_risk',
          option:this.risk_option}"
                  :top_data="this.$store.state.get_region.risk_number_top"
              ></TopRisk>
            </el-col>
            <el-col :span="24" style="height: 29%;margin: 2%">
              <TopRisk
                  :context="{
          title:'重复出现隐患列表',
          label1:'隐患描述',
          label2:'出现频率',
          sign:'region_other',
          option:this.other_option}"
                  :top_data="this.$store.state.get_region.risk_other_top"
              ></TopRisk>
              <!--各等级隐患数量变化-->
            </el-col>
            <el-col :span="24" style="height: 29%; margin: 2% 2% 2% 0">
              <Region1_4></Region1_4>
              <!--各等级隐患数量变化-->
            </el-col>
            <!--                    </el-row>-->
          </el-row>
          <!--      </el-card>-->
        </el-col>
        <!--      <PrjOverviewPart id="prj_part" style="display: none"></PrjOverviewPart>-->
      </el-row>

      <!--    <HeadquarterOverview id="head_up" style="display: none"></HeadquarterOverview>-->
    </el-row>
    <PrjOverview id="prj_part" style=""></PrjOverview>
  </el-row>
  <!--    </div>-->
</template>

<script>
import Region1_4 from "@/components/views/Region/Region1_4.vue";
import Region3_3 from "@/components/views/Region/Region3_3.vue";
import Region2_3 from "@/components/views/Region/Region2_3.vue";
import Region2_1 from "@/components/views/Region/Region2_1.vue";
import RegionDataScreen from "@/components/views/Region/RegionDataScreen.vue";
import PrjOverviewPart from "@/components/views/Project/PrjOverviewPart.vue";
import PrjOverview from "@/components/views/Project/PrjOverview.vue";
// import HeadquarterOverview from "@/components/views/HeadQuarters/HeadquarterOverview.vue";
import Tree from "@/components/views/functions/Tree.vue"
import TopRisk from "@/components/views/functions/TopRisk.vue";

export default {
  name: "RegionOverview",
  components: {
    TopRisk,
    // HeadquarterOverview,
    PrjOverview,
    PrjOverviewPart,
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
      },
      title1: this.$store.state.get_login.grant_data.data.headquarter_tag,
      title2: this.$store.state.get_login.grant_data.data.region_tag,
      risk_option: [{
        value: '专业',
        key: 'major'
      }, {
        value: '系统',
        key: 'system'
      }],
      other_option: [{
        value: '高风险',
        key: 3
      }, {
        value: '中风险',
        key: 2
      }, {
        value: '低风险',
        key: 1
      }, {
        value: '风险',
        key: 'all'
      }, {
        value: '致因阶段',
        key: 'stage'
      }, {
        value: '分布区域',
        key: 'area'
      }],
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