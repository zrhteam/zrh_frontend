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
import elementResizeDetectorMaker from "element-resize-detector";

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
              // borderWidth: 1,
              // borderColor: '#fff',
              shadowColor: '#fff',//默认透明
              shadowBlur: 5,
              offsetCenter: [0, '50%'],
              textStyle: {
                fontSize: 15,
                color: '#fff'
              }
            },
            axisLine: { //仪表盘轴线样式
              lineStyle: {
                width: 3,
                // splitNumber: 100,
                color: [[0.2, '#bb2205'], [0.8, '#1e90ff'], [1, 'lime']],
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            //分割线样式
            splitLine: {
              length: 25,//属性length控制线长
              lineStyle: {
                width: 3,
                color: '#fff',
                shadowColor: '#fff',
                shadowBlur: 10
              }

            },
            //坐标轴小标记
            axisLabel: {
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff',//默认透明
              shadowBlur: 10
            },
            //坐标轴小标记
            axisTick: {
              length: 15,
              lineStyle: {
                color: 'auto',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            //分隔线
            pointer: {
              shadowColor: '#fff',
              shadowBlur: 10
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
       const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("dashboard"), element => {
        _this.$nextTick(() => {
          //监听到事件后执行的业务逻辑
          myChart.resize();
        });
      });
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