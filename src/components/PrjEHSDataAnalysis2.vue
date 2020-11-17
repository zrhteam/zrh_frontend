<template>
  <el-row style="margin-bottom: 100px">
    <el-col :span="6">
      <!--          最近一次检查隐患专业占比 饼图-->
    </el-col>
    <el-col :span="6">
      <!--          历次检查累计隐患专业占比 饼图-->
    </el-col>
    <el-col :span="6">
      <div style="display: none">
        {{ getPrjRiskLevelList }}
      </div>
      <div id="subtitle">
        <span>当前未整改高风险隐患列表</span>
      </div>
      <div>
        <el-table
            :data="riskLevelList"
            stripe
            style="width: 100%">
          <el-table-column
              prop="description"
              label="隐患描述">
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="6">
      <div style="display: none">
        {{ getPrjImage }}
      </div>
      <div class="grid-content bg-purple">
        <div
            style="color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: 16px; font-size: 16px; height: 16px;">
          <span>未整改高风险隐患图片</span>
        </div>
        <div
            style="color: rgb(247, 10, 10); font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 52px;">
          <!--              图片播放-->

          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in img_list" :key="item">
              <img :src="item" alt/>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "PrjEHSDataAnalysis2",

  data() {
    return {
      riskLevelList: [],
      timer: '',
      img_list: []
    }
  },
  mounted() {
    this.timer = setInterval(this.updateTable, 1000);
  },
  methods: {
    updateTable() {
      let first = this.riskLevelList[0];
      this.riskLevelList.shift();
      this.riskLevelList.push(first);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    //得到基于项目级展示当前未整改的高风险隐患列表
    getPrjRiskLevelList() {
      let data = this.$store.state.get_project.prj_risk_list;
      console.log(this.$store.state.get_project.prj_risk_list)
      console.log(data)
      //  风险等级对应情况
      //  1：低风险； 2：中风险； 3：高风险
      let dataArray = []
      for (let i in data) {
        let obj = {
          description: ''
        }
        obj.description = data[i]
        dataArray.push(obj)
      }
      console.log(dataArray)
      this.riskLevelList = dataArray
    },
    getPrjImage() {
      // let data = this.$store.state.get_project.prj_image;
      // console.log(this.$store.state.get_project.prj_image)
      // console.log(data)
      // this.img_list.push(data);
      //
      // console.log(this.img_list)
      // alert(this.img_list[0])
      this.img_list = this.$store.state.get_project.prj_image
    }
  },
  created() {
    this.$store.dispatch('get_project/getInitPrjRisk')
    this.$store.dispatch('get_project/getInitProjectImage')
  }
}
</script>

<style scoped>

</style>