<template>
  <el-row style="height: 100%;">
    <PrjDataScreen id="prj_small" style="display: none"></PrjDataScreen>
    <el-row id="large1" class="" style="height: 10%;">
      <el-col :span="24" style="height: 100%">
        <el-card class="title-box-card " shadow="never"
                 style="background-color: transparent; height: 99%; margin: 0px 5px 5px 5px">
          <h4>
            <span id="prj_title1"
                  style="color: #c4bcbc; font-family:'Microsoft YaHei'; font-size: 0.4em; vertical-align: 85%; height: 100%">{{
                title1
              }}</span>
            <span id="prj_title2"
                  style="color: #c4bcbc; font-family:'Microsoft YaHei'; font-size: 0.4em; vertical-align: 85%; height: 100%">{{
                title2
              }}</span>
            <span id="prj_title3"
                  style="color: #c4bcbc; font-family:'Microsoft YaHei'; font-size: 0.4em; vertical-align: 85%; height: 100%">{{
                title3
              }}</span>
          </h4>
        </el-card>
      </el-col>
    </el-row>
    <el-row id="large2" class="" style="height: 90%;">
      <el-col :span="5" class="" style="height: 100%; padding-left: 2%; padding-top: 1.5%">
        <Tree
            :treeObj="treeObj"
            @handleNodeClick="handleTrNodeClick"
        ></Tree>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 10%; margin: 0px 5px 5px 5px">
          <el-button size="mini" round
                     style="z-index: 9; left: 12%; background-color: transparent; color: #ffffff; float: left"
                     @click="intoPrjDataScreen">展开
          </el-button>
          <!--            <RegionDataScreen id="region_small1"></RegionDataScreen>-->

          <!--          <label>数据大屏缩略图</label>-->
        </el-card>
      </el-col>
      <el-col :span="19" id="prj_subpart" style="height: 100%; padding-right: 2.5%">
        <!--地图+项目年隐患数量-->
        <PrjIndex></PrjIndex>
        <el-col :span="10" style="height: 100%;">
          <el-row style="height: 100%">
            <el-col :span="24" style="height: 29%; margin: 2% 0 2% 2%">
              <TopName
                  :context="{title:'最容易出现隐患的系统',
                  top_data:this.prj_sys_name,
                  label1:'系统名称',
                  label2:'出现频率',
                }"></TopName>
            </el-col>
            <el-col :span="24" style="height: 29%;margin: 2%">
              <TopRisk
                  :context="{
                    title:'隐患次数累计排名',
                    label1:'隐患描述',
                    label2:'出现频率',
                    sign:'prj_other',
                    option:this.other_option}"
                  :top_data="this.$store.state.get_project.prj_other_top"
              ></TopRisk>
            </el-col>
            <el-col :span="24" style="height: 29%; margin: 2%">
              <CheckRiskLevel :context="{title:'隐患总量', id:'prj_risk_level'}"></CheckRiskLevel>
              <!--各等级隐患数量变化-->
            </el-col>
          </el-row>
        </el-col>
      </el-col>
      <CheckOverview id="check_part"></CheckOverview>
    </el-row>
  </el-row>


  <!--  第一行放标题-->
  <!--  <el-row style="height: 100%;">-->
  <!--    <PrjDataScreen id="prj_small" style="display: none"></PrjDataScreen>-->
  <!--    <el-row id="large1" class="" style="height: 10%;">-->
  <!--      <el-col :span="24" style="height: 100%">-->
  <!--        <el-card class="title-box-card " shadow="never"-->
  <!--                 style="background-color: transparent; height: 99%; margin: 0px 5px 5px 5px">-->
  <!--          <h4>-->
  <!--            <span id="prj_title1"-->
  <!--                  style="color: #c4bcbc; font-family:'Microsoft YaHei'; font-size: 0.4em; vertical-align: 85%; height: 100%">{{-->
  <!--                title1-->
  <!--              }}</span>-->
  <!--            <span id="prj_title2"-->
  <!--                  style="color: #c4bcbc; font-family:'Microsoft YaHei'; font-size: 0.4em; vertical-align: 85%; height: 100%">{{-->
  <!--                title2-->
  <!--              }}</span>-->
  <!--            <span id="prj_title3"-->
  <!--                  style="color: #c4bcbc; font-family:'Microsoft YaHei'; font-size: 0.4em; vertical-align: 85%; height: 100%">{{-->
  <!--                title3-->
  <!--              }}</span>-->
  <!--          </h4>-->
  <!--        </el-card>-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--    第二行放图片-->
  <!--    <el-row id="large2" class="" style="height: 90%;">-->
  <!--      &lt;!&ndash;      第一列放树状图和缩略图&ndash;&gt;-->
  <!--      <el-col :span="4" class="" style="height: 100%">-->
  <!--        <Tree-->
  <!--            :treeObj="treeObj"-->
  <!--            @handleNodeClick="handleTrNodeClick"-->
  <!--        ></Tree>-->
  <!--        <el-card class="box-card " shadow="never"-->
  <!--                 style="background-color: transparent; height: 10%; margin: 0px 5px 5px 5px">-->
  <!--          <el-button size="mini" round-->
  <!--                     style="z-index: 9; left: 12%; background-color: transparent; color: #ffffff; position: absolute"-->
  <!--                     @click="intoPrjDataScreen">展开-->
  <!--          </el-button>-->
  <!--          &lt;!&ndash;          <PrjDataScreen id="small1"></PrjDataScreen>&ndash;&gt;-->

  <!--          &lt;!&ndash;          <label>数据大屏缩略图</label>&ndash;&gt;-->
  <!--        </el-card>-->
  <!--      </el-col>-->
  <!--      第二列放pie、bar、table-->
  <!--      <el-col id="prj_subpart" :span="20" style="height: 100%">-->
  <!--        <el-card class="margin-box-card " shadow="never"-->
  <!--                 style="background-color: transparent; height: 98%; margin: 0px 2px 2px 2px">-->
  <!--          <el-col :span="12" style="height: 100%">-->
  <!--            <el-row style="height: 30%">-->
  <!--              &lt;!&ndash;            第一列&ndash;&gt;-->
  <!--              <el-col :span="11" style="height: 100%; margin-left: 4.5%">-->
  <!--                <CheckHistoryPerc></CheckHistoryPerc>-->
  <!--              </el-col>-->
  <!--              &lt;!&ndash;            第2列&ndash;&gt;-->
  <!--              <el-col :span="11" style="height: 100%;width:46%">-->
  <!--                <PerctangePerc-->
  <!--                    :context="{-->
  <!--                  title:'不同致因阶段隐患数量',-->
  <!--                  type:'reason',-->
  <!--                  id:'id_reason',-->
  <!--                }"></PerctangePerc>-->
  <!--              </el-col>-->

  <!--            </el-row>-->
  <!--            <el-row style="height: 30%">-->
  <!--              <el-col :span="22" style="height: 100%; margin-left: 2%; margin-bottom: 2%; width: 100%">-->
  <!--                <RiskLevelYear :context="{title:'项目年隐患数量', id:'prj_level_year'}"></RiskLevelYear>-->
  <!--              </el-col>-->
  <!--            </el-row>-->
  <!--            <el-row style="height: 30%">-->
  <!--              <el-col :span="22" style="height: 100%; margin-left: 4%; width: 100%">-->
  <!--                <div style="display: none">-->
  <!--                  {{ getName }}-->
  <!--                </div>-->
  <!--                <TopName-->
  <!--                    :context="{title:'最容易出现隐患的系统',-->
  <!--                  top_data:this.prj_sys_name,-->
  <!--                  label1:'系统名称',-->
  <!--                  label2:'出现频率',-->
  <!--                }"></TopName>-->
  <!--              </el-col>-->
  <!--            </el-row>-->
  <!--          </el-col>-->
  <!--          <el-col :span="12" style="height: 100%">-->
  <!--            <el-row style="height: 30%">-->
  <!--              &lt;!&ndash;            第3列&ndash;&gt;-->
  <!--              <el-col :span="11" style="height: 100%; width:46%">-->
  <!--                <PerctangePerc-->
  <!--                    :context="{-->
  <!--                  title:'不同分布区域隐患数量',-->
  <!--                  type:'region',-->
  <!--                  id:'id_region',-->
  <!--                 }"></PerctangePerc>-->
  <!--              </el-col>-->

  <!--              &lt;!&ndash;            第4列&ndash;&gt;-->
  <!--              <el-col :span="11" style="height: 100%;width:46.5%">-->
  <!--                <PerctangePerc-->
  <!--                    :context="{-->
  <!--                  title:'不同子系统隐患数量',-->
  <!--                  type:'system',-->
  <!--                  id:'id_system',-->
  <!--                }"></PerctangePerc>-->
  <!--              </el-col>-->
  <!--            </el-row>-->
  <!--            <el-row style="height: 30%; margin-bottom: 2%">-->
  <!--              <el-col style="height: 100%">-->
  <!--                &lt;!&ndash;                <RiskLevelYear :context="{title:'项目风险等级隐患数量', id:'check_level_year'}"></RiskLevelYear>&ndash;&gt;-->
  <!--                <CheckRiskLevel :context="{title:'隐患总量', id:'prj_risk_level'}"></CheckRiskLevel>-->
  <!--              </el-col>-->
  <!--            </el-row>-->
  <!--            <el-row style="height: 30%">-->
  <!--              <el-col style="height: 100%">-->
  <!--                <TopRisk-->
  <!--                    :context="{-->
  <!--                    title:'隐患次数累计排名（prj10）',-->
  <!--                    label1:'隐患描述',-->
  <!--                    label2:'出现频率',-->
  <!--                    sign:'prj_other',-->
  <!--                    option:this.other_option}"-->
  <!--                    :top_data="this.$store.state.get_project.prj_other_top"-->
  <!--                ></TopRisk>-->
  <!--              </el-col>-->
  <!--            </el-row>-->
  <!--          </el-col>-->

  <!--        </el-card>-->
  <!--      </el-col>-->
  <!--      <CheckOverview id="check_part"></CheckOverview>-->
  <!--    </el-row>-->
  <!--  </el-row>-->
</template>

<script>
import CheckedHistory from "@/components/views/Project/CheckedHistory.vue";
import Granularity from "@/components/views/Project/Granularity.vue";
import PerctangePerc from "@/components/views/Project/PerctangePerc.vue";
import CheckHistoryPerc from "@/components/views/Project/CheckHistoryPerc.vue";
import UnsolvedList from "@/components/views/Project/UnsolvedList.vue";
import UnsolvedImageList from "@/components/views/Project/UnsolvedImageList.vue";
import CheckedProject from "@/components/views/Project/CheckedProject.vue";
import PrjIndex from "@/components/views/Project/PrjIndex.vue";
import PrjDataScreen from '@/components/views/Project/PrjDataScreen.vue'
import * as d3 from "d3/dist/d3";
import CheckOverview from "@/components/views/Check/CheckOverview.vue";
import PrjOverviewPart from "@/components/views/Project/PrjOverviewPart.vue";
import RegionOverview from "@/components/views/Region/RegionDataScreen.vue";
import Tree from "@/components/views/functions/Tree.vue";
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
import TopRisk from "@/components/views/functions/TopRisk.vue";
import TopName from "@/components/views/functions/TopName.vue";
import CheckRiskLevel from "@/components/views/Check/CheckRiskLevel.vue";

export default {
  name: "PrjOverview",
  components: {
    CheckRiskLevel,
    RiskLevelYear,
    TopRisk,
    TopName,
    RegionOverview,
    PrjOverviewPart,
    CheckOverview,
    Granularity,
    PerctangePerc,
    CheckHistoryPerc,
    UnsolvedList,
    UnsolvedImageList,
    CheckedHistory,
    CheckedProject,
    // PrjEHSDataAnalysis3,
    PrjIndex,
    PrjDataScreen,
    Tree
  },

  methods: {
    intoPrjDataScreen() {
      var large1 = document.getElementById('large1');
      large1.style.display = 'none'
      var large2 = document.getElementById('large2');
      large2.style.display = 'none'
      var prj_small = document.getElementById('prj_small');
      prj_small.style.display = 'block'
      prj_small.style.width = "100%"
      document.getElementById('prj_charts').style.height = "500px"
      document.getElementById('check_charts').style.height = "500px"
      setTimeout(function () {
        prj_small.style.width = "99%"
        document.getElementById('prj_charts').style.height = "99%"
        document.getElementById('check_charts').style.height = "99%"
      }, 100)
      prj_small.style.width = "99%"
      if (document.getElementById('prj_charts').style.display === 'none') {
        document.getElementById('check_charts').style.display = 'block'
      }
      if (document.getElementById('prj_subpart').style.display === 'block') {
        document.getElementById('check_charts').style.display = 'none'
        document.getElementById('prj_charts').style.display = 'block'
      }
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
      this.$nextTick(() => {
        // if ((document.getElementById("large2").style.display === 'block') && (document.getElementById("prj_subpart").style.display === 'none')) {
        document.getElementById("check_part").style.display = 'block'
        // }
      })
    }
  },
  computed: {
    getName() {
      let data = this.$store.state.get_project.prj_sys_name
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.prj_sys_name.push(obj)
      }
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
      title3: this.$store.state.get_login.grant_data.data.project_tag,
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
      prj_sys_name: [],
    };
  },
  created() {
    // console.log('grant', this.$store.state.get_login.grant_data)
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
