<template>
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px">
    <!--           style="background-color: transparent; height: 49%; margin: 0px 5px 5px 5px">-->
    <div style="display: none">
      {{ getCheckRiskLevelYear }}
    </div>
    <div class="text item level4" style="padding-top: 15px; padding-bottom: 15px">
      <span>检查累计年隐患数量（2）</span>
    </div>
    <div id='check_level_year' style="height: 80%; width: 100%;"></div>
  </el-card>
</template>

<script>
import {bar_option} from "@/utils/constants";
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "CheckRiskLevelYear",
  data() {
    return {
      check_level_year: []
    }
  },
  computed: {
    getCheckRiskLevelYear() {
      this.getCheckLevelYear(this.$store.state.get_check.check_level_year)
    }
  },
  updated() {
    this.drawBarChart()
  },
  methods: {
    getCheckLevelYear(data) {
      let risk_level = ['risk_level', '高风险', '中风险', '低风险']
      if (this.check_level_year.length === 0) {
        this.check_level_year.push(risk_level)
      }
      for (let i in data) {
        let sub_arr = []
        sub_arr.push(i)
        for (let j in data[i]) {
          sub_arr.push(data[i][j])
        }
        this.check_level_year.push(sub_arr)
      }
    },
    drawBarChart() {
      let myChart = this.$echarts.init(document.getElementById('check_level_year'))
      let arr = this.check_level_year
      let option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: arr
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            type: 'bar',
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 0, 0],
              }
            },
            barMaxWidth: 40
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 0, 0],
              }
            },
            barMaxWidth: 40
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 0, 0],
              }
            },
            barMaxWidth: 40
          }
        ],
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 45,
            textStyle: {
              fontSize: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              fontSize: 8
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          },
          axisLabel: {
            // textStyle: {
            //   fontSize: 10
            // }
          }
        },
      };

      // bar_option["dataset"]["source"] = arr
      myChart.setOption(option);
      myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
    }
  }
}
</script>

<style scoped>

</style>