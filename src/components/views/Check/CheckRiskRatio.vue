<template>
  <el-card class="box-card boundary-C" shadow="never"
           style="background-color: transparent; height: 80%; left: 10%; top: 10%">
    <div style="display: none">
      {{ getCheckHistoryPerception }}
    </div>
    <div class="level4">
      <span>本次检查隐患专业占比</span>
    </div>
    <div id="pie2_2" style="height: 100%; width: 100%"></div>
    <!--          本次检查累计隐患专业占比 饼图-->
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "CheckRiskRatio",
  computed: {
    getCheckHistoryPerception() {
      let data = this.$store.state.get_check.check_risk_ratio;
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
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                // shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal: {
                color: function (params) {
                  var colorList = [
                    {
                      c1: '#fce5ca',
                      c2: '#ff9d62'
                    },
                    {
                      c1: '#63e587',
                      c2: '#5fe2e4'
                    },
                    {
                      c1: '#db6400',
                      c2: '#ceb895'
                    },
                    {
                      c1: '#e8e87e',
                      c2: '#a1a170'
                    },
                    {
                      c1: '#007965',
                      c2: '#b1e2da'
                    },
                    {
                      c1: '#7c9473',
                      c2: '#d6efc7'
                    }];
                  return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: colorList[params.dataIndex].c1
                  }, {
                    offset: 1,
                    color: colorList[params.dataIndex].c2
                  }])
                }
              }
            },

            // emphasis: {
            //   itemStyle: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //   },
            // }
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
      let myChart = this.$echarts.init(document.getElementById('pie2_2'))
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.getCheckHistoryPerception);
      myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("pie2_2"), element => {
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

</style>