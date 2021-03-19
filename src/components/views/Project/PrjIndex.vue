<template>
  <el-col :span="14" class="" style="height: 100%">
    <div class="map_container" style="height: 66%; width: 100%; z-index:1; background-color: transparent">
      <div :style="{height:'100%',width:'100%'}" ref="map_2"></div>
    </div>
    <div style="height: 30%; margin: 2%">
      <RiskLevelYear :context="{title:'项目年隐患数量', id:'prj_level_year'}"></RiskLevelYear>
    </div>
  </el-col>
</template>

<script>
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
import elementResizeDetectorMaker from 'element-resize-detector'
import echarts from "echarts";

export default {
  name: "PrjIndex",
  components: {
    RiskLevelYear
  },
  props: ["userJson"],
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chinaConfigure();
  },
  methods: {
    chinaConfigure() {
      console.log(this.userJson)
      let myChart = echarts.init(this.$refs.map_2); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
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
    },
  }
}
</script>

<style scoped>
#map_1 {
  width: 100%;
  height: calc(100vh);
}
</style>