<template>
  <!--  <div></div>-->
  <el-row class="boundary" style="height: 100%;">
    <PrjDataScreen id="small" style="display: none"></PrjDataScreen>
    <el-row id="large1" class="boundary" style="height: 10%;">
      <el-col :span="4" style="height: 100%">
        <el-card class="boundary-C" shadow="never"
                 style="background-color: transparent; height: 99%; margin: 0px 5px 5px 5px">
          <label>Logo</label>
        </el-card>
      </el-col>
      <el-col :span="20" style="height: 100%">
        <el-card class="box-card boundary-C" shadow="never"
                 style="background-color: transparent; height: 99%; margin: 0px 5px 5px 5px">
          <label>中瑞恒可视化系统</label>
        </el-card>
      </el-col>
    </el-row>
    <el-row id="large2" class="boundary" style="height: 90%;">
      <el-col :span="4" class="boundary-A" style="height: 100%">
        <el-card class="box-card boundary-B" shadow="never"
                 style="background-color: transparent; height:74%; margin: 0px 5px 5px 5px">
          <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText"
              size="mini">
          </el-input>
          <el-scrollbar style="height:100%">
            <el-tree
                class="filter-tree"
                :data="data"
                default-expand-all
                :filter-node-method="filterNode"
                ref="tree">
                <span class="span-ellipsis" slot-scope="{ node, data }">
                  <span :title="node.label">{{ node.label }}</span>
                </span>
            </el-tree>
          </el-scrollbar>
        </el-card>
        <el-card class="box-card boundary-B" shadow="never"
                 style="background-color: transparent; height: 24%; margin: 0px 5px 5px 5px">
          <el-button size="mini" round
                     style="position: absolute; z-index: 9; left: 12%; background-color: transparent; color: #ffffff"
                     @click="intoPrjDataScreen">展开
          </el-button>
          <PrjDataScreen></PrjDataScreen>

          <!--          <label>数据大屏缩略图</label>-->
        </el-card>
      </el-col>
      <el-col :span="10" class="boundary-A" style="height: 100%">
        <el-card class="box-card boundary-B" shadow="never"
                 style="background-color: transparent; height: 79%; margin: 0px 5px 5px 5px">
          <label>map</label>
        </el-card>
        <!--历次检查指数-->
        <PrjIndex></PrjIndex>
      </el-col>
      <el-col :span="10" class="boundary-A" style="height: 100%">
        <!--      <el-card class="boundary-B" shadow="never" style="background-color: transparent; height: 100%">-->
        <el-row style="height: 100%">
          <el-card class="box-card boundary-C" shadow="never"
                   style="background-color: transparent; height: 5%; margin: 0px 5px 5px 5px">
            <label>chart</label>
          </el-card>
          <!--          <el-row style="height: 42%">-->
          <el-col :span="12" style="height: 42%">
            <CheckHistoryPerc></CheckHistoryPerc>
          </el-col>
          <el-col :span="12" style="height: 42%">
            <el-card class="box-card boundary-C" shadow="never"
                     style="background-color: transparent; height: 70%; margin: 40px 40px 40px 40px">
              <!--          当前未整改高风险隐患列表-->
              <UnsolvedList></UnsolvedList>
            </el-card>
          </el-col>
          <!--          </el-row>-->
          <!--          <el-row style="height: 42%">-->
          <el-col :span="12" style="height: 42%">
            <!--当前整改率-->
            <PrjCurrentCorrectionRate></PrjCurrentCorrectionRate>
          </el-col>
          <el-col :span="12" style="height: 42%">
            <CheckedHistory></CheckedHistory>
            <!--历次检查隐患数量变化-->
          </el-col>
          <!--          </el-row>-->
          <el-card class="box-card boundary-C" shadow="never"
                   style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px">
            <label>more</label>
          </el-card>
        </el-row>
        <!--      </el-card>-->
      </el-col>
    </el-row>
  </el-row>
  <!--  <PrjDataScreen></PrjDataScreen>-->
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
import PrjDataScreen from '@/components/views/Project/PrjDataScreen.vue'

export default {
  name: "PrjOverview",
  components: {
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
    PrjDataScreen,

  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }

  },
  computed: {
    // getTreeData() {
    //   return this.$store.state.get_login.grant_data.data.value
    //   // console.log(this.dataset)
    // },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },//对于总部
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
    intoPrjDataScreen() {
      var large1 = document.getElementById('large1');
      large1.style.display = 'none'
      var large2 = document.getElementById('large2');
      large2.style.display = 'none'
      var small = document.getElementById('small');
      small.style.display = 'block'
    }
  },

  data() {
    return {
      filterText: '',
      data: [],
      status: true

    };
  },
  created() {
    console.log('grant', this.$store.state.get_login.grant_data)
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

/*button {*/
/*  width: 50px;*/
/*  background-color: #428bca;*/
/*  border-color: #ffffff;*/
/*  color: #fff;*/
/*  border: solid 1px #ffffff;*/
/*  border-radius: 40px 40px 40px 40px;*/
/*  -khtml-border-radius: 10px; !* for old Konqueror browsers *!*/
/*  !*text-align: center;*!*/
/*  font-weight: 10;*/
/*  font-size: 10px;*/
/*  float: right;*/
/*}*/
</style>
