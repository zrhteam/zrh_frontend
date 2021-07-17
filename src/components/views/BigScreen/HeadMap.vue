<template>
  <div class="map_container" style="height: 100%; width: 100%; z-index:1; background-color: transparent">
    <!--        <div id="map_5"-->
    <!--             style="pointer-events:inherit; height: 100%; width: 100%;"></div>-->
    <div id="map" :style="{height:'100%',width:'100%'}" ref="map_5" @contextmenu="returnCountry()"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import 'echarts/map/js/china'

export default {
  name: "HeadMap",
  props: ["userJson", "provinceInfo", "renderSign"],
  data() {
    return {
      arr: []
    }
  },
  mounted() {
    var timer = setTimeout(() => {
      let mainHeight = this.$refs.map_5.offsetHeight
      $("#map").css("height", mainHeight + "px");
      this.$nextTick(() => {
        this.chinaConfigure();
      })
    })
    clearTimeout(timer)
  },
  watch: {
    provinceInfo() {
      this.chinaConfigure()
    }
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
      obj.data = this.provinceInfo[0]
      seriesList.push(obj)

      obj = {
        data: []
      }
      obj.data = this.provinceInfo[1]
      seriesList.push(obj)
      // 图标
      const series = seriesList.map(v => {
        if (v.data[0].name == '隐患数量') {
          return {
            type: "scatter", //配置显示方式为用户自定义
            coordinateSystem: "geo",
            data: v.data,
            color: '#f79646',
            // symbol: 'pin',
            // symbolSize: 35,
          };
        }
        return {
          type: "scatter", //配置显示方式为用户自定义
          coordinateSystem: "geo",
          data: v.data,
          color: '#ff0000'
        };
      });

      function initEcharts(map) {
        myChart.setOption({ // 进行相关配置
          opacity: 0,
          tooltip: {
            trigger: "item",
            formatter: function (params) {
              const name = params.data.name;
              const value = params.data.value[2];
              return `<div>${name}：${value}</div>`
            }
          }, // 鼠标移到图里面的浮动提示框
          geo: { // 这个是重点配置区
            map: map, // 表示中国地图
            roam: true,
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: '#ffffff'
                }
              }
            },
            itemStyle: {
              normal: {
                // borderColor: 'rgba(0, 0, 0, 0.2)'
                areaColor: "#000000",
                borderColor: "#389dff",
                borderWidth: 1,
                fontsize: 8
              },
              emphasis: {
                areaColor: "#037399",
                borderColor: "#12991f",
                borderWidth: 5,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 4,
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
    },
  },
  destroyed() {
    window.removeEventListener("resize", () => {
      this.pieChart.resize();
    });
  }
}
</script>

<style scoped>

</style>