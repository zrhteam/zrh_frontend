<template>
  <el-card class="box-card boundary-C" shadow="never"
           style="background-color: transparent; height: 80%; left: 10%; top: 10%">
    <div class="level4" style="padding-top: 15px">
      <span>项目安全指数排名</span>
    </div>
    <div>
        <div style = "display: none">
          {{getSafetyIndexRank}}
        </div>
        <div id = "safety" style= "height: 500px; width: 100%" > </div>
        <!--                这里是写项目安全指数排名的柱状图-->
<!--        <SafetyIndexHistogram></SafetyIndexHistogram>-->
    </div>
  </el-card>
</template>

<script>
//import SafetyIndexHistogram from "@/components/views/functions/SafetyIndexHistogram.vue";

export default {
  name: "Region3_2",
  //components: {SafetyIndexHistogram},

  computed: {
    getSafetyIndexRank() {
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
            rotate: 30
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
            },
            barMaxWidth: 40
          }
        ]
      };
      return option
    }
  },
  mounted() {
    this.myEcharts();
  },
  methods: {
    myEcharts(){
      //基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('safety'));

        myChart.setOption(this.getSafetyIndexRank);
        myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
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

  },

  updated() {
    this.myEcharts();
  }
}
</script>

<style scoped>

</style>