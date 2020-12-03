<template>
  <div class="grid-content bg-purple">
    <div class="level4">
      <span>项目累计高风险数量排名</span>
    </div>
    <div>
      <div style = 'display: none'>
        {{getHighRiskRank}}
      </div>
      <div id = 'risk_rank' style="height: 550px; width: 600px"></div>
    </div>

  </div>
</template>

<script>
//import RegionNumberHistogram from "@/components/views/functions/RegionNumberHistogram.vue";
export default {
  name: "Region3_3",
  //components: {RegionNumberHistogram}
  computed: {
    getHighRiskRank(){
      let data = this.$store.state.get_region.high_risk_rank
      let arr = []
      for (let i in data) {
        let obj = {
          name: '',
          count: 0
        }
        obj.name = i;
        obj.count = data[i]['high_risk_count'];
        arr.push(obj)
      }//for
      arr.sort(this.sortNumber('count', true))
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
            rotate: 20
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
              color: '#ffffff',
              fontSize: 8
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
            }
          }
        ]
      };
      return option
    },
  },
  updated() {
    this.drawBarChart();
  },
  mounted() {
    this.drawBarChart();
  },
  methods: {
    drawBarChart() {
      let myChart = this.$echarts.init(document.getElementById('risk_rank'))
      myChart.setOption(this.getHighRiskRank)
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