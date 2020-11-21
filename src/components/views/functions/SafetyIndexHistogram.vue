<template>
  <div id = "safety_index_histogram">

  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: "SafetyIndexHistogram",
  mounted(){
    this.getlist();
  },
  created() {
  },
  methods: {
    getlist() {
      //制作画布
      let width = 400;//
      let height = 300;//
      let svg = d3.select( "#safety_index_histogram")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      //画布周边的空白
      let padding = {left: 80, right: 10, top: 20, bottom: 30};

      //封装柱形图数据
      let datas = [1,2,3,4,5,6,7,8,9];

      //定义坐标轴比例尺
      //x轴比例尺
      let ranges = d3.range(datas.length)
      let xScale = d3.scale.ordinal()
          .domain(d3.range(datas.length))
          .rangeRoundBands([0, width - padding.left - padding.right])

      let min = d3.min(datas);
      let max = d3.max(datas);
      let yScale = d3.scale.linear()
          .domain([0, max])//y轴值域范围
          .range([height - padding.top - padding.bottom, 0]);


      let  xAxis = d3.svg.axis()
          .scale(xScale)//指定比例尺
          .orient("bottom");//指定刻度的方向
      let yAxis = d3.svg.axis()
          .scale(yScale)//指定比例尺
          .orient("left")//指定刻度的方向

      let rectPadding = 4;

      let rects = svg.selectAll(".MyRect")
          .data(datas )
          .enter()
          .append("rect")//添加矩形
          .attr("class","MyRect")//添加类名
          .attr("transform","translate(" + padding.left + "," + padding.top + ")")
          .attr("x", function (d, i){//生成的矩形距离画布左侧的距离
            return xScale(i) + rectPadding/2;
          })
          .attr("y", function (d){//生成的矩形距离画布顶部的距离
            return yScale(d);
          })
          .attr("width", xScale.rangeBand() - rectPadding)
          .attr("height", function (d){
            return height - padding.top - padding.bottom -yScale(d);//算矩形高度
          })
          .attr("fill", "steelblue");//矩形颜色

      //添加文字元素
      let texts = svg.selectAll(".MyText")
          .data(datas)
          .enter()
          .append("text")//添加图形数据
          .attr("class", "MyText")
          .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
          .attr("x", function (d, i) {
            return xScale(i) + rectPadding/2;
          })
          .attr("y", function (d){
            return yScale(d);
          })
          .attr("dx", function (){//文字距离矩形左边的距离
            return (xScale.rangeBand() - rectPadding*5)/2;
          })
          .attr("dy", function (d){//文字距离矩形顶部的距离
            return 0;
          })
          .text(function (d) {
            return d;
          })

      //添加坐标轴元素
      //添加x轴
      svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + padding.left + "," +(height - padding.bottom) + ")")
          .call(xAxis)

      //添加y轴
      svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
          .call(yAxis)

    },
  },
}
</script>

<style scoped>
text{
  color: #000000;
}
</style>