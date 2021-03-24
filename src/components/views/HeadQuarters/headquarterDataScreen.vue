<template>
  <el-row style="height: 100%;">
    <el-row style="height: 10%">
      <el-card class="title-box-card" shadow="never"
               style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px;">
        <h4>
          <span id="head_title2"
                style="">{{
              title1
            }}</span>
        </h4>
      </el-card>
    </el-row>
    <el-row style="height: 100px;">
      <el-col :span="4" style="height: 100%">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="数据大屏" name="first" :key=" 'first' " lazy>
          </el-tab-pane>

          <el-tab-pane label="授权页面" name="second" :key=" 'second' " lazy>
          </el-tab-pane>

          <!--         <el-tab-pane label="授权页面" name="second" :key=" 'second' " lazy>-->
          <!--         </el-tab-pane>-->
        </el-tabs>
      </el-col>
      <el-col :span="20" style="height: 100%; padding-top: 3%">
        <el-button size="mini" round
                   style="background-color: transparent; color: #ffffff; float: right;"
                   @click="outHeadDataScreen">返回
        </el-button>
      </el-col>
    </el-row>
    <el-row v-if="isFirst" style="height: 75%;">
      <div style="display: none">
        {{ getName }}
      </div>
      <el-col :span="8" style="height: 48%; margin-left:0.5%">
        <Ratio
            :context="{
          title:'不同专业隐患数量',
          id: 'id_head_major',
        }"></Ratio>
      </el-col>
      <el-col :span="8" style="height: 48%; ">
<!--        <Ratio-->
<!--            :context="{-->
<!--          title:'不同致因阶段隐患数量',-->
<!--          id: 'id_head_reason'-->
<!--        }"></Ratio>-->
        <StackedHorizontalBar
            :context="{
          title:'不同致因阶段隐患数量',
          id: 'id_head_reason'
        }"></StackedHorizontalBar>
      </el-col>
      <el-col :span="8" style="height: 48%; width: 32.5%">
        <Ratio
            :context="{
          title:'不同分布区域隐患数量',
          id: 'id_head_region'
        }"></Ratio>
      </el-col>
      <el-col :span="8" style="height: 48%; margin-top: 1%">
        <BarRank
            :context="{
          title:'各区域检查次数',
          id: 'id_head_rank1'}"
        ></BarRank>
      </el-col>
      <el-col :span="8" style="height: 48%; margin-top: 1%">
        <BarRank
            :context="{
          title:'各区域在管项目数量',
          id: 'id_head_rank2'}"
        ></BarRank>
      </el-col>
      <el-col :span="8" style="height: 48%; margin-top: 1%">
        <CheckRiskLevel :context="{title:'隐患总量', id:'head_risk_level'}"></CheckRiskLevel>
      </el-col>
    </el-row>
    <el-row v-if="isSecond" style="height: 75%;">
      <el-col :span="24" style="height: 100%; flex-direction: row; overflow-x: scroll">
        <el-col :span="24" class="level4" style="min-height: 30px" v-if="isShow">
          <!--        <div class="level4" style="; padding-left: 10px">-->
          <el-popover
              placement="top-start"
              title="粒度"
              width="400"
              trigger="hover">
            <span style="color: #ffffff">{{ level }}</span>
            <el-button slot="reference" size="mini" round style="background-color: transparent; color: #ffffff">粒度
            </el-button>
          </el-popover>
          <el-popover
              placement="top-start"
              title="object1"
              width="400"
              trigger="hover">
            <span style="color: #ffffff">{{ obj1 }}</span>
            <el-button slot="reference" size="mini" round style="background-color: transparent; color: #ffffff">object1
            </el-button>
          </el-popover>
          <el-popover
              placement="top-start"
              title="object2"
              width="400"
              trigger="hover"
              style="color: #ffffff">
            <span style="color: #ffffff">{{ obj2 }}</span>
            <el-button slot="reference" size="mini" round style="background-color: transparent; color: #ffffff">object2
            </el-button>
          </el-popover>

          <!--        </div>-->
        </el-col>
        <el-col :span="8" style="height: 25%">
          <DoughnutChart
              v-if="isShows[0]"
              :context="{
                    title:this.titles[0],
                    id:'id_by_check',
                    level: this.level,
                    flag: 'grant'}"
          ></DoughnutChart>
        </el-col>
        <el-col :span="8" style="height: 25%">
          <DoughnutChart
              v-if="isShows[1]"
              :context="{
                    title:this.titles[1],
                    id:'id_by_prj',
                    level: this.level,
                    flag: 'grant'}"
          ></DoughnutChart>
        </el-col>
        <el-col :span="8" style="height: 25%">
          <RiskLevelYear
              v-if="isShows[2]"
              :context="{
                    title:this.titles[2],
                    id:'id_risk_level',
                    level: this.level,
                    flag: 'grant'}"></RiskLevelYear>
        </el-col>
        <el-col :span="8" style="height: 50%">
          <TopCompare
              v-if="isShows[3]"
              :context="{
                    title:this.titles[3],
                    id1:'id_area_o1',
                    id2:'id_area_o2',
                    level: this.level,
                    flag: 'grant'}"
          ></TopCompare>
        </el-col>
        <el-col :span="8" style="height: 50%">
          <TopCompare
              v-if="isShows[4]"
              :context="{
                    title:this.titles[4],
                    id1:'id_stage_o1',
                    id2:'id_stage_o2',
                    level: this.level,
                    flag: 'grant'}"
          ></TopCompare>
        </el-col>
        <el-col :span="8" style="height: 50%">
          <TopCompare
              v-if="isShows[5]"
              :context="{
                    title:this.titles[5],
                    id1:'id_risk_o1',
                    id2:'id_risk_o2',
                    level: this.level,
                    flag: 'grant'}"
          ></TopCompare>
        </el-col>
        <el-col :span="8" style="height: 50%">
          <TopCompare
              v-if="isShows[6]"
              :context="{
                    title:this.titles[6],
                    id1:'id_module_top1',
                    id2:'id_module_top2',
                    level: this.level,
                    flag: 'grant'}"
          ></TopCompare>
        </el-col>
        <el-col :span="8" style="height: 50%">
          <TopCompare
              v-if="isShows[7]"
              :context="{
                    title:this.titles[7],
                    id1:'id_equip_top1',
                    id2:'id_equip_top2',
                    level: this.level,
                    flag: 'grant'}"
          ></TopCompare>
        </el-col>
        <el-col :span="8" style="height: 50%">
          <TopCompare
              v-if="isShows[8]"
              :context="{
                    title:this.titles[8],
                    id1:'id_system_top1',
                    id2:'id_system_top2',
                    level: this.level,
                    flag: 'grant'}"
          ></TopCompare>
        </el-col>
        <el-col :span="24" style="height: 50%">
          <DrillDown
              v-if="isShows[9]"
              :context="{
                    title:this.titles[9],
                    id1:'id_major_o1',
                    id2:'id_major_o2',
                    level: this.level,
                    flag: 'grant'}"
          ></DrillDown>
        </el-col>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import HighRiskImages from "@/components/views/HeadQuarters/HighRiskImages.vue";
import ProjectIndex from "@/components/views/HeadQuarters/ProjectIndex.vue";
import Tree from "@/components/views/functions/Tree.vue";
import TopRisk from "@/components/views/functions/TopRisk.vue";
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
import TopName from "@/components/views/functions/TopName.vue";
import Ratio from "@/components/views/functions/Ratio.vue";
import BarRank from "@/components/views/functions/BarRank.vue";
import DoughnutChart from "@/components/views/functions/DoughnutChart.vue";
import TopCompare from "@/components/views/functions/TopCompare.vue";
import DrillDown from "@/components/views/functions/DrillDown.vue";
import CheckRiskLevel from "@/components/views/Check/CheckRiskLevel.vue";
import StackedHorizontalBar from "@/components/views/functions/StackedHorizontalBar.vue";

export default {
  name: "headquarterDataScreen",
  components: {
    StackedHorizontalBar,
    DrillDown,
    TopCompare,
    DoughnutChart,
    BarRank,
    Ratio,
    RiskLevelYear,
    ProjectIndex,
    HighRiskImages,
    Tree,
    TopRisk,
    TopName,
    CheckRiskLevel
  },
  methods: {
    outHeadDataScreen() {
      let large1 = document.getElementById('head_large1');
      large1.style.display = 'block'
      large1.style.width = "500px"
      large1.style.width = "99%"
      let large2 = document.getElementById('head_large2');
      large2.style.display = 'block'
      large2.style.width = "500px"
      large2.style.width = "99%"
      let prj_small = document.getElementById('head_small');
      prj_small.style.display = 'none'
    },
    handleClick(tab, event) {
      // console.log(tab, event)
      if (tab.name === 'first') {
        this.isFirst = true
        this.isSecond = false
      } else if (tab.name === 'second') {
        this.isFirst = false
        this.isSecond = true
      }
      setTimeout(function () {
        document.getElementById('head_small').style.display = 'block'
      }, 100);
    }
  },
  computed: {
    getName() {
      let data = this.$store.state.get_login.grant_info.data
      for (let i in data) {
        for (let j in this.titles) {
          if (data[i].title === this.titles[j]) {
            this.isShow = true
            this.isShows[j] = true
            this.level = data[i].level
            this.obj1 = data[i].object1
            this.obj2 = data[i].object2
            let param = new URLSearchParams();
            param.append('level', data[i].level);
            param.append('object1', data[i].object1);
            param.append('object2', data[i].object2);
            this.$store.commit('get_comparison/changeParams', {params: param})
            this.$store.commit('get_comparison/changeObject1', {object1: data[i].object1})
            this.$store.commit('get_comparison/changeObject2', {object2: data[i].object2})
          }
        }
      }
      if (this.isShows[0] == true) {
        this.$store.dispatch('get_comparison/getCheckNumber')
      }
      if (this.isShows[1] == true) {
        this.$store.dispatch('get_comparison/getProjectNumber')
      }
      if (this.isShows[2] == true) {
        this.$store.dispatch('get_comparison/getRiskLevel')
      }
      if (this.isShows[3] == true) {
        this.$store.dispatch('get_comparison/getAreaRisk')
      }
      if (this.isShows[4] == true) {
        this.$store.dispatch('get_comparison/getStageRisk')
      }
      if (this.isShows[5] == true) {
        this.$store.dispatch('get_comparison/getTopNumber')
      }
      if (this.isShows[6] == true) {
        this.$store.dispatch('get_comparison/getUnitNumberTop')
      }
      if (this.isShows[7] == true) {
        this.$store.dispatch('get_comparison/getDeviceNumberTop')
      }
      if (this.isShows[8] == true) {
        this.$store.dispatch('get_comparison/getSystemNumberTop')
      }
      if (this.isShows[9] == true) {
        this.$store.dispatch('get_comparison/getMajorRiskNumber')
      }
      data = this.$store.state.get_headquarter.rank_by_check
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i]
        this.rank_by_check.push(obj)
      }
      data = this.$store.state.get_headquarter.rank_by_prj
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i]
        this.rank_by_prj.push(obj)
      }
    }
  },
  data() {
    return {
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      fit: 'fill',
      url: 'http://www.zhongrh.com/Upfiles/Base/2020111937459.png',
      filterText: '',
      treeObj: {},
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
      rank_by_check: [],
      rank_by_prj: [],
      activeName: 'first',
      isFirst: true,
      isSecond: false,
      level: '',
      obj1: '',
      obj2: '',
      titles: ['检查次数对比', "项目数量对比", '各风险等级隐患数量对比', '前top分布区域隐患数量对比', '前top致因阶段隐患数量对比', '前top隐患数量对比', '隐患数量前top组件对比', '隐患数量前top设备对比', '隐患数量前top系统对比', '前top专业隐患数量对比'],
      isShow: false,
      isShows: [false, false, false, false, false, false, false, false, false, false]
    };
  },
  created() {
    //得到树形控件的内容
    this.treeObj = this.$store.state.get_login.grant_data.data.value
  }
}
</script>

<style scoped>
#head_title2 {
   color: #c4bcbc;
   font-family:Microsoft YaHei;
   font-size: 0.6em;
   font-weight: bold;
   vertical-align: 45%;
   height: 100%
}
</style>