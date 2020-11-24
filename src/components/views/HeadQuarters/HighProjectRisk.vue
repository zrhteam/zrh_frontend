<template>
  <div class="grid-content bg-purple-light">
    <div class="level4">
      <span>项目高风险数量排名</span>
    </div>
    <div>
      <!--      <div id="mydiv2">-->
      <div style="display: none">
        {{ getNumberHistogram }}
      </div>
      <!--        <svg></svg>-->
      <div id="number_histogram" style="height: 400px; width: 700px"></div>
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
// import * as d3 from "d3/dist/d3";

export default {
  name: "HighProjectRisk",
  computed: {
    getNumberHistogram() {
      let data = this.$store.state.get_headquarter.risk_number_rank
      let arr = []
      for (let i in data) {
        let obj = {
          name: '',
          count: 0
        }
        obj.name = i;
        obj.count = data[i]['high_risk_count'];
        arr.push(obj)
      }
      console.log(arr)
      let option = {
        tooltip: {},
        dataset: {
          dimensions: ['name', 'count'],
          source: arr
        },
        xAxis: {type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              fontSize: 8
            }
          }},
        yAxis: {axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          }},
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
                      {offset: 0, color: '#3477fb'},
                      {offset: 0.5, color: '#2d55a9'},
                      {offset: 1, color: '#253054'}
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
            }
          }
        ]
      };
      return option
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
      let myChart = this.$echarts.init(document.getElementById('number_histogram'))
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.getNumberHistogram);
    }
  }
}
</script>

<style scoped>

</style>