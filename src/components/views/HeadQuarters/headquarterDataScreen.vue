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
      <Tree
          :treeObj="treeObj"
        ></Tree>
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
import Tree from "@/components/views/functions/Tree.vue";
export default {
  name: "headquarterOverview",
  components: {
    ProjectIndex,
    HighRiskImages,
    Tree
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
      }
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