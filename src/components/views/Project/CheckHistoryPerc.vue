<template>
  <div>
    <div style="display: none">
      {{ getPrjHistoryPerception }}
    </div>
    <div class="level4" style="padding-top: 15px">
      <span>历次检查隐患专业占比</span>
    </div>
    <div id="pie2" style="height: 370px; width: 100%"></div>
    <!--          历次检查累计隐患专业占比 饼图-->
  </div>
</template>

<script>
export default {
  name: "CheckHistoryPerc",
  computed: {
    getPrjHistoryPerception() {
      let data = this.$store.state.get_project.prj_history_prec;
      // console.log(data)
      let arr_major = []
      for (let i in data) {
        for (let j in data[i].major_list) {
          let flag = false
          for (let k in arr_major) {
            if (j == arr_major[k].name) {
              arr_major[k].value += data[i].major_list[j]
              flag = true
            }
          }
          if (flag == false) {
            let obj = {
              value: 0,
              name: ''
            }
            obj.name = j;
            obj.value = data[i].major_list[j]
            arr_major.push(obj)
          }
        }
      }
      // console.log(arr_major)
      let option = {
        tooltip: {
          formatter: '{b}:{c} ({d}%)'
        },
        color: ['#5182e4', '#3fb27e', '#9bcc66', '#f7cb4a', '#00b9ff', '#03a1ea'],
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            label: {
              normal: {
                show: true,
                formatter: '{b}: {c}' //自定义显示格式(b:name, c:value, d:百分比)
              }
            },
            data: arr_major,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      return option
    }
  },
  updated() {
    this.drawPieChart()
  },
  mounted() {
    this.drawPieChart();
  },
  methods: {
    drawPieChart() {
      let myChart = this.$echarts.init(document.getElementById('pie2'))
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.getPrjHistoryPerception);
    }
  }
}
</script>

<style scoped>

</style>