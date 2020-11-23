<template>
  <div>
    <div style = "display: none">
      {{getData}}
    </div>
    <div id = "safety_index"> </div>
  </div>

</template>

<script>


export default {
  name: "SafetyIndexHistogram",
  computed: {
    getData() {

      let data = this.$store.state.get_region.safety_index;
      let arr = [];
      for (let i in data) {
        let obj = {
          name: '',
          count: 0
        }
        obj.name = j;
        obj.count = data[i].high_risk_count;
        arr.push(obj)
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
            rotate: 30
          }
        },
        yAxis: {},
        series: [
          {
            type: 'bar'
          }
        ]
      };
      return option
    },
  },
  updated() {
    this.myEcharts();
  },
  mounted() {
    this.myEcharts();
  },
  methods: {
    myEcharts(){
      //基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('safety_index'));
      //指定图表的配置项和数据
      // let option = {
      //   title: { text: '项目安全指数排名' },
      //   tooltip:{ },
      //   legend:{
      //     data: ['安全指数']
      //   },
      //   xAxis: {
      //     data: ['万达','万科','恒大']
      //   },
      //   yAxis: {},
      //   series: [{
      //     name: '',
      //     type: 'bar',
      //     data: [10, 20, 30]
      //   }]
      //
      // };
      myChart.setOption(this.getData);
    }
  }
}
</script>

<style scoped>
text{
  color: #000000;
}
</style>