<template>
  <el-card class="box-card boundary-C" shadow="never"
           style="background-color: transparent; height: 70%; margin: 40px 40px 40px 40px">
    <div style="display: none">
      {{ getRate }}
    </div>
    <div class="level4">
      <span>当前整改率</span>
    </div>
    <div id="current_correction_rate" class="cur_level1" style="text-align: left">
      <span>{{ current_correction_rate }}</span>
    </div>
    <div id="dashboard" style="height: 80%; width: 100%;"></div>
  </el-card>
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
                width: 10,
                // splitNumber: 100,
                color: [
                    [1, new echarts.graphic.LinearGradient(0, 0, 1, 0,[
                      {
                        offset: 0.2,
                        color: '#bb2205'
                      },
                      {
                        offset: 0.5,
                        color: '#e57733'
                      },
                      {
                        offset: 0.8,
                        color: '#f1e189'
                      },
                      {
                        offset: 1,
                        color: '#87b333'
                      }
                    ])]
                ]
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