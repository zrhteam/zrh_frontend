<template>
  <el-col :span="10" class="" style="height: 100%">
    <el-card class="box-card " shadow="never"
             style="background-color: transparent; height: 79%; margin: 0px 5px 5px 5px">
      <!--          放地图-->
      <div class="map_container" style="height: 100%; width: 100%; z-index:1; background-color: #13E8E9">
        <div id="map_1"
             style="pointer-events:inherit; height: 100%; width: 100%;"></div>
        <div id="map_2"
             style="pointer-events:inherit; height: 100%; width: 100%; display: none"></div>
      </div>
      <!--          <div id="map" bordered style="pointer-events:inherit"></div>-->
      <!--          <svg style="position: absolute; z-index: 8; width: 100%; height: 100%" pointer-events="none"></svg>-->
    </el-card>
    <!--每个项目历次检查的指数，放到项目级默认下的地图下面-->
    <el-card class="box-card boundary-B" shadow="never"
             style="background-color: transparent; height: 19%; margin: 0px 5px 5px 5px">
      <div style="display: none">
        {{ getPrjIndex }}
      </div>
      <div class="level4">
        <span>历次检查危险指数</span>
      </div>
      <div id="index_chart" style="height: 100%; width: 100%; display: block"></div>
    </el-card>
  </el-col>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector'
import * as d3 from "d3/dist/d3";

export default {
  name: "PrjIndex",
  props: ['mapInfo'],
  data() {
    return {
      map: '',
      arr: []
    }
  },
  computed: {
    getPrjIndex() {
      //历次检查的指数
      //还负责封装了地理位置信息
      let tree_data = this.$store.state.get_login.grant_data.data.value
      let arr = []
      let obj = {
        // check_node: '',
        // index: 0
        name: '',
        count: 0,
        lat: 0,
        lng: 0
      };
      for (let i in tree_data['headquarter_tag']) {
        for (let j in tree_data['headquarter_tag'][i]['region_tag']) {
          for (let k in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag']) {
            for (let l in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k]) {
              for (let m in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l]) {
                obj['name'] = m;
                obj['count'] = tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l][m].index
                obj['lat'] = tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l][m].lat
                obj['lng'] = tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l][m].lng
                arr.push(obj)
              }
            }
          }
        }
      }
      console.log("Index_arr", arr)
      this.arr = arr
      return arr
    }
  },
  updated() {
    this.drawBarChart()
  },
  mounted() {
    document.getElementById('map_2').style.display = 'none'
    document.getElementById('map_1').style.display = 'block'
    this.map = this.loadMap();//加载地图
    let m = document.getElementById("map_1")
    this.map_width = window.getComputedStyle(m).width
    this.map_height = window.getComputedStyle(m).height

    this.svg = d3.select(this.$el).select('svg');
    // this.svg = d3.select(this.map.getPanes().overlayPane).append("svg");

    let _this = this;
    this.map.on('drag', (e) => {
      let center_position = this.map.latLngToContainerPoint([22, 107]);

      if (this.locContainers) {
        this.locContainers.each(function (d) {
          let loc = _this.map.latLngToContainerPoint(d.locs)
          d3.select(this).attr('transform', 'translate(' + [loc.x, loc.y] + ')');
        })
      }
    });

    this.map.on('move', (e) => {
      let center_position = this.map.latLngToContainerPoint([22, 107]);
      if (this.locContainers) {
        this.locContainers.each(function (d) {
          let loc = _this.map.latLngToContainerPoint(d.locs)
          d3.select(this).attr('transform', 'translate(' + [loc.x, loc.y] + ')');
        })
      }
    });
    this.drawBarChart();
  },
  methods: {
    drawBarChart() {
      // document.getElementById('history_chart').innerHTML = ''
      let myChart = this.$echarts.init(document.getElementById('index_chart'))
      // 使用刚指定的配置项和数据显示图表。
      let arr = this.getPrjIndex
      if (arr.length) {
        let option = {
          tooltip: {},
          dataset: {
            dimensions: ['name', 'count'],
            source: arr
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              show: true,
              // inside: true,
              interval: 0,
              rotate: 0,
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
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            },
            splitNumber: 2
          },
          series: [
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [10, 10, 0, 0],
                  color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#77b5b8'},
                        // {offset: 0.5, color: '#1f77a0'},
                        {offset: 1, color: '#107480'}
                      ]
                  )
                }
              },
              label:{
                show: true,
                position: 'top',
                textStyle: {
                  fontSize: '7px',
                  color: '#fff'
                },
              },
              emphasis: {
                itemStyle: {
                  color: '#40abc4'
                  //     new echarts.graphic.LinearGradient(
                  //     0, 0, 0, 1,
                  //     [
                  //       {offset: 0, color: '#2378f7'},
                  //       {offset: 0.7, color: '#2378f7'},
                  //       {offset: 1, color: '#83bff6'}
                  //     ]
                  // )
                }
              },
              barMaxWidth: 20
            }
          ]
        };
        myChart.setOption(option);


        // myChart.getZr().on('click', params => {
        //   let pointInPixel = [params.offsetX, params.offsetY]
        //   if (myChart.containPixel('grid', pointInPixel)) {
        //     let xIndex = myChart.convertFromPixel({seriesIndex: 0}, [params.offsetX, params.offsetY])[0]
        //     console.log(params)
        //   }
        // })
      } else {
        // document.getElementById('history_chart').innerHTML = ''
        // document.getElementById('history_chart').innerHTML = '<div style="color: #909399; text-align: center; vertical-align: center">暂无数据</div>'
      }
      myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("index_chart"), element => {
        _this.$nextTick(() => {
          //监听到事件后执行的业务逻辑
          myChart.resize();
        });
      });
    },
    loadMap() {//加载地图
      this.map = L.map("map_1", {
        center: [34, 107], // 地图中心
        zoom: 4, //缩放比列
        zoomControl: false, //禁用 + - 按钮
        // doubleClickZoom: false, // 禁用双击放大
        attributionControl: false // 移除右下角leaflet标识
      });
      let name = L.tileLayer(
          // 'https://api.mapbox.com/styles/v1/zhaiyzh/ckes4nsma2yls19op279otef9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemhhaXl6aCIsImEiOiJja2VyeWYzNTYwbHB1MnhzYTV0Z3didG1hIn0.forlrmKVYKXTsyP7voWu9Q'
          "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",//初始化一个 openlayers 地图
          // 天地图影像图层
          // "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d", //parent.TiandituKey()为天地图密钥
          // 天地图影像注记图层
          // "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d", //parent.TiandituKey()为天地图密钥
          // 加载谷歌地图
          // "http://webrd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8"
          // 加载高德地图
          // 'http://webrd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'
      ).addTo(this.map);
      // this.map.on('click', function (e) {
      //   console.log(e);
      //   alert('纬度：' + e.latlng.lat + '\n经度：' + e.latlng.lng);
      // });
      for (var i = 0; i < this.arr.length; i++) {
        L.marker([this.arr[i].lat, this.arr[i].lng]).addTo(this.map);
        // var marker = L.marker([37.8542800187483, 112.534177962463]).addTo(this.map);
        // this.map.on("click", function (e) {
        //   var lat = e.latlng.lat;
        //   var lng = e.latlng.lng;
        //   marker.setLatLng([lat, lng]);
        // });
      }
      // this.map.panTo(new L.LatLng(40.737, -73.923));
      let myChart = this.$echarts.init(document.getElementById('index_chart'))
      let _this = this
      myChart.on('click', function (params) {
        // console.log(params.data)
        let param1 = new URLSearchParams();
        param1.append('check_code', (params.data.name))
        _this.$store.state.get_check.params = param1
        _this.$store.dispatch('get_check/getCheckRectification')
        _this.$store.dispatch('get_check/getCheckRiskLevel')
        _this.$store.dispatch('get_check/getCheckRiskRatio')
        _this.$store.dispatch('get_check/getCheckHighRisk')
        _this.$store.dispatch('get_check/getCheckHighImage')
        _this.$store.dispatch('get_check/getCheckMajorSystem')
        _this.$store.dispatch('get_check/getCheckMajorArea')
        _this.$store.dispatch('get_check/getCheckMajorStage')
        _this.$store.dispatch('get_check/getCheckRiskTop')
        var prj = document.getElementById('prj_part');
        prj.style.display = 'none'
        var check = document.getElementById('check_part');
        check.style.display = 'block'
        // check.style.width = "500px"
        // check.style.width = "99%"
        document.getElementById('map_2').style.display = 'none'
        document.getElementById('map_1').style.display = 'block'
        document.getElementById('prj_charts').style.display = 'none'
        document.getElementById('check_charts').style.display = 'block'
        _this.map.setZoom(12)
        setTimeout(function () {
          _this.map.panTo(new L.LatLng(params.data.lat, params.data.lng));
        }, 100)
      })

      return this.map
    },
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
#map_1 {
  width: 100%;
  height: calc(100vh);
}
</style>