<template>
  <el-row style="height: 100%;">
    <el-row style="height: 100%;" id="head_quarter">
      <headquarterDataScreen id="head_small" style="display: none"></headquarterDataScreen>
      <el-row id="head_large1" class="" style="height: 1.25rem;">
        <!--        <el-col :span="4" style="height: 100%">-->
        <!--          <el-card class="title-box-card" shadow="never"-->
        <!--                   style="background-color: transparent; height: 99%; margin: 0px 5px 5px 5px">-->
        <!--            <el-image-->
        <!--                style="width: 90%; height: 90%"-->
        <!--                :src="url"-->
        <!--                :fit="fit"></el-image>-->
        <!--          </el-card>-->
        <!--        </el-col>-->
        <el-col :span="24" style="height: 100%">
          <div class="title-box-card " shadow="never"
               style="background-color: transparent; height: 99%; width: 99%; margin: 0px 5px 0 5px">
            <el-col :span="4" style="height: 100%; ">
              <div style="height: 100%; display: none">
              </div>
            </el-col>
            <el-col :span="16" style="height: 100%;">
              <h4>
              <span id="head_title1"
                    style="color: #c4bcbc; font-family:Microsoft YaHei; font-size: 0.6em; font-weight: bold;vertical-align: 45%; height: 100%; width: 100% ;text-align: center">{{
                  title1
                }}</span>
              </h4>
            </el-col>
            <el-col :span="4" style="height: 1.25rem; position: relative; float:right">
              <el-col :span="14" style="height: 100%; ">
                <div style="height: 100%;">
                  <span style="font-size: 0.4rem; color: #18bff0; bottom:0.35rem; position: relative;">
                    {{ nowTime }}
                  </span>
                </div>
              </el-col>
              <el-col :span="10" style="height: 100%; color: #1072b5; font-size: 0.12rem;">
                <el-row style="top: 35%; right: 0.6rem">
                  <span>{{ nowWeek }}</span>
                </el-row>
                <el-row style="top: 35%; right: 0.6rem">
                  <span>{{ nowDate }}</span>
                </el-row>
              </el-col>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row id="head_large2" class="" style="height: 90%;">
        <el-col :span="2" class="" style="height: 100%;">
          <Tree
              :treeObj="treeObj"
              @handleNodeClick="handleTrNodeClick"
              style="height:94%; width: 120%; margin-top: 5px; margin-bottom: 5px;"
          ></Tree>
          <!--          <el-card class="box-card " shadow="never"-->
          <!--                   style="background-color: transparent; height: 10%; margin: 0px 5px 5px 5px">-->
          <el-button size="small" round
                     style="width: 110%; z-index: 9; left: 12%; background-color: #2070dd; color: #ffffff; font-size: 0.26rem; font-weight: bold; float: left; letter-spacing:20px; text-indent: 20px;"
                     @click="intoHeadDataScreen">展开
          </el-button>
          <!--            <headquarterDataScreen id="head_small1"></headquarterDataScreen>-->

          <!--          <label>数据大屏缩略图</label>-->
          <!--          </el-card>-->
        </el-col>
        <el-row class="el-row" :gutter="10" type="flex" style="height: 60%; margin-top: 0.6rem; padding-left: 0.3rem">
          <el-col :span="12" class="">
            <HeadquarterMap></HeadquarterMap>
          </el-col>
          <el-col :span="12" class="">
            <el-col :span="12" class="" style="height: 50%; padding-bottom: 0.1rem">
              <RiskLevelYear :context="{title:'年度隐患数量', id:'head_level_year'}"></RiskLevelYear>
            </el-col>
            <el-col :span="12" class="" style="height: 50%; padding-bottom: 0.1rem">
              <HighProjectRisk></HighProjectRisk>
            </el-col>
            <el-col :span="12" class="" style="height: 50%;">
              <BarRank
                  :context="{
          title:'各区域检查次数',
          id: 'id_head_rank1'}"
              ></BarRank>
            </el-col>
            <el-col :span="12" class="" style="height: 50%">
              <BarRank
                  :context="{
          title:'各区域在管项目数量',
          id: 'id_head_rank2'}"
              ></BarRank>
            </el-col>
          </el-col>
          <!--          <HighProjectRisk></HighProjectRisk>-->
        </el-row>
        <el-row class="el-row" :gutter="10" type="flex" style="height: 30%; margin-top: 0.2rem; padding-left: 0.3rem">
          <el-col :span="6" style="height: 100%;">
            <Ratio
                :context="{
          title:'不同专业隐患数量',
          id: 'id_head_major',
        }"></Ratio>
          </el-col>
          <el-col :span="12" style="height: 100%;">
            <StackedHorizontalBar
                :context="{
          title:'不同致因阶段隐患数量',
          id: 'id_head_reason'
        }"></StackedHorizontalBar>
          </el-col>
          <el-col :span="6" style="height: 100%;">
            <Ratio
                :context="{
          title:'不同分布区域隐患数量',
          id: 'id_head_region'
        }"></Ratio>
          </el-col>
        </el-row>
        <!--地图+高风险隐患数量排名-->
        <!--        <HighProjectRisk></HighProjectRisk>-->
        <!--      </el-col>-->
        <!--        <el-col :span="10" id="head_part" style="height: 100%">-->
        <el-col :span="10" style="height: 100%; padding-right: 2.5%">
          <el-row style="height: 100%">
            <el-col :span="24" style="height: 29%; margin: 2% 0 2% 2%">
            </el-col>
            <el-col :span="24" style="height: 29%;margin: 2%">
              <TopRisk
                  :context="{
                  title:'重复出现隐患列表',
                  label1:'隐患描述',
                  label2:'出现频率',
                  sign:'head_other',
                  option:this.other_option}"
                  :top_data="this.$store.state.get_headquarter.other_number_top"
              ></TopRisk>
              <!--各等级隐患数量变化-->
            </el-col>
            <el-col :span="24" style="height: 29%;margin: 2% 2% 2% 0%">
              <!--              <RiskLevelYear :context="{title:'年度隐患数量', id:'head_level_year'}"></RiskLevelYear>-->
              <!--各等级隐患数量变化-->
            </el-col>
            <!--                    </el-row>-->
          </el-row>
        </el-col>
      </el-row>

    </el-row>
    <RegionOverview id="region_part" style=""></RegionOverview>
  </el-row>
</template>

<script>
import HighProjectRisk from "@/components/views/HeadQuarters/HighProjectRisk.vue";
import AccumRisk from "@/components/views/HeadQuarters/AccumRisk.vue";
import headquarterDataScreen from "@/components/views/HeadQuarters/headquarterDataScreen.vue";
import CheckOverview from "@/components/views/Check/CheckOverview.vue";
import RegionOverview from "@/components/views/Region/RegionOverview.vue";
import Tree from "@/components/views/functions/Tree.vue";
import TopRisk from "@/components/views/functions/TopRisk.vue";
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
import HeadquarterMap from "@/components/views/HeadQuarters/HeadquarterMap.vue";
import BarRank from "@/components/views/functions/BarRank.vue";
import Ratio from "@/components/views/functions/Ratio.vue";
import StackedHorizontalBar from "@/components/views/functions/StackedHorizontalBar.vue";

export default {
  name: "HeadquarterOverview",
  components: {
    StackedHorizontalBar,
    Ratio,
    BarRank,
    HeadquarterMap,
    RiskLevelYear,
    TopRisk,
    RegionOverview,
    CheckOverview,
    AccumRisk,
    HighProjectRisk,
    headquarterDataScreen,
    Tree
  },
  methods: {
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
    intoDataAnalysis() {
      var href = 'http://10.20.39.102:12001/test#/'
      window.open(href, '_blank')
      // window.location.href = 'http://10.20.39.102:12001/test#/';
    },
    handleTrNodeClick(data, node) {
      this.handleTreeNodeClick(data, node)
    },
    back() {
      window.history.back()
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
      // timer: '',
      input: 'test',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      title1: this.$store.state.get_login.grant_data.data.headquarter_tag,
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
      timer: null,
      nowWeek: "",
      nowDate: "",
      nowTime: "",
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

#head_title1 {
  background-image: -webkit-linear-gradient(bottom, #04aaff, #45c3ff, #87dcfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 8px;
}
</style>