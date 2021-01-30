<template>
  <el-row class="region_data_screen" style="height: 100%;">
    <el-col :span="4" style="height: 100%">
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px">
        <el-image
              style="width: 90%; height: 90%"
              :src="url"
              :fit="fit"></el-image>
      </el-card>
<!--      <Tree-->
<!--          :treeObj="treeObj"-->
<!--        ></Tree>-->
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height:74%; margin: 0px 5px 5px 5px">
      </el-card>
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 12%; margin: 0px 5px 5px 5px">
        <el-button size="mini" round
                   style="background-color: transparent; color: #fff; "
                   @click="outHeadDataScreen">返回
        </el-button>


      </el-card>
    </el-col>
    <el-col :span="16" style="height: 100%;">
      <el-card class="title-box-card " shadow="never"
               style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px; top: 1%">
<!--        <label style="color: #c4bcbc; font-family:宋体; height: 95% ">中瑞恒可视化系统</label>-->
        <label id="head_title1_1" style="color: #c4bcbc; font-family:宋体; font-size: 1em; height: 80% ">{{title1}}</label>
      </el-card>
      <el-col :span="8" style="height: 42%">
        <!--          当前未整改高风险隐患图片-->
        <HighRiskImages></HighRiskImages>
      </el-col>
      <el-col :span="24" style="height: 42%">
        <ProjectIndex></ProjectIndex>
      </el-col>
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 6%; margin: 0px 5px 5px 5px">
        <label>...</label>
      </el-card>
    </el-col>
<!--    <CheckDataScreen></CheckDataScreen>-->
    <el-col :span="4" style="height: 100%; overflow: scroll">
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px">
        <label>可选择的统计图</label>
      </el-card>
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">
        <TopRisk
            :context="{
          title:'历史重复出现隐患排名（5）',
          label1:'隐患描述',
          label2:'出现频率',
          sign:'head_risk',
          option:this.risk_option}"
            :top_data="this.$store.state.get_headquarter.risk_number_top"
        ></TopRisk>
      </el-card>
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">
        <RiskLevelYear :context="{title:'总部累计年隐患数量（6）', id:'head_level_year'}"></RiskLevelYear>
      </el-card>
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">
        <TopRisk
            :context="{
                  title:'历史重复出现隐患排名（7）',
                  label1:'隐患描述',
                  label2:'出现频率',
                  sign:'head_other',
                  option:this.other_option}"
            :top_data="this.$store.state.get_headquarter.other_number_top"
        ></TopRisk>
      </el-card>
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">
        <div style="display: none">
          {{ getName }}
        </div>
        <TopName
            :context="{title:'根据检查次数的区域排名（8）',
            top_data:this.rank_by_check,
            label1:'项目名称',
            label2:'检查次数',
        }"></TopName>
      </el-card>
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">
        <Ratio
            :context="{
          title:'各专业隐患数量占比（9）',
          id: 'id_head_major'
        }"></Ratio>
      </el-card>
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">
        <TopName
            :context="{title:'根据项目数量的区域排名（12）',
            top_data:this.rank_by_prj,
            label1:'项目名称',
            label2:'检查次数',
        }"></TopName>
      </el-card>
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 29%; margin: 0px 5px 5px 5px">
      </el-card>

      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 29%; margin: 0px 5px 5px 5px">
      </el-card>
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 30%; margin: 0px 5px 5px 5px">
      </el-card>
    </el-col>
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
export default {
  name: "headquarterOverview",
  components: {
    Ratio,
    RiskLevelYear,
    ProjectIndex,
    HighRiskImages,
    Tree,
    TopRisk,
    TopName
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
  },
  computed: {
    getName() {
      let data = this.$store.state.get_headquarter.rank_by_check
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
      rank_by_prj: []
    };
  },
  created() {
    //得到树形控件的内容
    this.treeObj = this.$store.state.get_login.grant_data.data.value
  }
}
</script>

<style scoped>
</style>