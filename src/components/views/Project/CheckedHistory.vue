<template>
  <div class="grid-content bg-purple">
    <div style="display: none">
      {{ getPrjHistory }}
    </div>
    <div class="level4">
      <span>历次检查隐患数量变化</span>
    </div>
    <div id="history_chart" style="height: 400px; width: 100%"></div>
  </div>
</template>

<script>
export default {
  name: "CheckedHistory",
  computed: {
    getPrjHistory() {
      let data = this.$store.state.get_project.prj_number_change;
      // console.log(data)
      let arr = []
      for (let i in data) {
        if (data[i].time != 'no record') {
          let flag = false
          for (let j in arr) {
            if (arr[j].name == data[i].time) {
              arr[j].count += data[i].risk_number
              flag = true
            }
          }
          if (flag == false) {
            let obj = {
              count: 0,
              name: ''
            }
            obj.name = data[i].time;
            obj.count = data[i].risk_number
            arr.push(obj)
          }
        }
      }
      console.log(arr)
      let option = {
        tooltip: {},
        dataset: {
          dimensions: ['name', 'count'],
          source: arr
        },
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
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                )
              }
            },
            barMaxWidth: 40
          }
        ]
      };
      return option
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
      let myChart = this.$echarts.init(document.getElementById('history_chart'))
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.getPrjHistory);
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