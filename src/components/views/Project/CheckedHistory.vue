<template>
  <el-card class="box-card boundary-C" shadow="never"
           style="background-color: transparent; height: 80%; left: 10%; top: 10%">
    <div style="display: none">
      {{ getPrjHistory }}
    </div>
    <div class="level4">
      <span>历次检查隐患数量变化</span>
    </div>
    <div id="history_chart" style="height: 100%; width: 100%; display: block"></div>
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "CheckedHistory",
  computed: {
    getPrjHistory() {
      let data = this.$store.state.get_project.prj_number_change;
      // console.log('licichange', data)
      let arr = []
      for (let i in data) {
        let obj = {
          count: 0,
          name: ''
        }
        obj.name = data[i].start_time;
        obj.count = data[i].risk_num
        arr.push(obj)
      }
      // console.log(arr)
      arr.sort(this.sortNumber('count', true))
      return arr
    }
  },

  updated() {
    this.drawBarChart()
  },

  mounted() {
    this.drawBarChart();
  },
  methods: {
    drawBarChart() {
      // document.getElementById('history_chart').innerHTML = ''
      let myChart = this.$echarts.init(document.getElementById('history_chart'))
      // 使用刚指定的配置项和数据显示图表。
      let arr = this.getPrjHistory
      if (arr.length) {
        let option = {
          tooltip: {
          // formatter: '{b}:{c} ({d}%)'
        },
          dataset: {
            dimensions: ['name', 'count'],
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
                  color: '#fff'
                },
              },
              emphasis: {
                itemStyle: {
                  color: '#40abc4'
                  //     new echarts.graphic.LinearGradient(
                  //     0, 0, 0, 1,
                  //     [
                  //       {offset: 0, color: '#2378f7'},
                  //       {offset: 0.7, color: '#2378f7'},
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
      } else {
        // document.getElementById('history_chart').innerHTML = ''
        // document.getElementById('history_chart').innerHTML = '<div style="color: #909399; text-align: center; vertical-align: center">暂无数据</div>'
      }
      myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
       const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("history_chart"), element => {
        _this.$nextTick(() => {
          //监听到事件后执行的业务逻辑
          myChart.resize();
        });
      });
    },
    sortNumber(attr, rev) {
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = (rev) ? 1 : -1;
      }

      return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      }
    }
  }
}
</script>

<style scoped>

</style>