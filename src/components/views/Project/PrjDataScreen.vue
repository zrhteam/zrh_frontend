<template>
  <el-row class="prj_data_screen" style="height: 100%;">
    <el-col :span="4" style="height: 100%">
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px">
        <label>Logo</label>
      </el-card>
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height:74%; margin: 0px 5px 5px 5px">
        <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            size="mini">
        </el-input>
        <div style="height: 80%">
          <el-scrollbar>
            <el-tree
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                @node-click="handleNodeClick"
                default-expand-all
                :filter-node-method="filterNode"
                ref="tree">
              <!--                <span class="span-ellipsis" slot-scope="{ node, data }">-->
              <!--                  <span :title="node.label">{{ node.label }}</span>-->
              <!--                </span>-->
            </el-tree>
          </el-scrollbar>
        </div>
      </el-card>
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
        <label>数据大屏</label>
      </el-card>
      <el-col :span="8" style="height: 83%">
        <!--历次检查累计发现隐患数量-->
        <CheckedProject></CheckedProject>
        <PerctangePerc :context="{title:'所有致因阶段占比（可筛选专业）', type:'reason'}"></PerctangePerc>
      </el-col>
      <el-col :span="8" style="height: 83%">
        <!--          当前未整改高风险隐患图片-->
        <UnsolvedImageList></UnsolvedImageList>
        <PerctangePerc :context="{title:'所有隐患分布区域占比（可筛选专业）', type:'region'}"></PerctangePerc>
      </el-col>
      <el-col :span="8" style="height: 83%">
        <PerctangePerc :context="{title:'所有隐患子系统占比（可筛选专业）', type:'system'}"></PerctangePerc>
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

  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }, //对于总部
    getTreeData(tree_data) {
      let arr = []
      let count = 1;
      for (let i in tree_data['headquarter_tag']) {
        // let parent1 = [];
        let parent1 = {
          id: 0,
          label: '',
          children: []
        };
        parent1['id'] = count++
        parent1['label'] = i
        arr.push(parent1)
        for (let j in tree_data['headquarter_tag'][i]['region_tag']) {
          let parent2 = {
            id: 0,
            label: '',
            children: []
          };
          parent2['id'] = count++
          parent2['label'] = j
          parent1['children'].push(parent2)
          for (let k in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag']) {
            let child1 = {
              id: 0,
              label: '',
              children: []
            };
            child1['id'] = count++
            child1['label'] = k
            parent2['children'].push(child1)
            for (let l in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k]) {
              for (let m in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l]) {
                let child2 = {
                  id: 0,
                  label: ''
                };
                child2['id'] = count++
                child2['label'] = m
                child1['children'].push(child2)
              }
            }
          }
        }
      }
      console.log("arr", arr)
      this.data = arr
      this.$store.state.get_login.tree_data = arr
    },
    handleNodeClick(data, node) {
      if (node.level == 3) {
        let param = new URLSearchParams();
        param.append('project_name', data.label);
        this.$store.state.get_project.params = param

        this.$store.dispatch('get_project/getInitProjectRectification')
        this.$store.dispatch('get_project/getInitProjectRiskLevel')
        this.$store.dispatch('get_project/getInitProjectHistoryPerception')
        this.$store.dispatch('get_project/getInitProjectNumberChange')
        // // 当前未整改高风险隐患列表
        this.$store.dispatch('get_project/getInitPrjRisk')
        // // 当前未整改高风险隐患图片
        this.$store.dispatch('get_project/getInitProjectImage')
        //
        // //占比
        this.$store.dispatch('get_project/getInitProjectSystem')
        this.$store.dispatch('get_project/getInitProjectRegionDistribution')
        this.$store.dispatch('get_project/getInitProjectReason')

        //  历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
        this.$store.dispatch('get_project/getInitProjectRiskTop')
        var prj = document.getElementById('prj_part');
        prj.style.display = 'block'
        var check = document.getElementById('check_part');
        check.style.display = 'none'
        document.getElementById('map_1').style.display = 'none'
        document.getElementById('map_2').style.display = 'block'
        document.getElementById('prj_charts').style.display = 'block'
        document.getElementById('check_charts').style.display = 'none'
        this.map.setZoom(4)
        setTimeout(function () {
          this.map.panTo(new L.LatLng(34, 107));
        }, 300)
      }
      if (node.level == 4) {
        let param1 = new URLSearchParams();
        param1.append('check_code', data.label);
        this.$store.state.get_check.params = param1
        this.$store.dispatch('get_check/getCheckRectification')
        this.$store.dispatch('get_check/getCheckRiskLevel')
        this.$store.dispatch('get_check/getCheckRiskRatio')
        this.$store.dispatch('get_check/getCheckHighRisk')
        this.$store.dispatch('get_check/getCheckHighImage')
        this.$store.dispatch('get_check/getCheckMajorSystem')
        this.$store.dispatch('get_check/getCheckMajorArea')
        this.$store.dispatch('get_check/getCheckMajorStage')
        this.$store.dispatch('get_check/getCheckRiskTop')
        var prj = document.getElementById('prj_part');
        prj.style.display = 'none'
        var check = document.getElementById('check_part');
        check.style.display = 'block'
        document.getElementById('map_1').style.display = 'none'
        document.getElementById('map_2').style.display = 'block'
        document.getElementById('prj_charts').style.display = 'none'
        document.getElementById('check_charts').style.display = 'block'
        this.map.setZoom(12)
        let _this = this
        setTimeout(function () {
          _this.map.panTo(new L.LatLng(31.8604, 117.3254));
        }, 100)
      }
    },
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
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  created() {
    //得到树形控件的内容
    this.getTreeData(this.$store.state.get_login.grant_data.data.value)
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