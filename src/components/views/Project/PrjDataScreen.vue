<template>
  <el-row class="prj_data_screen" style="height: 100%;">
    <el-col :span="4" style="height: 100%">
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px">
        <el-image
            style="width: 90%; height: 90%"
            :src="url"
            :fit="fit"></el-image>
      </el-card>
      <Tree
          :treeObj="treeObj"
      ></Tree>
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 12%; margin: 0px 5px 5px 5px">
        <el-button size="mini" round
                   style="background-color: transparent; color: #ffffff"
                   @click="outPrjDataScreen">返回
        </el-button>
      </el-card>
    </el-col>
    <el-col :span="16" id="prj_charts" style="height: 100%;">
      <el-card class="title-box-card " shadow="never"
               style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px; top: 1%">
<!--        <label style="color: #c4bcbc; font-family:宋体; height: 95%">中瑞恒可视化系统</label>-->
        <label id="prj_title1_1" style="color: #c4bcbc; font-family:宋体; font-size: 1em; height: 80% ">{{title1}}</label>
        <label id="prj_title2_1" style="color: #c4bcbc; font-family:宋体; font-size: 1em; height: 80% ">{{title2}}</label>
        <label id="prj_title3_1" style="color: #c4bcbc; font-family:宋体; font-size: 0.5em; height: 40% ">{{title3}}</label>
      </el-card>
      <el-col :span="8" style="height: 83%">
        <!--历次检查累计发现隐患数量-->
        <CheckedProject></CheckedProject>
        <PerctangePerc :context="{title:'所有致因阶段占比（可筛选专业）', type:'reason', id:'id_reason'}"></PerctangePerc>
      </el-col>
      <el-col :span="8" style="height: 83%">
        <!--          当前未整改高风险隐患图片-->
        <UnsolvedImageList></UnsolvedImageList>
        <PerctangePerc :context="{title:'所有隐患分布区域占比（可筛选专业）', type:'region', id:'id_region'}"></PerctangePerc>
      </el-col>
      <el-col :span="8" style="height: 83%">
        <PerctangePerc :context="{title:'所有隐患子系统占比（可筛选专业）', type:'system', id:'id_system'}"></PerctangePerc>
        <HistoryTopRisk class=""></HistoryTopRisk>
        -->
      </el-col>
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 6%; margin: 0px 5px 5px 5px">
        <label>...</label>
      </el-card>
    </el-col>
    <CheckDataScreen id="check_charts" style="display: none"></CheckDataScreen>
    <el-col :span="4" style="height: 100%;overflow: scroll">
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px">
        <label>可选择的统计图</label>
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
    </el-col>
  </el-row>
</template>

<script>
import CheckedHistory from "@/components/views/Project/CheckedHistory.vue";
import Granularity from "@/components/views/Project/Granularity.vue";
import HistoryTopRisk from "@/components/views/Project/HistoryTopRisk.vue";
import PerctangePerc from "@/components/views/Project/PerctangePerc.vue";
import LastCheckPerc from "@/components/views/Project/LastCheckPerc.vue";
import CheckHistoryPerc from "@/components/views/Project/CheckHistoryPerc.vue";
import UnsolvedList from "@/components/views/Project/UnsolvedList.vue";
import UnsolvedImageList from "@/components/views/Project/UnsolvedImageList.vue";
import CheckedProject from "@/components/views/Project/CheckedProject.vue";
import IndexView from "@/components/views/HeadQuarters/IndexView.vue";
import PrjCurrentCorrectionRate from "@/components/views/Project/PrjCurrentCorrectionRate.vue";
import PrjIndex from "@/components/views/Project/PrjIndex.vue";
import CheckDataScreen from "@/components/views/Check/CheckDataScreen.vue";
import Tree from "@/components/views/functions/Tree.vue";

export default {
  name: "PrjOverview",
  components: {
    CheckDataScreen,
    Granularity,
    HistoryTopRisk,
    PerctangePerc,
    LastCheckPerc,
    CheckHistoryPerc,
    UnsolvedList,
    UnsolvedImageList,
    CheckedHistory,
    CheckedProject,
    IndexView,
    PrjCurrentCorrectionRate,
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
      title3: this.$store.state.get_login.grant_data.data.project_tag
    };
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