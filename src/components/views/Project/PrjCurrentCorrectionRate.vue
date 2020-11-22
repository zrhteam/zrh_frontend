<template>
  <el-container>
    <el-header>
      <div style="display: none">
        {{ getRate }}
      </div>
      <div>
        <span>当前整改率</span>
      </div>
      <div id="current_correction_rate">
        <span>{{ current_correction_rate }}</span>
      </div>
    </el-header>
    <el-main>
      <div id="dashboard" style="height: 200px; width: 300px"></div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "PrjCurrentCorrectionRate",
  data() {
    return {
      current_correction_rate: 0
    }
  },
  computed: {
    getRate() {
      this.current_correction_rate = this.$store.state.get_project.prj_rectification;
      let val = parseFloat(this.current_correction_rate).toFixed(2)
      let option = {
        series: [
          {
            name: '整改情况',
            type: 'gauge',
            detail: {
              formatter: '{value}%',
              textStyle: {
                fontSize: 15
              }
            },
            axisLine: { //仪表盘轴线样式
              lineStyle: {
                width: 10
              }
            },
            splitLine: { //分割线样式
              length: 10
            },
            data: [{value: val}]
          }
        ]
      };
      return option;
    }
  },
  updated() {
    this.drawDashboard()
  },
  mounted() {
    this.drawDashboard();
  },
  methods: {
    drawDashboard() {
      let myChart = this.$echarts.init(document.getElementById('dashboard'))
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.getRate);
    }
  },
  created() {
    this.$store.dispatch('get_project/getInitProjectRectification')
  }
}
</script>

<style scoped>
</style>