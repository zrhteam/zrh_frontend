<template>
  <el-row style="height: 100%;">
    <el-row style="height: 10%">
      <el-card class="title-box-card" shadow="never"
               style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px;">
        <!--        <label style="color: #c4bcbc; font-family:宋体; height: 95%">中瑞恒可视化系统</label>-->
        <h4>
            <span id="prj_title1_1"
                  style="color: #c4bcbc; font-family:Noto Sans SC; font-size: 0.4em; vertical-align: 65%; height: 100%">{{
                title1
              }}</span>
          <span id="prj_title2_1"
                style="color: #c4bcbc; font-family:Noto Sans SC; font-size: 0.4em; vertical-align: 65%; height: 100%">{{
              title2
            }}</span>
          <span id="prj_title3_1"
                style="color: #c4bcbc; font-family:Noto Sans SC; font-size: 0.4em; vertical-align: 65%; height: 100%">{{
              title3
            }}</span>
        </h4>
      </el-card>
    </el-row>
    <el-row id="prj_charts" style="height: 89%">
      <el-col :span="20" style="height: 100%;">
        <el-row style="height: 85%;">
          <el-col :span="12" style="height: 100%; margin-left: 6%">
            <el-row style="height: 32%; margin-bottom: 1%">
              <TopRisk
                  :context="{
          title:'重复出现隐患列表',
          label1:'隐患描述',
          label2:'出现频率',
          sign:'prj_risk',
          option:this.risk_option}"
                  :top_data="this.$store.state.get_project.prj_risk_top"
              ></TopRisk>
            </el-row>
            <el-row style="height: 32%; margin-bottom: 1%">
              <TopRisk
                  :context="{
                          title:'重复出现隐患列表',
                          label1:'隐患描述',
                          label2:'出现频率',
                          sign:'prj_other',
                          option:this.other_option}"
                  :top_data="this.$store.state.get_project.prj_other_top"
              ></TopRisk>
            </el-row>
            <el-row style="height: 32%; margin-bottom: 1%">
              <Rules
                  :context="{title:'最容易违反的法规标准',
            top_data:this.prj_rule_name,
            label1:'违反次数',
            label2:'法规名称',
            label3:'条款号',
        }"></Rules>
            </el-row>
          </el-col>
          <el-col :span="10" style="height: 100%;">
            <el-row style="height: 32%; margin-bottom: 1%">
              <TopName
                  :context="{title:'最容易出现隐患的设备',
            top_data:this.prj_device_name,
            label1:'系统名称',
            label2:'出现频率',
        }"></TopName>
            </el-row>
            <el-row style="height: 32%; margin-bottom: 1%">
              <TopName
                  :context="{title:'最容易出现隐患的组件',
            top_data:this.prj_unit_name,
            label1:'系统名称',
            label2:'出现频率',
        }"></TopName>
            </el-row>
            <el-row style="height: 32%; margin-bottom: 1%">
              <UnsolvedImageList></UnsolvedImageList>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4" style="height: 100%;overflow: scroll">
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 6%; margin: 0; text-align: right">
          <el-button size="mini" round
                     style="background-color: transparent; color: #ffffff; vertical-align: top; text-align: right"
                     @click="outPrjDataScreen">返回
          </el-button>
        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px">
          <label>可选择</label>
        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">
        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">

        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">
          <!--        <RiskLevelYear :context="{title:'检查累计年隐患数量（2）', id:'check_level_year'}"></RiskLevelYear>-->
        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">

        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">
          <div style="display: none">
            {{ getName }}
          </div>

        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">

        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">

        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">

        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">

        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">
          <!--        <RiskLevelYear :context="{title:'项目年隐患数量（3）', id:'prj_level_year'}"></RiskLevelYear>-->

        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">

        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">

        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">
          <!--        <TopName-->
          <!--            :context="{title:'隐患次数累计系统名称排名（prj11）',-->
          <!--            top_data:this.prj_sys_name,-->
          <!--            label1:'系统名称',-->
          <!--            label2:'出现频率',-->
          <!--        }"></TopName>-->
        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">

        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">

        </el-card>
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">

        </el-card>
      </el-col>
    </el-row>
    <CheckDataScreen id="check_charts" style="display: none"></CheckDataScreen>
  </el-row>
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
import CheckDataScreen from "@/components/views/Check/CheckDataScreen.vue";
import Tree from "@/components/views/functions/Tree.vue";
import TopName from "@/components/views/functions/TopName.vue";
import TopRisk from "@/components/views/functions/TopRisk.vue";
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
import Rules from "@/components/views/functions/Rules.vue";

export default {
  name: "PrjOverview",
  components: {
    Rules,
    RiskLevelYear,
    TopRisk,
    TopName,
    CheckDataScreen,
    Granularity,
    PerctangePerc,
    CheckHistoryPerc,
    UnsolvedList,
    UnsolvedImageList,
    CheckedHistory,
    CheckedProject,
    // PrjEHSDataAnalysis3,
    PrjIndex,
    Tree
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }, //对于总部
    outPrjDataScreen() {
      var large1 = document.getElementById('large1');
      large1.style.display = 'block'
      large1.style.width = "500px"
      large1.style.width = "99%"
      var large2 = document.getElementById('large2');
      large2.style.display = 'block'
      large2.style.width = "500px"
      large2.style.width = "99%"
      var prj_small = document.getElementById('prj_small');
      prj_small.style.display = 'none'
      // document.getElementById('prj_charts').style.width = "500px"
      // document.getElementById('prj_charts').style.width = "99%"
      // document.getElementById('check_charts').style.width = "500px"
      // document.getElementById('check_charts').style.width = "99%"
    },
  },
  data() {
    return {
      filterText: '',
      data: [],
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      fit: 'fill',
      url: 'http://www.zhongrh.com/Upfiles/Base/2020111937459.png',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeObj: {},
      title1: this.$store.state.get_login.grant_data.data.headquarter_tag,
      title2: this.$store.state.get_login.grant_data.data.region_tag,
      title3: this.$store.state.get_login.grant_data.data.project_tag,
      sys_name: [],
      device_name: [],
      unit_name: [],
      rule_name: [],
      risk_option: [{
        value: '专业',
        key: 'major'
      }, {
        value: '系统',
        key: 'system'
      }, {
        value: '设备',
        key: 'equipment'
      }, {
        value: '组件',
        key: 'module'
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
      prj_sys_name: [],
      prj_device_name: [],
      prj_unit_name: [],
      prj_rule_name: []
    };
  },
  computed: {
    getName() {
      let data = this.$store.state.get_check.check_sys_name
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.sys_name.push(obj)
      }

      data = this.$store.state.get_check.check_device_name
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.device_name.push(obj)
      }

      data = this.$store.state.get_check.check_unit_name
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.unit_name.push(obj)
      }


      data = this.$store.state.get_project.prj_sys_name
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.prj_sys_name.push(obj)
      }

      data = this.$store.state.get_project.prj_device_name
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.prj_device_name.push(obj)
      }

      data = this.$store.state.get_project.prj_unit_name
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.prj_unit_name.push(obj)
      }

      data = this.$store.state.get_check.check_rule
      for (let i in data) {
        let obj = {
          appear_time: 0,
          rule_name: '',
          clause: '',
          clause_contact: ''
        }
        obj['appear_time'] = data[i].appear_time
        obj['rule_name'] = i
        obj['clause'] = data[i].clause
        obj['clause_contact'] = data[i].clause_contact
        this.rule_name.push(obj)
      }

      data = this.$store.state.get_project.prj_rule
      for (let i in data) {
        let obj = {
          appear_time: 0,
          rule_name: '',
          clause: '',
          clause_contact: ''
        }
        obj['appear_time'] = data[i].appear_time
        obj['rule_name'] = i
        obj['clause'] = data[i].clause
        obj['clause_contact'] = data[i].clause_contact
        this.prj_rule_name.push(obj)
      }
    }
  },
  created() {
    //得到树形控件的内容
    this.treeObj = this.$store.state.get_login.grant_data.data.value
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
</style>