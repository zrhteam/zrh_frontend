<template>
  <el-row style="height: 100%;">
    <el-row id="large1" class="" style="height: 1.25rem;">
      <el-col :span="24" style="height: 100%">
        <div class="title-box-card " shadow="never"
             style="background-color: transparent; height: 99%; width: 99%; margin: 0px 5px 0 5px">
          <el-col :span="4" style="height: 100%; ">
            <el-col :span="6" :offset="14" style="height: 100%;">
              <div style="font-size: 0.4rem; font-weight: bold; color: #1fedfc; top:0.41rem; position: relative; font-family: 'Microsoft YaHei'">
                {{ getRiskSum }}
              </div>
            </el-col>
          </el-col>
          <el-col :span="16" style="height: 100%;">
<!--            <h4>-->
            <span id="prj_title1"
                  style="color: #04aaff; font-family:'Microsoft YaHei'; font-size: 0.4em; font-weight: bold; height: 100%; display: inline-block; vertical-align: 0.27rem">{{title1}}{{title2}}{{title3}}</span>
<!--              <span id="prj_title2"-->
<!--                    style="color: #c4bcbc; font-family:'Microsoft YaHei'; font-size: 0.4em; vertical-align: 85%; height: 100%">{{-->
<!--                  title2-->
<!--                }}</span>-->
<!--              <span id="prj_title3"-->
<!--                    style="color: #c4bcbc; font-family:'Microsoft YaHei'; font-size: 0.4em; vertical-align: 85%; height: 100%">{{-->
<!--                  title3-->
<!--                }}</span>-->
<!--            </h4>-->
          </el-col>
          <el-col :span="4" style="height: 1.25rem; position: relative; float:right">
            <el-col :span="12" :offset="3" style="height: 100%; ">
              <div style="height: 100%;">
                  <span style="font-size: 0.4rem; color: #18bff0; top:30%; right:1.6rem; position: absolute; font-family: 'Microsoft YaHei'">
                    {{ nowTime }}
                  </span>
              </div>
            </el-col>
            <el-col :span="9" style="height: 100%; color: #1072b5; font-size: 0.15rem;font-family: 'Microsoft YaHei' ">
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
      <el-col :span="22" style="height: 100%;">
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
    </el-row>
  </el-row>
</template>

<script>
import PerctangePerc from "@/components/views/Project/PerctangePerc.vue";
import CheckHistoryPerc from "@/components/views/Project/CheckHistoryPerc.vue";
import PrjIndex from "@/components/views/Project/PrjIndex.vue";
import CheckOverview from "@/components/views/Check/CheckOverview.vue";
import Tree from "@/components/views/functions/Tree.vue";
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
import BarRank from "@/components/views/functions/BarRank.vue";
import StackedHorizontalBar from "@/components/views/functions/StackedHorizontalBar.vue";

export default {
  name: "PrjOverview",
  components: {
    RiskLevelYear,
    CheckOverview,
    PerctangePerc,
    CheckHistoryPerc,
    // PrjEHSDataAnalysis3,
    PrjIndex,
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

      let queryJson = JSON.stringify(this.$store.state.get_project.prj_name)
      this.$router.push({
        path: `/new_project_screen`,
        query: {queryJson: queryJson}
      });
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

    //得到树形控件的内容 还负责封装了地理位置信息
    this.treeObj = this.$store.state.get_login.grant_data.data.value
  },
  updated() {
    this.filter_major = this.$store.state.get_project.filter_major
    this.title1 = this.$store.state.get_headquarter.head_name.label
    this.title2 = this.$store.state.get_region.region_name.label
    this.title3 = this.$store.state.get_project.prj_name.label
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
      title1: this.$store.state.get_headquarter.head_name.label,
      title2: this.$store.state.get_region.region_name.label,
      title3: this.$store.state.get_project.prj_name.label,
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

    // this.title1 = this.$store.state.get_headquarter.head_name
    // this.title2 = this.$store.state.get_region.region_name
    // this.title3 = this.$store.state.get_project.prj_name
  },
  beforeDestroy() {
    clearInterval(this.timer)
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
