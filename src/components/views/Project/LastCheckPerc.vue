<template>
  <div>
    <div style="display: none">
      {{ getPrjNearestPerception }}
    </div>
    <!--          最近一次检查隐患专业占比 饼图-->
    <div>
      <div>
        <span>最近一次检查隐患专业占比</span>
      </div>
      <div id="pie" style="height: 300px; width: 400px"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LastCheckPerc",
  data() {
    return {
    }
  },
  computed: {
    getPrjNearestPerception() {
      let data = this.$store.state.get_project.prj_nearest_perception;
      let arr = []
      for (let i in data) {
        let obj = {
          value: 0,
          name: ''
        }
        obj.name = i;
        obj.value = data[i]
        arr.push(obj)
      }
      console.log(arr)
      let option = {
        tooltip: {
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            label: {
                normal: {
                    show: true,
                    formatter: '{b}: {c}({d}%)' //自定义显示格式(b:name, c:value, d:百分比)
                }
            },
            data: arr,
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
      let myChart = this.$echarts.init(document.getElementById('pie'))
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.getPrjNearestPerception);
    }
  }
}
</script>

<style scoped>

</style>