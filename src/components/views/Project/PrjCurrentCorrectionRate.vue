<template>
  <el-container>
    <el-header>
      <div style="display: none">
        {{ getRate }}
      </div>
      <div class="level4" style="padding-top: 20px">
        <span>当前整改率</span>
      </div>
      <div id="current_correction_rate" class="cur_level1" style="padding-top: 10px">
        <span>{{ current_correction_rate }}</span>
      </div>
      <div class="cur_level2" style="padding-top: 10px">
        <span>整改率</span>
      </div>
    </el-header>
    <el-main>
      <div id="dashboard" style="height: 180px; width: 100%; padding-top: 50px"></div>
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
      let rate = this.$store.state.get_project.prj_rectification;
      let val = parseFloat(rate).toFixed(2)
      this.current_correction_rate = val + '%'
      let option = {
        series: [
          {
            name: '整改情况',
            type: 'gauge',
            radius: '100%',
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
      myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
    }
  },
  created() {
    this.$store.dispatch('get_project/getInitProjectRectification')
  }
}
</script>

<style scoped>
.cur_level1 {
  font-size: 30px;
  font-family: Avenir;
  color: #ffffff;

}

.cur_level2 {
  font-size: 13px;
  font-family: "Microsoft YaHei";
  color: #ffffff;
}
</style>