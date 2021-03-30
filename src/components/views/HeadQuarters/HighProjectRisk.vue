<template>
  <el-col :span="10" class="" style="height: 100%">
    <!--    <el-card class="box-card " shadow="never"-->
    <!--             style="background-color: transparent; height: 67%; margin: 0px 5px 5px 5px">-->
    <!--          放地图-->
    <div class="map_container" style="height: 66%; width: 100%; z-index:1; background-color: transparent">
      <!--        <div id="map_5"-->
      <!--             style="pointer-events:inherit; height: 100%; width: 100%;"></div>-->
      <div :style="{height:'100%',width:'100%'}" ref="map_5"></div>
    </div>
    <!--    </el-card>-->
    <!--每个项目历次检查的指数，放到项目级默认下的地图下面-->
    <el-card class="box-card-t " shadow="never"
             style="background-color: transparent; height: 30%; margin: 2%">
      <div class="level4" style="display: block; margin-top: 0.5%">
        <span>各区域高风险数量</span>
      </div>
      <!--      <div id="mydiv2">-->
      <div style="display: none">
        {{ getNumberHistogram }}
      </div>
      <!--        <svg></svg>-->
      <div id="number_histogram" style="height: 90%; width: 100%"></div>
      <!--      </div>-->

    </el-card>
  </el-col>

</template>

<script>
// import * as d3 from "d3/dist/d3";
import elementResizeDetectorMaker from "element-resize-detector";
// import * as d3 from "d3/dist/d3";
import echarts from "echarts";
//   import '../../node_modules/echarts/map/js/world.js'
import '../../../../node_modules/echarts/map/js/china.js'

export default {
  name: "HighProjectRisk",
  props: ["userJson"],
  data() {
    return {
      chart: null
    }
  },
  computed: {
    getNumberHistogram() {
      let data = this.$store.state.get_headquarter.risk_number_rank
      let arr = []
      for (let i in data) {
        let obj = {
          name: '',
          count: 0
        }
        obj.name = i;
        obj.count = data[i]['high_risk_count'];
        arr.push(obj)
      }
      arr.sort(this.sortNumber('count', true))
      let option = {
        dataset: {
          // dimensions: ['name', 'count'],
          source: arr
        },
         tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            }
        },
        grid: {containLabel: true},
        xAxis: {
          name: 'amount',
          axisLabel: {
            interval: 0,
            textStyle: {
              fontSize: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              fontSize: 8
            }
          }
        },
        yAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          },
        },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'count',
              // Map the "product" column to Y axis
              y: 'name'
            },
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [0, 10, 10, 0],
                color: new echarts.graphic.LinearGradient(
                    1, 0, 0, 0,
                    [
                      {offset: 0, color: '#23dbdc'},
                      // {offset: 0.5, color: '#1f77a0'},
                      {offset: 1, color: '#1860b4'}
                    ]
                )
              }
            },
            emphasis: {
              itemStyle: {
                color: '#40abc4'
              }
            },
            barMaxWidth: 40
          }
        ]
      };
      return option
    },
  },
  updated() {
    this.drawBarChart()
  },
  mounted() {
    // document.getElementById('map_2').style.display = 'none'
    // document.getElementById('map_5').style.display = 'block'
    // this.map = this.loadMap();//加载地图
    // let m = document.getElementById("map_5")
    // this.map_width = window.getComputedStyle(m).width
    // this.map_height = window.getComputedStyle(m).height
    //
    // this.svg = d3.select(this.$el).select('svg');
    // // this.svg = d3.select(this.map.getPanes().overlayPane).append("svg");
    //
    // let _this = this;
    // this.map.on('drag', (e) => {
    //   let center_position = this.map.latLngToContainerPoint([22, 107]);
    //
    //   if (this.locContainers) {
    //     this.locContainers.each(function (d) {
    //       let loc = _this.map.latLngToContainerPoint(d.locs)
    //       d3.select(this).attr('transform', 'translate(' + [loc.x, loc.y] + ')');
    //     })
    //   }
    // });
    //
    // this.map.on('move', (e) => {
    //   let center_position = this.map.latLngToContainerPoint([22, 107]);
    //   if (this.locContainers) {
    //     this.locContainers.each(function (d) {
    //       let loc = _this.map.latLngToContainerPoint(d.locs)
    //       d3.select(this).attr('transform', 'translate(' + [loc.x, loc.y] + ')');
    //     })
    //   }
    // });
    this.chinaConfigure();

    this.drawBarChart();
  }
  ,
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
    // loadMap() {//加载地图
    //   this.map = L.map("map_5", {
    //     center: [34, 107], // 地图中心
    //     zoom: 4, //缩放比列
    //     zoomControl: false, //禁用 + - 按钮
    //     // doubleClickZoom: false, // 禁用双击放大
    //     attributionControl: false // 移除右下角leaflet标识
    //   });
    //   let name = L.tileLayer(
    //       // 'https://api.mapbox.com/styles/v1/zhaiyzh/ckes4nsma2yls19op279otef9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemhhaXl6aCIsImEiOiJja2VyeWYzNTYwbHB1MnhzYTV0Z3didG1hIn0.forlrmKVYKXTsyP7voWu9Q'
    //       "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",//初始化一个 openlayers 地图
    //       // 天地图影像图层
    //   ).addTo(this.map);
    //   let p_data = this.$store.state.get_login.position
    //   // add a polygon
    //   // console.log("检查",p_data)
    //   let color = ['green', 'yellow', 'red', 'white','black']
    //   // for (let i = 0; i < p_data.length; i++) {
    //   //   var polygon = L.polygon(p_data[i], {
    //   //     color: color[i%5],
    //   //     fillColor: '#f03',
    //   //     fillOpacity: 0.5
    //   //   }).addTo(this.map);
    //   // }
    //   for (let i = 0; i < p_data.length; i++) {
    //     for (let j = 0; j < p_data[i].length; j++) {
    //       L.marker([p_data[i][j][0], p_data[i][j][1]]).addTo(this.map);
    //     }
    //   }
    //   // for (let i = 0; i < this.arr.length; i++) {
    //   //   L.marker([this.arr[i].lat, this.arr[i].lng]).addTo(this.map);
    //   //
    //   // }
    //   // this.map.panTo(new L.LatLng(40.737, -73.923));
    //   let myChart = this.$echarts.init(document.getElementById('index_chart'))
    //   let _this = this
    //   myChart.on('click', function (params) {
    //     // console.log(params.data)
    //     let param1 = new URLSearchParams();
    //     param1.append('check_code', (params.data.name))
    //     _this.$store.state.get_check.params = param1
    //     _this.$store.dispatch('get_headquarter/getInitRectification')
    //     _this.$store.dispatch('get_headquarter/getInitRiskLevelData')
    //     _this.$store.dispatch('get_headquarter/getInitRiskNumberRank')
    //     _this.$store.dispatch('get_headquarter/getInitImage')
    //     _this.$store.dispatch('get_headquarter/getInitNumberTop')
    //     _this.$store.dispatch('get_headquarter/getInitRiskList')
    //     _this.$store.dispatch('get_headquarter/getInitRiskIndexData')
    //     let head = document.getElementById('head_part');
    //     head.style.display = 'none'
    //     let region = document.getElementById('region_part');
    //     let prj = document.getElementById('prj_part');
    //     prj.style.display = 'block'
    //     let check = document.getElementById('check_part');
    //     check.style.display = 'block'
    //     // check.style.width = "500px"
    //     // check.style.width = "99%"
    //     document.getElementById('map_2').style.display = 'none'
    //     document.getElementById('map_1').style.display = 'block'
    //     _this.map.setZoom(12)
    //     setTimeout(function () {
    //       _this.map.panTo(new L.LatLng(params.data.lat, params.data.lng));
    //     }, 300)
    //   })
    //
    //   return this.map
    // },
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
              // areaColor: null,
              // shadowOffsetX: 0,
              // shadowOffsetY: 0,
              // shadowBlur: 20,
              // borderWidth: 0,
              // shadowColor: 'rgba(0, 0, 0, 0.5)'
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
          // itemStyle: {
          //   normal: {
          //     areaColor: "#0d0059",
          //     borderColor: "#389dff",
          //     borderWidth: 0.5
          //   },
          //   emphasis: {
          //     areaColor: "#17008d",
          //     shadowOffsetX: 0,
          //     shadowOffsetY: 0,
          //     shadowBlur: 5,
          //     borderWidth: 0,
          //     shadowColor: "rgba(0, 0, 0, 0.5)"
          //   }
          // }
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
    ,
    sortNumber(attr, rev) {
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = (rev) ? 1 : -1;
      }

      return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      }
    }
  }
}
</script>

<style scoped>

</style>