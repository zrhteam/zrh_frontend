<template>
  <el-row class="region_data_screen" style="height: 100%;">
    <el-col :span="4" style="height: 100%">
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px">
        <el-image
            style="width: 90%; height: 90%"
            :src="url"
            :fit="fit">
        </el-image>
      </el-card>
      <Tree
          :treeObj="treeObj"
      ></Tree>
      <el-card class="box-card " shadow="never"
               style="background-color: transparent; height: 12%; margin: 0px 5px 5px 5px">
        <el-button size="mini" round
                   style="background-color: transparent; color: #fff; "
                   @click="outRegionDataScreen">返回
        </el-button>


      </el-card>
    </el-col>
    <el-col :span="16" style="height: 100%;">
      <el-card class="title-box-card " shadow="never"
               style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px; top: 1%">
        <!--        <label style="color: #c4bcbc; font-family:宋体; height: 95% ">中瑞恒可视化系统</label>-->
        <label id="region_title1_1"
               style="color: #c4bcbc; font-family:宋体; font-size: 1em; height: 80% ">{{ title1 }}</label>
        <label id="region_title2_1"
               style="color: #c4bcbc; font-family:宋体; font-size: 1em; height: 80% ">{{ title2 }}</label>
      </el-card>
      <el-col :span="8" style="height: 83%">
        <!--          当前未整改高风险隐患图片-->
        <Region2_2></Region2_2>
      </el-col>
      <el-col :span="8" style="height: 83%">
        <Region3_1></Region3_1>
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

import Region2_2 from "@/components/views/Region/Region2_2.vue";
import Region3_1 from "@/components/views/Region/Region3_1.vue";
import Tree from "@/components/views/functions/Tree.vue"

export default {
  name: "RegionDataScreen",
  components: {
    Tree,
    Region3_1,
    Region2_2
  },
  methods: {
    outRegionDataScreen() {
      let large1 = document.getElementById('region_large1');
      large1.style.display = 'block'
      large1.style.width = "500px"
      large1.style.width = "99%"
      let large2 = document.getElementById('region_large2');
      large2.style.display = 'block'
      large2.style.width = "500px"
      large2.style.width = "99%"
      let prj_small = document.getElementById('region_small');
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
      },
      title1: this.$store.state.get_login.grant_data.data.headquarter_tag,
      title2: this.$store.state.get_login.grant_data.data.region_tag,
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