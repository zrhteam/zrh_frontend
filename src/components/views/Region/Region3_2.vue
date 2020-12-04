<template>
  <div class="grid-content bg-purple">
    <div class="level4" style="padding-top: 15px">
      <span>项目安全指数排名</span>
    </div>
    <div>
        <div style = "display: none">
          {{getSafetyIndexRank}}
        </div>
        <div id = "safety" style= "height: 550px; width: 600px"> </div>
        <!--                这里是写项目安全指数排名的柱状图-->
<!--        <SafetyIndexHistogram></SafetyIndexHistogram>-->
    </div>
  </div>
</template>

<script>
//import SafetyIndexHistogram from "@/components/views/functions/SafetyIndexHistogram.vue";

export default {
  name: "Region3_2",
  //components: {SafetyIndexHistogram},

  computed: {
    getSafetyIndexRank() {
      let option = {
        // color: ['#77b5b8'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow'}
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['石家庄万象城', '赣州万象城', '厦门万象城', '深圳万象城', '余姚万象城'],
            axisTick: {
              alignWithLabel: true
            },
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
          }
        ],
        yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#ffffff',
                  fontSize: 8
                }
              }
            }
        ],
        series: [{
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
          barWidth: '60%',
          data: [5, 7, 9, 11, 14, 15]
        }]
      }
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
    }
  },
  updated() {
    this.myEcharts();
  }
}
</script>

<style scoped>

</style>