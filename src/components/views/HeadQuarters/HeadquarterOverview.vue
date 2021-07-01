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
              <el-col :span="6" :offset="14" style="height: 100%;">
                <div style="font-size: 0.4rem; color: #1fedfc; top:0.46rem; position: relative">{{ getRiskSum }}</div>
              </el-col>
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
      <el-row id="head_large2" class="" style="height: 86%;">
        <el-col :span="2" class="" style="height: 100%;">
          <Tree
              :treeObj="treeObj"
              :highlightCurrent="highlightCurrent"
              :expandOnClickNode="expandOnClickNode"
              :currentNodeKey="currentNodeKey"
              @handleNodeClick="handleTrNodeClick"
              style="height:94%; width: 120%; margin-top: 5px; margin-bottom: 0.2rem;"
          >{{ getTreeData }}</Tree>
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
            <el-col :span="12" class="" style="height: 50%; padding-bottom: 0.05rem">
              <RiskLevelYear :context="{title:'年度隐患数量', id:'head_level_year'}"></RiskLevelYear>
            </el-col>
            <el-col :span="12" class="" style="height: 50%; padding-bottom: 0.05rem">
              <HighProjectRisk></HighProjectRisk>
            </el-col>
            <el-col :span="12" class="" style="height: 50%; padding-top: 0.05rem">
              <BarRank
                  :context="{
          title:'各区域检查次数',
          id: 'id_head_rank1'}"
              ></BarRank>
            </el-col>
            <el-col :span="12" class="" style="height: 50%; padding-top: 0.05rem">
              <BarRank
                  :context="{
          title:'各区域在管项目数量',
          id: 'id_head_rank2'}"
              ></BarRank>
            </el-col>
          </el-col>
          <!--          <HighProjectRisk></HighProjectRisk>-->
        </el-row>
        <el-row class="el-row" :gutter="10" type="flex" style="height: 35%; margin-top: 0.2rem; padding-left: 0.3rem">
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
          title:'不同分布区域隐患数量'+'-'+filter_major,
          id: 'id_head_region'
        }"></Ratio>
          </el-col>
        </el-row>
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
      // let head_large1 = document.getElementById('head_large1');
      // head_large1.style.display = 'none'
      // let head_large2 = document.getElementById('head_large2');
      // head_large2.style.display = 'none'
      // let head_small = document.getElementById('head_small');
      // head_small.style.display = 'block'
      // head_small.style.width = "500px"
      // head_small.style.width = "99%"
      this.$router.push({path: `/new_head_screen/${this.$store.state.get_headquarter.head_name}`});
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
  computed: {
    getRiskSum() {
      let data = this.$store.state.get_headquarter.risk_level_year
      let risk_num = 0;
      for(let i in data) {
        for(let j in data[i]) {
          risk_num += data[i][j]
        }
      }
      return risk_num
    },
    getTreeData() {
      this.treeObj = this.$store.state.get_login.grant_data.data.value
    }
  },
  updated() {
    this.filter_major = this.$store.state.get_headquarter.filter_major
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
      p_data: [],
      map: "",
      mapInfo: {},
      dataset: {},
      form: {
        name: '',
      },
      map_width: 0,
      map_height: 0,
      input: 'test',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // title1: this.$store.state.get_login.grant_data.data.headquarter_tag,
      title1: this.$store.state.get_headquarter.head_name,
      timer: null,
      nowWeek: "",
      nowDate: "",
      nowTime: "",
      filter_major: ""
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