<template>
  <div>
    <div style="display: none">
      {{ getPrjNearestPerception }}
    </div>
    <!--          最近一次检查隐患专业占比 饼图-->
    <div>
      <div class="level4" style="padding-top: 15px">
        <span>最近一次检查隐患专业占比</span>
      </div>
      <div id="pie" style="height: 370px; width: 100%"></div>
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
      console.log(data)
      let arr = []
      for (let i in data.major_list) {
        let obj = {
          value: 0,
          name: ''
        }
        obj.name = i;
        obj.value = data.major_list[i]
        arr.push(obj)
      }
      console.log(arr)
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