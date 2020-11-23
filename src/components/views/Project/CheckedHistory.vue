<template>
  <div class="grid-content bg-purple">
    <div style="display: none">
      {{ getPrjNumberChange }}
    </div>
    <div class="level4">
      <span>历次检查隐患数量变化</span>
    </div>
    <div id="history_chart" style="height: 400px; width: 350px"> </div>
  </div>
</template>

<script>
export default {
  name: "CheckedHistory",
  // computed: {
  //   getPrjNumberChange() {
  //     let data = this.$store.state.get_project.prj_number_change;
  //     console.log(data)
  //     let arr = []
  //     for (let i in data) {
  //       let obj = {
  //         value: 0,
  //         name: ''
  //       }
  //       obj.name = i;
  //       obj.value = data[i].risk_number
  //       arr.push(obj)
  //     }
  //     console.log(arr)
  //     let option = {
  //       tooltip: {},
  //       dataset: {
  //         dimensions: ['name', 'count'],
  //         source: arr
  //       },
  //       xAxis: {
  //         type: 'category',
  //         axisLabel: {
  //           interval: 0,
  //           rotate: 30
  //         },
  //         axisLine: {
  //           lineStyle: {
  //             color: '#ffffff',
  //             fontSize: 8
  //           }
  //         }
  //       },
  //       yAxis: {
  //         axisLine: {
  //           lineStyle: {
  //             color: '#ffffff'
  //           }
  //         }
  //       },
  //       series: [
  //         {
  //           type: 'bar',
  //           itemStyle: {
  //             color: new echarts.graphic.LinearGradient(
  //                 0, 0, 0, 1,
  //                 [
  //                   {offset: 0, color: '#3477fb'},
  //                   {offset: 0.5, color: '#2d55a9'},
  //                   {offset: 1, color: '#253054'}
  //                 ]
  //             )
  //           },
  //           emphasis: {
  //             itemStyle: {
  //               color: new echarts.graphic.LinearGradient(
  //                   0, 0, 0, 1,
  //                   [
  //                     {offset: 0, color: '#2378f7'},
  //                     {offset: 0.7, color: '#2378f7'},
  //                     {offset: 1, color: '#83bff6'}
  //                   ]
  //               )
  //             }
  //           },
  //         }
  //       ]
  //     };
  //     return option
  //   }
  // },
  // updated() {
  //   this.drawBarChart()
  // },
  // mounted() {
  //   this.drawBarChart();
  // },
  // methods: {
  //   drawBarChart() {
  //     let myChart = this.$echarts.init(document.getElementById('history_chart'))
  //     // 使用刚指定的配置项和数据显示图表。
  //     myChart.setOption(this.getData);
  //   }
  // }
}
</script>

<style scoped>

</style>