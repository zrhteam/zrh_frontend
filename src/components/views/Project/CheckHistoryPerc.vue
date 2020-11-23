<template>
  <div>
    <div style="display: none">
      {{ getPrjHistoryPerception }}
    </div>
    <div class="level4">
      <span>历次检查隐患专业占比</span>
    </div>
    <div id="pie2" style="height: 300px; width: 400px"></div>
    <!--          历次检查累计隐患专业占比 饼图-->
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "CheckHistoryPerc",-->
<!--  computed: {-->
<!--    getPrjHistoryPerception() {-->
<!--      let data = this.$store.state.get_project.prj_history_prec;-->
<!--      debugger-->
<!--      console.log(data)-->
<!--      let arr = []-->
<!--      for (let i in data) {-->
<!--        let obj = {-->
<!--          value: 0,-->
<!--          name: ''-->
<!--        }-->
<!--        obj.name = i;-->
<!--        obj.value = data[i].risk_number-->
<!--        arr.push(obj)-->
<!--      }-->
<!--      console.log(arr)-->
<!--      let option = {-->
<!--        tooltip: {-->
<!--        },-->
<!--        color: ['#5182e4', '#3fb27e', '#9bcc66', '#f7cb4a', '#00b9ff', '#03a1ea'],-->
<!--        series: [-->
<!--          {-->
<!--            type: 'pie',-->
<!--            radius: '55%',-->
<!--            center: ['50%', '50%'],-->
<!--            label: {-->
<!--                normal: {-->
<!--                    show: true,-->
<!--                    formatter: '{b}: {c}({d}%)' //自定义显示格式(b:name, c:value, d:百分比)-->
<!--                }-->
<!--            },-->
<!--            data: arr,-->
<!--            emphasis: {-->
<!--              itemStyle: {-->
<!--                shadowBlur: 10,-->
<!--                shadowOffsetX: 0,-->
<!--                shadowColor: 'rgba(0, 0, 0, 0.5)'-->
<!--              }-->
<!--            }-->
<!--          }-->
<!--        ]-->
<!--      };-->
<!--      return option-->
<!--    }-->
<!--  },-->
<!--  updated() {-->
<!--    this.drawPieChart()-->
<!--  },-->
<!--  mounted() {-->
<!--    this.drawPieChart();-->
<!--  },-->
<!--  methods: {-->
<!--    drawPieChart() {-->
<!--      let myChart = this.$echarts.init(document.getElementById('pie2'))-->
<!--      // 使用刚指定的配置项和数据显示图表。-->
<!--      myChart.setOption(this.getPrjHistoryPerception);-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->