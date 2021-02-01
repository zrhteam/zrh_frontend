<template>
  <el-card class="box-card boundary-C" shadow="never"
           style="background-color: transparent; height: 90%; left: 10%; top: 10%">
    <div class="level4" style="padding-top: 15px">
      <span>项目综合&专业风险指数排名</span>
    </div>
<!--    <div>-->
      <div id="mydiv1" style="font-color: black">
        <div style="display: none">
          {{ getIndexHistogram }}
        </div>
      </div>
      <div id="number_histogram1" style="height: 80%; width: 100%"></div>
<!--    </div>-->
  </el-card>
</template>

<script>
import * as d3 from "d3/dist/d3";

export default {
  name: "ProjectIndex",

  computed: {
    // getNumberHistogram() {
    getIndexHistogram() {
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
      arr.sort(this.sortNumber('count', true))
      console.log(arr)
      return arr
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
      let myChart = this.$echarts.init(document.getElementById('number_histogram1'))
      // 使用刚指定的配置项和数据显示图表。
      let arr = this.getIndexHistogram
      let option = {
        tooltip: {},
        dataset: {
          dimensions: ['name', 'count'],
          source: arr
        },
        xAxis: {type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 20,
            textStyle: {
              fontSize: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              fontSize: 6
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
      myChart.setOption(option);
      myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
    },
    sortNumber(attr, rev){
      if(rev == undefined) {
        rev = 1;
      }else {
        rev = (rev)? 1 : -1;
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