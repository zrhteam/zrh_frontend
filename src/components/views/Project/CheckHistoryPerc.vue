<template>
  <el-card class="box-card boundary-C" shadow="never"
           style="background-color: transparent; height: 70%; margin: 40px 40px 40px 40px">
    <div style="display: none">
      {{ getPrjHistoryPerception }}
    </div>
    <div class="level4">
      <span>历次检查隐患专业占比</span>
    </div>
    <div id="pie2" style="height: 100%; width: 100%"></div>
    <!--          历次检查累计隐患专业占比 饼图-->
  </el-card>
</template>

<script>
export default {
  name: "CheckHistoryPerc",
  // data() {
  //   return {
  //     screenWidth: document.body.clientWidth,
  //   }
  // },
  computed: {
    getPrjHistoryPerception() {
      let data = this.$store.state.get_project.prj_history_prec;
      // console.log(data)
      let arr_major = []
      for (let i in data) {
        let obj = {
          value: 0,
          name: ''
        }
        obj.name = i;
        obj.value = data[i]
        arr_major.push(obj)
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
            radius: '60%',
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
    // console.log(this.screenWidth)
    // const that = this
    // window.onresize = () => {
    //   return (() => {
    //     window.screenWidth = document.body.clientWidth
    //     that.screenWidth = window.screenWidth
    //   })()
    // }
    this.drawPieChart();
  },
  methods: {
    drawPieChart() {
      let myChart = this.$echarts.init(document.getElementById('pie2'))
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.getPrjHistoryPerception);
      myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
    }
  }
}
</script>

<style scoped>

</style>