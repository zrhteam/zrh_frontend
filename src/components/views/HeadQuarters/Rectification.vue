<template>
  <el-card class="box-card boundary-C" shadow="never"
           style="background-color: transparent; height: 90%; left: 10%; top: 10%">
    <div class="level13" style="padding-top: 10px; padding-bottom: 10px">
      <span>总部整改率</span>
    </div>
    <div
        style="color: rgb(247, 10, 10); font-family: Avenir;
        font-weight: bold; font-style: normal; line-height: normal; font-size: 30px;">
      {{ getRectificationRate }}
    </div>
    <div id="head_dashboard" style="height: 80%; width: 100%"></div>
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "Rectification",
  // data() {
  //
  // },
  computed: {
    getRectificationRate() {
      let rate = this.$store.state.get_headquarter.rectification
      console.log('整改率', rate)
      let val = parseFloat(rate).toFixed(2)
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
                fontSize: 25,
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
            title: {
              textStyle: {
                fontWeight: 'bolder',
                fontSize: 20,
                fontStyle: 'italic',
                color: '#fff',
                shadowBlur: 10
              }
            },
            data: [{value: val, name: '整改率'}]
          }
        ]
      };
      return option;
      // console.log(this.$store.state.get_headquarter.rectification)
      // return this.$store.state.get_headquarter.rectification
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
      let myChart = this.$echarts.init(document.getElementById('head_dashboard'))
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.getRectificationRate);
      myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("head_dashboard"), element => {
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
.level13 {
  font-size: 16px;
  font-family: "Microsoft YaHei";
  color: #ffffff;
}

.plus_top {

}
</style>