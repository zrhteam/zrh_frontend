<template>
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%;">
    <div class="map_container" style="height: 100%; width: 100%; z-index:1; background-color: transparent">
      <!--        <div id="map_5"-->
      <!--             style="pointer-events:inherit; height: 100%; width: 100%;"></div>-->
      <div id="map" :style="{height:'100%',width:'100%'}" ref="map_5"></div>
    </div>
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";
import echarts from "echarts";

export default {
  name: "HeadquarterMap",
  props: ["userJson"],
  data() {
    return {
      chart: null
    }
  },
  updated() {
    this.drawBarChart()
  },
  mounted() {
    setTimeout(() => {
      let mainHeight = this.$refs.map_5.offsetHeight
      $("#map").css("height", mainHeight + "px");
      this.$nextTick(() => {
        this.chinaConfigure();
        this.drawBarChart();
      })
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  }
  ,
  methods: {
    drawBarChart() {
      if (this.getNumberHistogram["dataset"]["source"].length != 0) {
        let myChart = this.$echarts.init(document.getElementById('number_histogram'))
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.getNumberHistogram);
        myChart.resize();
        window.addEventListener('resize', function () {
          myChart.resize();
        })
        const _this = this;
        const erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementById("risk_rank"), element => {
          _this.$nextTick(() => {
            //监听到事件后执行的业务逻辑
            myChart.resize();
          });
        });
      } else if ('number_histogram') {
        this.$nextTick(() => {
          const dom = document.getElementById('number_histogram')
          dom.innerHTML = '暂无数据'
          dom.style.color = '#ffffff'
          dom.style.fontSize = '14px'
          dom.removeAttribute("_echarts_instance_")
        })
      }
    }
    ,
    chinaConfigure() {
      let myChart = echarts.init(this.$refs.map_5); //这里是为了获得容器所在位置
      window.onresize = myChart.resize("auto", "auto");
      myChart.setOption({ // 进行相关配置
        opacity: 0,
        tooltip: {}, // 鼠标移到图里面的浮动提示框
        dataRange: {
          show: false,
          min: 0,
          max: 1000,
          text: ['High', 'Low'],
          realtime: true,
          calculable: true,
          color: ['orangered', 'yellow', 'lightskyblue']
        },
        geo: { // 这个是重点配置区
          map: 'china', // 表示中国地图
          roam: true,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: 'rgba(0,0,0,0.4)'
              }
            }
          },
          itemStyle: {
            normal: {
              // borderColor: 'rgba(0, 0, 0, 0.2)'
              areaColor: "#0d0059",
              borderColor: "#389dff",
              borderWidth: 0.5
            },
            emphasis: {
              areaColor: "#17008d",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 5,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        series: [{
          type: 'scatter',
          coordinateSystem: 'geo', // 对应上方配置
        },
          {
            name: '启动次数', // 浮动框的标题
            type: 'map',
            geoIndex: 0,
            data: [{
              "name": "北京",
              "value": 599
            }, {
              "name": "上海",
              "value": 142
            }, {
              "name": "黑龙江",
              "value": 44
            }, {
              "name": "深圳",
              "value": 92
            }, {
              "name": "湖北",
              "value": 810
            }, {
              "name": "四川",
              "value": 453
            }]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>