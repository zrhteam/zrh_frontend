<template>
  <div class="grid-content bg-purple">
    <div class="level4">
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
        color: ['#3371db'],
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
            }
          }
        ],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          type: 'bar',
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