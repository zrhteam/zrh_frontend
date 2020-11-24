<template>
  <div class="grid-content bg-purple">
    <div class="level4">
      <span>项目安全指数排名</span>
    </div>
    <div>
        <div style = "display: none">
          {{getSafetyIndexRank}}
        </div>
        <div id = "safety" style= "height: 400px; width: 300px"> </div>
        <!--                这里是写项目安全指数排名的柱状图-->
<!--        <SafetyIndexHistogram></SafetyIndexHistogram>-->
    </div>
  </div>
</template>

<script>
//import SafetyIndexHistogram from "@/components/views/functions/SafetyIndexHistogram.vue";

export default {
  name: "Region3_2",
  props: ['name', 'count'],
  //components: {SafetyIndexHistogram},
  data(){
    return{
      safetyIndex: [],
    }
  },

  computed: {
    getSafetyIndexRank() {
      // let data = this.$store.state.get_region.safety_index
      // console.log('the front end data:', this.$store.state.get_region.safety_index);
      // //console.log(data)
      // let arr = [];
      // for (let i in data) {
      //   let obj = {
      //     name: '',
      //     count: 0
      //   }
      //   obj.name = i;
      //   obj.count = data[i]['high_risk_count'];
      //   arr.push(obj)
      // }//for
      // this.safetyIndex = arr
      // //this.high_risk = arr
      // console.log(arr)
      //console.log(this.high_risk)
      let option = {
        tooltip: {},
        dataset: {
          dimensions: ['name', 'count'],
          source: this.safetyIndex
        },
        xAxis: {
          type: 'category',
          data: ['one', 'two', 'three']
          // axisLabel: {
          //   interval: 0,
          //   rotate: 30
          // },
          // axisLine: {
          //   lineStyle: {
          //     color: '#ffffff',
          //     fontSize: 8
          //   }
          // }
        },
        yAxis: {
          data: [1, 2, 3]
          // axisLine: {
          //   lineStyle: {
          //     color: '#ffffff'
          //   }
          // }
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
            },
          }
        ]
      };
      return option
    },
  },
  mounted() {
    // this.high_risk_rank = data
    this.myEcharts();
  },
  methods: {
    myEcharts(){
      //基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('safety'));
      //let myChart = echarts.init(document.getElementById('safety_index'));

      myChart.setOption(this.getHighRiskRank);
    }
  },
  updated() {
    this.myEcharts();
  }
}
</script>

<style scoped>

</style>