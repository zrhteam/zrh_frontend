<template>
  <!--  <div>-->
  <el-row style="height: 100%;">
    <el-row id="region" style="height: 100%;">
      <RegionDataScreen id="region_small" v-if="showDataScreen"
                        @outRegionDataScreen="outRegionDataScreen"></RegionDataScreen>
      <el-row id="region_large1" v-if="!showDataScreen" class="" style="height: 1.25rem;">
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
          <!--          <el-card class="title-box-card " shadow="never"-->
          <!--                   style="background-color: transparent; height: 99%; margin: 0px 5px 5px 5px">-->
          <!--            <h4>-->
          <!--              <span id="region_title1"-->
          <!--                    style="color: #c4bcbc; font-family:Noto Sans SC; font-size: 0.5em; vertical-align: 65%; height: 100%">{{ title1 }}</span>-->
          <!--              <span id="region_title2"-->
          <!--                    style="color: #c4bcbc; font-family:Noto Sans SC; font-size: 0.5em; vertical-align: 65%; height: 100%">{{ title2 }}</span>-->
          <!--            </h4>-->
          <!--          </el-card>-->
          <div class="title-box-card " shadow="never"
               style="background-color: transparent; height: 99%; width: 99%; margin: 0px 5px 0 5px">
            <el-col :span="4" style="height: 100%; ">
              <el-col :span="6" :offset="14" style="height: 100%;">
                <div style="font-size: 0.4rem; font-weight: bold; color: #1fedfc; top:0.36rem; position: relative">{{ getRiskSum }}</div>
              </el-col>
            </el-col>
            <el-col :span="16" style="height: 100%;">
              <h4>
                <span id="region_title1"
                      style="color: #c4bcbc; font-family:Microsoft YaHei; font-size: 0.6em; font-weight: bold;vertical-align: 45%; height: 100%; width: 100% ;text-align: center">{{
                    title1
                  }}</span>
                <span id="region_title2"
                      style="color: #c4bcbc; font-family:Microsoft YaHei; font-size: 0.6em; font-weight: bold;vertical-align: 45%; height: 100%; width: 100% ;text-align: center">{{
                    title2
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
      <el-row id="region_large2" v-if="!showDataScreen" class="" style="height:86%;">
        <el-col :span="2" class="" style="height: 100%;">
          <Tree
              :treeObj="treeObj"
              @handleNodeClick="handleTrNodeClick"
              style="height:94%; width: 120%; margin-top: 5px; margin-bottom: 0.2rem;"
          ></Tree>
          <el-button size="small" round
                     style="width: 110%; z-index: 9; left: 12%; background-color: #2070dd; color: #ffffff; font-size: 0.26rem; font-weight: bold; float: left; letter-spacing:20px; text-indent: 20px;"
                     @click="intoRegionDataScreen">展开
          </el-button>
        </el-col>

        <el-col :span="22" class="main-pane">
          <el-row class="el-row" :gutter="10" type="flex" justify="space-between"
                  style="height: 30%; margin-top: 0.6rem; padding-left: 0.3rem; padding-right: 0.3rem">
            <el-col :span="7" style="height: 100%; width: 100%;">
              <RiskLevelYear ref="riskLevelYear" :context="{title:'年度隐患数量', id:'region_level_year'}"></RiskLevelYear>
            </el-col>
            <el-col :span="7" style="height: 100%; width: 100%;">
              <!--              <BarRank :context="{title: '各项目检查次数', id: 'id_head_rank1'}"></BarRank>-->
              <BarRank
                  :context="{
              title:'各项目检查次数',
              id: 'id_region_rank2'}"
              ></BarRank>
            </el-col>
            <el-col :span="7" style="height: 100%; width: 100%;">
              <BarRank :context="{title:'累积高风险数量区域排名', id: 'id_region_rank1'}"></BarRank>
            </el-col>
          </el-row>

          <el-row class="el-row" :gutter="10" type="flex" justify="space-between"
                  style="height: 30%; margin-top: 0.2rem; padding-left: 0.3rem; padding-right: 0.3rem">
            <el-col :span="7" style="height: 100%; width: 100%;">
              <Ratio
                  :context="{
              title:'不同专业隐患数量',
              id: 'id_region_major'
          }"></Ratio>
            </el-col>
            <el-col :span="7" style="height: 100%; width: 100%;">
              <Ratio
                  :context="{
                title:'不同分布区域隐患数量'+'-'+filter_major,
                id: 'id_region_region'
            }"></Ratio>
            </el-col>
            <el-col :span="7" style="height: 100%; width: 100%;">
              <BarRank
                  :context="{
              title:'不同子系统隐患数量'+'-'+filter_major,
              id: 'id_region_system'
          }"></BarRank>
            </el-col>
          </el-row>

          <el-row class="el-row" :gutter="10" type="flex" justify="space-between"
                  style="height: 32%; margin-top: 0.2rem; padding-left: 0.3rem; padding-right: 0.3rem">
            <el-col :span="11" style="height: 100%; width: 100%;">
              <StackedHorizontalBar
                  :context="{
                title:'不同致因阶段隐患数量',
                id: 'id_region_reason'}"
              ></StackedHorizontalBar>
            </el-col>
            <el-col :span="11" style="height: 100%; width: 100%;">
              <StackedHorizontalBar
              :context="{
              title:'不同风险等级隐患数量',
              id: 'id_region_risk'
          }"></StackedHorizontalBar>
            </el-col>
          </el-row>
        </el-col>

<!--        <PrjOverviewPart id="prj_part" style="display: none"></PrjOverviewPart>-->
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
import Tree from "@/components/views/functions/Tree.vue"
import TopRisk from "@/components/views/functions/TopRisk.vue";
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
import BarRank from "@/components/views/functions/BarRank.vue";
import Ratio from "@/components/views/functions/Ratio.vue";
import StackedHorizontalBar from "@/components/views/functions/StackedHorizontalBar.vue";

export default {
  name: "RegionOverview",
  components: {
    StackedHorizontalBar,
    Ratio,
    TopRisk,
    // HeadquarterOverview,
    PrjOverview,
    PrjOverviewPart,
    Region1_4,
    Region2_1,
    Region2_3,
    Region3_3,
    RegionDataScreen,
    Tree,
    RiskLevelYear,
    BarRank,
  },
  computed: {
    getRiskSum() {
      let data = this.$store.state.get_region.risk_level_year
      let risk_num = 0;
      for (let i in data) {
        for (let j in data[i]) {
          risk_num += data[i][j]
        }
      }
      return risk_num
    }
  },
  methods: {
    intoRegionDataScreen() {
      // let region_large1 = document.getElementById('region_large1');
      // region_large1.style.display = 'none'
      // let region_large2 = document.getElementById('region_large2');
      // region_large2.style.display = 'none'
      // let region_small = document.getElementById('region_small');
      // region_small.style.display = 'block'
      // region_small.style.width = "500px"
      // region_small.style.width = "99%"

      // this.showDataScreen = true
      this.$router.push({path: '/new_region_screen'});
    },
    outRegionDataScreen() {
      this.showDataScreen = false
    },
    handleTrNodeClick(data, node) {
      this.handleTreeNodeClick(data, node)
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
  },
  updated() {
    this.filter_major = this.$store.state.get_region.filter_major
  },
  data() {
    return {
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      showDataScreen: false,
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
      timer: null,
      nowWeek: "",
      nowDate: "",
      nowTime: "",
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
      filter_major: this.$store.state.get_region.filter_major
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

.el-button {
  border: none !important;
}

#region_title1, #region_title2 {
  background-image: -webkit-linear-gradient(bottom, #04aaff, #45c3ff, #87dcfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 8px;
}

.main-pane {
  height: 100%;
}
</style>
