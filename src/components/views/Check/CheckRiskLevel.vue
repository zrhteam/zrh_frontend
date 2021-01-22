<template>
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 49%; margin: 0px 5px 5px 5px">
    <div style="display: none">
      {{ getCheckRiskLevelData }}
    </div>
    <div class="text item level4" style="padding-top: 15px; padding-bottom: 15px">
      <span>历次检查累计发现隐患数量</span>
    </div>
    <div id='check_risk_level' style="height: 80%; width: 100%;"></div>
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";
import {bar_option} from "@/utils/constants";

export default {
  name: "CheckRiskLevel",
  data() {
    return {}
  },
  computed: {
    getCheckRiskLevelData() {
      let data = this.$store.state.get_check.check_risk_data;
      console.log("累计", data)
      let data_length = Object.keys(data);
      if (!data_length.length) {
        this.PrjRiskLevelData = []
      }
          // console.log(this.$store.state.get_project.prj_risk_data)
          // if(!data.length) {
          //   // this.PrjRiskLevelData = []
          // }
          // else {
          //  风险等级对应情况
      //  1：低风险； 2：中风险； 3：高风险
      else {
        let obj1 = {
          name: '低风险',
          count: 0
        }
        let obj2 = {
          name: '中风险',
          count: 0
        }
        let obj3 = {
          name: '高风险',
          count: 0
        }
        // let obj = {
        //   risk: '列总计',
        //   num: 0
        // }
        let dataArray = []
        for (let i in data) {
          for (let j in data[i]) {
            if (j == 1) {
              obj1.count += data[i][j]
            }
            if (j == 2) {
              obj2.count += data[i][j]
            }
            if (j == 3) {
              obj3.count += data[i][j]
            }
          }
        }
        dataArray.push(obj3)
        dataArray.push(obj2)
        dataArray.push(obj1)
        // obj.num = obj1.num + obj2.num + obj3.num
        // dataArray.push(obj)
        // console.log(dataArray)
        return dataArray
      }
    }
  },
  updated() {
    this.drawBarChart()
  },
  // mounted() {
  //   this.drawBarChart();
  // },
  methods: {
    drawBarChart() {
      let myChart = this.$echarts.init(document.getElementById('check_risk_level'))
      let arr = this.getCheckRiskLevelData
      bar_option["dataset"]["source"] = arr
      myChart.setOption(bar_option);
      myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById('check_risk_level'), element => {
        _this.$nextTick(() => {
          myChart.resize();
        });
      });
    }
  }
}
</script>

<style scoped>

</style>