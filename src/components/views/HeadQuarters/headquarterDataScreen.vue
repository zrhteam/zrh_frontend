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
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height:74%; margin: 0px 5px 5px 5px">
        <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            size="mini">
        </el-input>
        <div style="height: 80%">
          <el-scrollbar style="height: 100%">
            <el-tree
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                @node-click="handleNodeClick"
                default-expand-all
                :filter-node-method="filterNode"
                ref="tree">
               <span class="span-ellipsis" slot-scope="{ node, data }">
                  <span :title="node.label">{{ node.label }}</span>
                </span>
            </el-tree>
          </el-scrollbar>
        </div>
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
        <label style="color: #c4bcbc; font-family:宋体; height: 95% ">中瑞恒可视化系统</label>
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
    <el-col :span="4" style="height: 100%">
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px">
        <label>可选择的统计图</label>
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
export default {
  name: "headquarterOverview",
  components: {
    ProjectIndex,
    HighRiskImages
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
            // parent2['children'].push(child1)
            for (let l in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k]) {
              for (let m in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l]) {
                let child2 = {
                  id: 0,
                  label: ''
                };
                child2['id'] = count++
                child2['label'] = m
                // child1['children'].push(child2)
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
        console.log("出来了", data);
        console.log(node);
    },
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

  data() {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'http://www.zhongrh.com/Upfiles/Base/2020111937459.png',
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