<template>
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%;">
    <div class="map_container" style="height: 100%; width: 100%; z-index:1; background-color: transparent">
      <!--        <div id="map_5"-->
      <!--             style="pointer-events:inherit; height: 100%; width: 100%;"></div>-->
      <div id="map" :style="{height:'100%',width:'100%'}" ref="map_5" @contextmenu="returnCountry()"></div>
    </div>
  </el-card>
</template>

<script>
import echarts from "echarts";
import 'echarts/map/js/china'

export default {
  name: "HeadquarterMap",
  props: ["userJson", 'projectInfo'],
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    setTimeout(() => {
      let mainHeight = this.$refs.map_5.offsetHeight
      $("#map").css("height", mainHeight + "px");
      this.$nextTick(() => {
        this.chinaConfigure();
      })
    })
  },
  watch: {
    projectInfo() {
      this.chinaConfigure()
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    returnCountry() {
      this.$options.methods.chinaConfigure();
    },
    chinaConfigure() {
      // let myChart = echarts.init(this.$refs.map_5); //这里是为了获得容器所在位置
      let myChart = echarts.init(document.getElementById("map")); //这里是为了获得容器所在位置
      window.onresize = myChart.resize("auto", "auto");

      initEcharts("china");

      const seriesList = []
      let obj = {
        data: []
      }
      obj.data = this.projectInfo
      seriesList.push(obj)
      debugger
      // 图标
      const series = seriesList.map(v => {
        return {
          type: "scatter", //配置显示方式为用户自定义
          coordinateSystem: "geo",
          data: v.data,
          color: '#f79646'
        };
      });

      function initEcharts(map) {
        myChart.setOption({ // 进行相关配置
          opacity: 0,
          tooltip: {
            trigger: "item",
            formatter: function (params) {
              const name = params.data.name;
              return `<div>${name}</div>`
            }
          }, // 鼠标移到图里面的浮动提示框
          geo: { // 这个是重点配置区
            map: map, // 表示中国地图
            roam: true,
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: '#ffffff',
                  fontSize: 8
                },
              }
            },
            itemStyle: {
              normal: {
                // borderColor: 'rgba(0, 0, 0, 0.2)'
                areaColor: "#0d0059",
                borderColor: "#389dff",
                borderWidth: 0.5,
                fontsize: 8
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
          series,
        })
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }

      initEcharts("china");

      // 点击触发
      myChart.on("click", param => {
        if(typeof(param.data) != "undefined") {
          var project_name = param.data.name;
          this.$router.push({path: '/prj_data_analysis'});
          let data = {
            label: project_name
          }
          let node = {
            level: 3
          }
          this.handleTreeNodeClick(data, node)
          this.$store.commit('get_project/changePrjName', {prj_name: project_name})
        }
      });
    },
  }
}
</script>

<style scoped>

</style>