<template>
  <el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%; padding: 2%">
    <div style="display: none; ">
      {{ getRiskLevelData }}
    </div>
    <div class="text item level4" style="padding-top: 15px; padding-bottom: 10px">
      <span>隐患总量</span>
    </div>

    <div id='r_risk_level' style="height: 100%; width: 100%;"></div>
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "Region1_4",
  // data() {
  //   return {
  //     riskLevelData: []
  //   }
  // },
  computed: {
    getRiskLevelData() {
      let data = this.$store.state.get_region.risk_level_data;
      console.log(this.$store.state.get_region.risk_level_data)
      //console.log(data)
      //风险等级对应情况
      //1: 低风险，2：中风险，3：高风险
      let dataArray = []
      for (let i in data) {
        let obj = {
          risk: ' ',
          num: 0
        }
        if (i == 1) {
          obj.risk = '低风险'
          obj.num = data[i]
        }
        if (i == 2) {
          obj.risk = '中风险'
          obj.num = data[i]
        }
        if (i == 3) {
          obj.risk = '高风险'
          obj.num = data[i]
        }
        dataArray.push(obj)
        //console.log(dataArray)
      }//for

      // let obj = {
      //   risk: '风险',
      //   num: 0
      // }
      // if (dataArray.length == 3) {
      //   obj.risk = '列总计'
      //   obj.num = dataArray[0].num + dataArray[1].num + dataArray[2].num
      //   dataArray.push(obj)
      //   console.log(dataArray)
      // }
      return dataArray

    },
  },
  updated() {
    this.drawBarChart()
  },
  mounted() {
    this.drawBarChart();
  },
  methods: {
    drawBarChart() {
      let myChart = this.$echarts.init(document.getElementById('r_risk_level'))
      let arr = this.getRiskLevelData
      if (arr.length) {
        let option = {
          tooltip: {
            // trigger:'item',
            // formatter: '{b}:{d}%'
          },
          dataset: {
            dimensions: ['risk', 'num'],
            source: arr
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 0,
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
            }
          },
          series: [
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [10, 10, 0, 0],
                  color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#77b5b8'},
                        // {offset: 0.5, color: '#1f77a0'},
                        {offset: 1, color: '#107480'}
                      ]
                  )
                }
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  fontSize: '7px',
                  color: '#fff'
                },
                // formatter: '{c}',
              },
              emphasis: {
                itemStyle: {
                  color: '#40abc4'
                  //     new echarts.graphic.LinearGradient(
                  //     0, 0, 0, 1,
                  //     [
                  //       {offset: 0.7, color: '#174489'},
                  //       {offset: 1, color: '#83bff6'}
                  //     ]
                  // )
                }
              },
              barMaxWidth: 40
            }
          ]
        };
        myChart.setOption(option);
        myChart.resize();
        window.addEventListener('resize', function () {
          myChart.resize();
        })
        const _this = this;
        const erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementById('r_risk_level'), element => {
          _this.$nextTick(() => {
            myChart.resize();
          });
        });
      }else if (document.getElementById("r_risk_level")) {
        this.$nextTick(() => {
          const dom = document.getElementById(document.getElementById("r_risk_level"))
          dom.innerHTML = '暂无数据'
          dom.style.color = '#ffffff'
          dom.style.fontSize = '14px'
          dom.removeAttribute("_echarts_instance_")
        })
      }

    }
  }
}
</script>

<style scoped>
/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell {

  background-color: transparent;
}

/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {

  background-color: transparent;

}
</style>