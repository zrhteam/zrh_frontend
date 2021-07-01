<template>
  <el-row style="height: 100%;">
    <PrjDataScreen id="prj_small" style="display: none"></PrjDataScreen>
    <el-row id="large1" class="" style="height: 1.25rem;">
      <el-col :span="24" style="height: 100%">
        <div class="title-box-card " shadow="never"
             style="background-color: transparent; height: 99%; width: 99%; margin: 0px 5px 0 5px">
          <el-col :span="4" style="height: 100%; ">
            <el-col :span="6" :offset="14" style="height: 100%;">
              <div style="font-size: 0.4rem; font-weight: bold; color: #1fedfc; top:0.36rem; position: relative">
                {{ getRiskSum }}
              </div>
            </el-col>
          </el-col>
          <el-col :span="16" style="height: 100%;">
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
          </el-col>
          <el-col :span="4" style="height: 1.25rem; position: relative; float:right">
            <el-col :span="12" :offset="3" style="height: 100%; ">
              <div style="height: 100%;">
                  <span style="font-size: 0.4rem; color: #18bff0; bottom:0.35rem; position: relative;">
                    {{ nowTime }}
                  </span>
              </div>
            </el-col>
            <el-col :span="9" style="height: 100%; color: #1072b5; font-size: 0.12rem;">
              <el-row style="top: 35%; position: relative;">
                <span>{{ nowWeek }}</span>
              </el-row>
              <el-row style="top: 35%; position: relative;">
                <span>{{ nowDate }}</span>
              </el-row>
            </el-col>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row id="large2" class="" style="height: 86%;">
      <el-col :span="2" class="" style="height: 100%;">
        <Tree
            :treeObj="treeObj"
            :highlightCurrent="highlightCurrent"
            :expandOnClickNode="expandOnClickNode"
            :currentNodeKey="currentNodeKey"
            @handleNodeClick="handleTrNodeClick"
            style="height:94%; width: 120%; margin-top: 5px; margin-bottom: 0.2rem;"
        ></Tree>
        <el-button size="small" round
                   style="width: 110%; z-index: 9; left: 12%; background-color: #2070dd; color: #ffffff; font-size: 0.26rem; font-weight: bold; float: left; letter-spacing:20px; text-indent: 20px;"
                   @click="intoPrjDataScreen">展开
        </el-button>
      </el-col>
      <el-col :span="22" id="prj_subpart" style="height: 100%;">
        <el-row class="el-row" :gutter="10" type="flex" style="height: 60%; margin-top: 0.6rem; padding-left: 0.3rem">
          <el-col :span="12" class="">
            <PrjIndex></PrjIndex>
          </el-col>
          <el-col :span="12" class="">
            <el-col :span="12" class="" style="height: 50%; padding-bottom: 0.05rem">
              <RiskLevelYear :context="{title:'年度隐患数量', id:'prj_level_year'}"></RiskLevelYear>
            </el-col>
            <el-col :span="12" class="" style="height: 50%; padding-bottom: 0.05rem">
              <!--              <HighProjectRisk></HighProjectRisk>-->
              <CheckHistoryPerc></CheckHistoryPerc>
            </el-col>
            <el-col :span="12" class="" style="height: 50%; padding-top: 0.05rem">
              <!--              <BarRank-->
              <!--                  :context="{-->
              <!--          title:'各区域检查次数',-->
              <!--          id: 'id_head_rank1'}"-->
              <!--              ></BarRank>-->
              <PerctangePerc
                  :context="{
                    title:'不同分布区域隐患数量'+'-'+filter_major,
                    id:'id_region',
                   }"></PerctangePerc>
            </el-col>
            <el-col :span="12" class="" style="height: 50%; padding-top: 0.05rem">
              <!--              <BarRank-->
              <!--                  :context="{-->
              <!--          title:'各区域在管项目数量',-->
              <!--          id: 'id_head_rank2'}"-->
              <!--              ></BarRank>-->
              <BarRank
                  :context="{
              title:'不同子系统隐患数量'+'-'+filter_major,
              id: 'id_project_system'
          }"></BarRank>
            </el-col>
          </el-col>
          <!--          <HighProjectRisk></HighProjectRisk>-->
        </el-row>
        <el-row class="el-row" :gutter="10" type="flex" style="height: 35%; margin-top: 0.2rem; padding-left: 0.3rem">
          <el-col :span="12" style="height: 100%;">
            <!--            <Ratio-->
            <!--                :context="{-->
            <!--          title:'不同专业隐患数量',-->
            <!--          id: 'id_head_major',-->
            <!--        }"></Ratio>-->
            <StackedHorizontalBar
                :context="{
              title:'不同致因阶段隐患数量',
              type:'reason',
              id:'id_project_reason',
            }"></StackedHorizontalBar>
          </el-col>
          <el-col :span="12" style="height: 100%;">
            <!--            <StackedHorizontalBar-->
            <!--                :context="{-->
            <!--          title:'不同致因阶段隐患数量',-->
            <!--          id: 'id_head_reason'-->
            <!--        }"></StackedHorizontalBar>-->
            <StackedHorizontalBar
                :context="{
                    title:'不同风险等级隐患数量',
                    id: 'id_project_risk'
                  }"></StackedHorizontalBar>
          </el-col>
        </el-row>
      </el-col>
      <!--      <el-col :span="19" id="prj_subpart" style="height: 100%; padding-right: 2.5%">-->
      <!--        &lt;!&ndash;地图+项目年隐患数量&ndash;&gt;-->
      <!--        <PrjIndex></PrjIndex>-->
      <!--        <el-col :span="10" style="height: 100%;">-->
      <!--          <el-row style="height: 100%">-->
      <!--            <el-col :span="24" style="height: 29%; margin: 2% 0 2% 2%">-->
      <!--              <TopName-->
      <!--                  :context="{title:'最容易出现隐患的系统',-->
      <!--                  top_data:this.prj_sys_name,-->
      <!--                  label1:'系统名称',-->
      <!--                  label2:'出现频率',-->
      <!--                }"></TopName>-->
      <!--            </el-col>-->
      <!--            <el-col :span="24" style="height: 29%;margin: 2%">-->
      <!--              <TopRisk-->
      <!--                  :context="{-->
      <!--                    title:'隐患次数累计排名',-->
      <!--                    label1:'隐患描述',-->
      <!--                    label2:'出现频率',-->
      <!--                    sign:'prj_other',-->
      <!--                    option:this.other_option}"-->
      <!--                  :top_data="this.$store.state.get_project.prj_other_top"-->
      <!--              ></TopRisk>-->
      <!--            </el-col>-->
      <!--            <el-col :span="24" style="height: 29%; margin: 2%">-->
      <!--              <CheckRiskLevel :context="{title:'隐患总量', id:'prj_risk_level'}"></CheckRiskLevel>-->
      <!--              &lt;!&ndash;各等级隐患数量变化&ndash;&gt;-->
      <!--            </el-col>-->
      <!--          </el-row>-->
      <!--        </el-col>-->
      <!--      </el-col>-->
      <el-col :span="22" id="check_part" style="height: 100%;">
        <CheckOverview></CheckOverview>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import Granularity from "@/components/views/Project/Granularity.vue";
import PerctangePerc from "@/components/views/Project/PerctangePerc.vue";
import CheckHistoryPerc from "@/components/views/Project/CheckHistoryPerc.vue";
import UnsolvedList from "@/components/views/Project/UnsolvedList.vue";
import UnsolvedImageList from "@/components/views/Project/UnsolvedImageList.vue";
import CheckedProject from "@/components/views/Project/CheckedProject.vue";
import PrjIndex from "@/components/views/Project/PrjIndex.vue";
import PrjDataScreen from '@/components/views/Project/PrjDataScreen.vue'
import CheckOverview from "@/components/views/Check/CheckOverview.vue";
import RegionOverview from "@/components/views/Region/RegionDataScreen.vue";
import Tree from "@/components/views/functions/Tree.vue";
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
import TopRisk from "@/components/views/functions/TopRisk.vue";
import TopName from "@/components/views/functions/TopName.vue";
import CheckRiskLevel from "@/components/views/Check/CheckRiskLevel.vue";
import BarRank from "@/components/views/functions/BarRank.vue";
import StackedHorizontalBar from "@/components/views/functions/StackedHorizontalBar.vue";

export default {
  name: "PrjOverview",
  components: {
    CheckRiskLevel,
    RiskLevelYear,
    TopRisk,
    TopName,
    RegionOverview,
    CheckOverview,
    Granularity,
    PerctangePerc,
    CheckHistoryPerc,
    UnsolvedList,
    UnsolvedImageList,
    CheckedProject,
    // PrjEHSDataAnalysis3,
    PrjIndex,
    PrjDataScreen,
    Tree,
    BarRank,
    StackedHorizontalBar,
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
        this.$router.push({path: `/new_check_screen/${this.$store.state.get_check.check_code}`});
      }
      if (document.getElementById('prj_subpart').style.display === 'block') {
        document.getElementById('check_charts').style.display = 'none'
        document.getElementById('prj_charts').style.display = 'block'
        this.$router.push({path: `/new_project_screen/${this.$store.state.get_project.prj_name}`});
      } else if (document.getElementById('check_part').style.display === 'block') {
        document.getElementById('check_charts').style.display = 'block'
        document.getElementById('prj_charts').style.display = 'none'
        this.$router.push({path: `/new_check_screen/${this.$store.state.get_check.check_code}`});
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
      // console.log(data)
      // console.log(node)
      this.handleTreeNodeClick(data, node)
      // this.$nextTick(() => {
      //   // if ((document.getElementById("large2").style.display === 'block') && (document.getElementById("prj_subpart").style.display === 'none')) {
      //   document.getElementById("check_part").style.display = 'block'
      //   // }
      // })
    },
    setNowTimes() {
      let myDate = new Date();
      // console.log(myDate)
      let wk = myDate.getDay();
      let yy = String(myDate.getFullYear());
      let mm = myDate.getMonth() + 1;
      let dd = String(
          myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate()
      );
      let hou = String(
          myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours()
      );
      let min = String(
          myDate.getMinutes() < 10
              ? "0" + myDate.getMinutes()
              : myDate.getMinutes()
      );
      let sec = String(
          myDate.getSeconds() < 10
              ? "0" + myDate.getSeconds()
              : myDate.getSeconds()
      );
      let weeks = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let week = weeks[wk];
      this.nowDate = yy + "." + mm + "." + dd
      this.nowTime = hou + ":" + min + ":" + sec;
      this.nowWeek = week;
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.setNowTimes();
    }, 1000);

    setTimeout(() => {
      document.getElementById('prj_subpart').style.display = 'block'
      document.getElementById('check_part').style.display = 'none'
      document.getElementById('prj_charts').style.display = 'block'
      document.getElementById('check_charts').style.display = 'none'
    }, 200);

    //得到树形控件的内容 还负责封装了地理位置信息
    this.treeObj = this.$store.state.get_login.grant_data.data.value
  },
  updated() {
    this.filter_major = this.$store.state.get_project.filter_major
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
    },
    getRiskSum() {
      let data = this.$store.state.get_project.prj_level_year
      let risk_num = 0;
      for (let i in data) {
        for (let j in data[i]) {
          risk_num += data[i][j]
        }
      }
      return risk_num
    }
  },
  data() {
    return {
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      fit: 'fill',
      url: 'http://www.zhongrh.com/Upfiles/Base/2020111937459.png',
      filterText: '',
      treeObj: this.$store.state.get_login.grant_data.data.value,
      highlightCurrent: true,
      expandOnClickNode: false,
      currentNodeKey: 0,
      map: "",
      mapInfo: {},
      dataset: {},
      form: {
        name: '',
      },
      map_width: 0,
      map_height: 0,
      timer: null,
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
      nowWeek: "",
      nowDate: "",
      nowTime: "",
      filter_major: ''
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

.el-button {
  border: none !important;
}

#prj_title1, #prj_title2, #prj_title3 {
  background-image: -webkit-linear-gradient(bottom, #04aaff, #45c3ff, #87dcfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 8px;
}
</style>
