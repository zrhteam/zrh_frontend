<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <OverviewLeftSide></OverviewLeftSide>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>overview</span>
        <h1 style="display: none">{{ getLocationData }}</h1>
      </el-header>

      <el-main>
        <div id="map" bordered :dataSource="$store.state.get_locations.data">
        </div>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
// import axios from "axios";
import dataService from "@/service/dataService";
import OverviewLeftSide from "@/components/views/overview/OverviewLeftSide.vue";
import {mapState, mapGetters} from "vuex"

//在组件的created中提交dispatch，然后通过action调用一个封装好的axios
// 然后再触发mutation来提交状态改变state中的数据，然后在组件的计算属性中获取state的数据并渲染在页面上
export default {
  name: "Overview",
  components: {OverviewLeftSide},
  data() {
    return {
      map: "",
      dataset: {},
      form: {
        name: '',
      },
      map_width: 0,
      map_height: 0,
      timer: ''
    }
  },
  mounted: function () {
    this.loadMap();//加载地图
    let m = document.getElementById("map")
    this.map_width = window.getComputedStyle(m).width
    this.map_height = window.getComputedStyle(m).height
    // this.timer = setInterval(this.drawPie, 1000);

    // this.drawPie()
  },
  // beforeDestroy() {
  //   clearInterval(this.timer);
  // },
  methods: {
    loadMap() {//加载地图
      this.map = L.map("map", {
        center: [22, 107], // 地图中心
        zoom: 5, //缩放比列
        zoomControl: false, //禁用 + - 按钮
        doubleClickZoom: false, // 禁用双击放大
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
      //点击地图弹出经纬度
      // this.map.on('click', function (e) {
      //   console.log(e);
      //   alert('纬度：' + e.latlng.lat + '\n经度：' + e.latlng.lng);
      // });
      // 添加marker
      // let marker = L.marker([23.09, 114.23]).addTo(this.map)

      //添加marker pp
      // marker.bindPopup("我是popup").openPopup(); // openPopup 是自动打开气泡
      // axios.post(`http://localhost:5000/api/overview`)
      //           .then((ret) => {
      //               var jsonObj = JSON.parse(JSON.stringify(ret));
      //               // console.log(JSON.stringify(jsonObj));
      //               this.dataset = ret.data
      //               for(var i = 0; i < this.dataset.length; i++) {
      //                 L.marker([this.dataset[i].latitude, this.dataset[i].longitude]).addTo(this.map);
      //               }
      //           })
      //           .catch(function (error) {
      //               console.log(error.response)
      //           })
    },
    onSubmit() {
      console.log('submit!');
    },
    drawPie() {// 之前的d3版本是"d3": "^3.4.5",
      // document.querySelector('svg').innerHTML = '';
      var svg = d3.select(this.map.getPanes().overlayPane).append("svg");
      // console.log(this.map.getPanes().overlayPane)
      // var w = 120,
      //     h = 224
      // var url = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=65091773,2491902343&fm=15&gp=0.jpg'
      // var southWest = this.map.unproject([0, h], this.map.zoom - 1);
      // var northEast = this.map.unproject([w, 0], this.map.zoom - 1);
      // var bounds = new L.LatLngBounds(southWest, northEast);
      // L.svgOverlay("map", bounds).addTo(this.map),
      // var svg = d3.select(this.map.getPanes().overlayPane).append("svg").attr("class", "leaflet-zoom-hide");
      //var color = d3.scale.category10();
      //var color = d3.schemeCategory10;采用自己设置的颜色
      function getColor(idx) {
        var color = ['#CEF6F5', '#A9E2F3', '#58D3F7', '#58ACFA', '#2E9AFE', '#0080FF', '#5858FA', '#AC58FA', '#FA58F4']
        return color[idx % color.length];
      }

      //console.log(color)

      // var dataset = [30, 10, 43, 55, 13];
      const dataset = [
        {name: "A计划", value: 20},
        {name: 'B计划', value: 20},
        {name: 'C计划', value: 20}
      ];
      // 这样的值是不能直接绘制图形的，例如绘制饼图的一部分，需要知道一段弧度的起始位置和终止角度，这些值都不存在于数组的dataset中，因此需要用到布局
      // 布局的作用就是：计算出适合于作图的数据
      var pie = d3.layout.pie()
          .sort(null)
          .value(function (d) {
            return d.value;
          });
      var piedata = pie(dataset)
      // console.log(piedata)//5个整数倍转换成了5个对象，每个对象都有：起始角度（startAngle）和终止角度（endAngle），还有原数据（属性名称为 data）。这些都是绘图需要的数据。
      // 绘制图形
      // 为了根据转换后的piedata绘图，还需要一样工具：生成器
      // 弧生成器
      var outerRadius = 50;
      var innerRadius = 0;
      var arc = d3.svg.arc()//弧生成器；
          .innerRadius(innerRadius)//设置内半径
          .outerRadius(outerRadius)//设置外半径


      // var latlng = L.latLng(23, 114);
      // console.log(latlng)
// console.log(point)
//       console.log(L.project(latlng, this.map.zoom))


      // var projection = d3.geo.mercator()
      //     .center([23, 114])
      //     .scale(600)
      //     .translate([1841 / 2, 909 / 2]);
      // var path = d3.geo.path()
      //     .projection(projection);
      //
      // var peking = [23, 114];
      // var proPeking = projection(peking);
      // console.log(peking)
      // console.log(proPeking[0], proPeking[1])


      // 先添加g，再添加path
      var arcs = svg.selectAll('g')
          .data(piedata)
          .enter()
          .append('g')
          // .attr("transform", "translate("+proPeking[0]+","+proPeking[1]+")")
          .attr("transform", "translate(23, 114)")
          .attr("class", "leaflet-zoom-hide");
      // 接下来给每个g添加path
      arcs.append('path')
          .attr('fill', function (d, i) {
            //return color[i]
            return getColor(i);
          })
          .attr('d', function (d) {
            return arc(d)
          })
      // 添加文本
      arcs.append("text")
          .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr("text-anchor", "middle")//水平居中；
          .text(function (d) {
            return d.data.name;
          });

      svg.attr("width", this.map_width)
          .attr("height", this.map_height)
          .attr("viewBox", "0 0 1452 860")
          .style("left", 0 + "px")
          .style("top", 0 + "px")
          .style("position", "relative");

    }
  },
  computed: {
    //得到该地理位置的所有信息，包括地图上显示该位置并显示该位置所对应的风险等级
    //将各个点找到并显示
    getLocationData() {
      this.dataset = this.$store.state.get_locations.data
      // console.log(this.dataset)
      // alert(this.dataset[0].latitude)
      for (let i in this.dataset) {
        // console.log(this.dataset[i])
        // alert(this.dataset[i].latitude)
        let marker = L.marker([this.dataset[i].latitude, this.dataset[i].longitude]).addTo(this.map);
        // marker.bindPopup(_this.dataset[i].city).openPopup(); // openPopup 是自动打开气泡

        //呈现饼图
        function getColor(idx) {
          var color = ['#CEF6F5', '#A9E2F3', '#58D3F7']
          return color[idx % color.length];
        }

        //console.log(color)
        let dataset = [];
        for (let j in this.dataset[i].risk_level) {
          dataset.push(this.dataset[i].risk_level[j])
        }
        // console.log(dataset)
        // 这样的值是不能直接绘制图形的，例如绘制饼图的一部分，需要知道一段弧度的起始位置和终止角度，这些值都不存在于数组的dataset中，因此需要用到布局
        // 布局的作用就是：计算出适合于作图的数据
        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d) {
              return d.data;
            });
        var piedata = pie(dataset)
        // console.log("piedata")
        // console.log(piedata)//5个整数倍转换成了5个对象，每个对象都有：起始角度（startAngle）和终止角度（endAngle），还有原数据（属性名称为 data）。这些都是绘图需要的数据。
        // 绘制图形
        // 为了根据转换后的piedata绘图，还需要一样工具：生成器
        // 弧生成器
        var outerRadius = 50;
        var innerRadius = 0;
        //弧生成器；
        // let arc = d3.svg.arc()
        //     .innerRadius(innerRadius)//设置内半径
        //     .outerRadius(outerRadius);//设置外半径
        //
        // // 先添加g，再添加path
        // var arcs = svg.selectAll('g')
        //     .data(piedata)
        //     .enter()
        //     .append('g')
        //     // .attr("transform", "translate("+proPeking[0]+","+proPeking[1]+")")
        //     .attr("transform", "translate(23, 114)")
        //     .attr("class", "leaflet-zoom-hide");
        // // 接下来给每个g添加path
        // arcs.append('path')
        //     .attr('fill', function (d, i) {
        //       //return color[i]
        //       return getColor(i);
        //     })
        //     .attr('d', function (d) {
        //       return arc(d)
        //     })
        // // 添加文本
        // arcs.append("text")
        //     .attr("transform", function (d) {
        //       return "translate(" + arc.centroid(d) + ")";
        //     })
        //     .attr("text-anchor", "middle")//水平居中；
        //     .text(function (d) {
        //       return d.data.name;
        //     });
        //
        // svg.attr("width", 2841)
        //     .attr("height", 909)
        //     .style("left", 0 + "px")
        //     .style("top", 0 + "px")
        //     .style("position", "relative");

      }
      // return this.$store.state.get_locations.data
    },
  },
  created() {
    this.$store.dispatch('get_locations/getLocation')
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

#map {
  width: 100%;
  height: calc(100vh);
}

.draw {
  display: flex;
  z-index: 2;
  width: 100px;
  height: 50px;
  position: absolute;
  left: 50px;
  justify-content: center;
  align-items: center;
}

.disDraw {
  display: flex;
  z-index: 2;
  width: 100px;
  height: 50px;
  position: absolute;
  left: 200px;
  justify-content: center;
  align-items: center;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: left;
}
</style>