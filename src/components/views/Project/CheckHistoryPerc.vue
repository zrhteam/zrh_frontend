<template>
  <el-card class="box-card-t" shadow="never"
           style="background-color: transparent; height: 100%; margin-top: 2%">
    <div style="display: none;">
      {{ getPrjHistoryPerception }}
    </div>
    <div class="level4">
      <span>不同专业隐患数量</span>
    </div>
    <div id="pie2" style="height: 95%; width: 100%"></div>
    <!--          历次检查累计隐患专业占比 饼图-->
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";

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
        legend: {
          type: "scroll",
          orient: 'vertical',
          top: 20,
          right: '2%',
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          data: arr_major.name
        },

        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            label: {
              normal: {
                show: true,
                color: '#fff',
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
                  let colorList = [
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
                    color: colorList[params.dataIndex % colorList.length].c1
                  }, {
                    offset: 1,
                    color: colorList[params.dataIndex % colorList.length].c2
                  }])
                }
              }
            },

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
      if (this.getPrjHistoryPerception["series"][0]["data"].length != 0) {
        let myChart = this.$echarts.init(document.getElementById('pie2'))
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.getPrjHistoryPerception);
        myChart.resize();
        window.addEventListener('resize', function () {
          myChart.resize();
        })
        const _this = this;
        const erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementById("pie2"), element => {
          _this.$nextTick(() => {
            //监听到事件后执行的业务逻辑
            myChart.resize();
          });
        });
      }else if (document.getElementById("pie2")) {
          this.$nextTick(() => {
            const dom = document.getElementById(document.getElementById("pie2"))
            dom.innerHTML = '暂无数据'
            dom.style.color = '#ffffff'
            dom.style.fontSize = '14px'
            dom.removeAttribute("_echarts_instance_")
          })
        }
    }
  }
}
</script>

<style scoped>

</style>