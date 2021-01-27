<template>
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 49%; margin: 0px 5px 5px 5px">
<!--    <div style="display: none">-->
<!--      {{ getPrjRiskLevelData }}-->
<!--    </div>-->
    <div class="text item level4" style="padding-top: 15px; padding-bottom: 15px">
      <span>项目年隐患数量（3）</span>
    </div>
    <div id='prj_level_year' style="height: 80%; width: 100%;"></div>
  </el-card>
</template>

<script>
import {bar_option} from "@/utils/constants";
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "PrjRiskLevelYear",
  data() {
    return {
      prj_level_year: []
    }
  },
  mounted() {
    let data = this.$store.state.get_project.prj_level_year;
    console.log(data)
  },
  updated() {
    this.drawBarChart()
  },
  methods: {
    drawBarChart(){
      let myChart = this.$echarts.init(document.getElementById('risk_level_year'))
      let arr = this.prj_level_year
      bar_option["dataset"]["source"] = arr
      myChart.setOption(bar_option);
      myChart.resize();
      window.addEventListener('resize', function (){
        myChart.resize();
      })
      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById('risk_level_year'), element=>{
        _this.$nextTick(() => {
          myChart.resize();
        });
      });
    }
  },
  created() {
  }
}

</script>

<style scoped>

</style>