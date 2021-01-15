<template>
<el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 49%; margin: 0px 5px 5px 5px">
    <div style="display: none">
      {{ getPrjRiskLevelData }}
    </div>
    <div class="text item level4" style="padding-top: 15px; padding-bottom: 15px">
      <span>历次检查累计发现隐患数量</span>
    </div>
    <div id = 'check_risk_level' style="height: 80%; width: 100%;"></div>
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";

export default {
name: "CheckRiskLevel",
  computed: {
    getPrjRiskLevelData() {
      let data = this.$store.state.get_check.check_risk_data;
      // console.log("累计", data)
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
          risk: '低风险',
          num: 0
        }
        let obj2 = {
          risk: '中风险',
          num: 0
        }
        let obj3 = {
          risk: '高风险',
          num: 0
        }
        // let obj = {
        //   risk: '列总计',
        //   num: 0
        // }
        let dataArray = []
        for (let i in data) {
          for (let j in data[i]) {
            if (j == 1) {
              obj1.num += data[i][j]
            }
            if (j == 2) {
              obj2.num += data[i][j]
            }
            if (j == 3) {
              obj3.num += data[i][j]
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
  mounted() {
    this.drawBarChart();
  },
  methods: {
    drawBarChart(){
      let myChart = this.$echarts.init(document.getElementById('check_risk_level'))
      let arr = this.getPrjRiskLevelData
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
              label:{
                show: true,
                position: 'top',
                textStyle: {
                  fontSize: '7px',
                  color: '#666'
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
      }else{

      }
      myChart.resize();
      window.addEventListener('resize', function (){
        myChart.resize();
      })
      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById('check_risk_level'), element=>{
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