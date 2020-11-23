<template>
  <div class="grid-content bg-purple">
    <div style="text-align: center">
      <span>项目安全指数排名</span>
    </div>
    <div>
      <div id="mydiv3" style="font-color: black">
        <div style = "display: none">
          {{getData}}
        </div>
        <div id = "safety_index"> </div>
        <!--                这里是写项目安全指数排名的柱状图-->
<!--        <SafetyIndexHistogram></SafetyIndexHistogram>-->
      </div>
    </div>
  </div>
</template>

<script>
//import SafetyIndexHistogram from "@/components/views/functions/SafetyIndexHistogram.vue";

export default {
  name: "Region3_2",
  //components: {SafetyIndexHistogram},
  data(){
    return{
      high_risk: ''
    }
  },
  computed: {
    getData() {
      let data = this.$store.state.get_region.safety_index;
      console.log(data)
      let arr = [];
      for (let i in data) {
        let obj = {
          name: '',
          count: 0
        }
        obj.name = j;
        obj.count = data[i];
        arr.push(obj)
      }
      this.high_risk = arr
      console.log(this.high_risk)
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

      myChart.setOption(this.getData);
    }
  }
}
</script>

<style scoped>

</style>