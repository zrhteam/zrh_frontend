<template>
  <div id = "region_number_histogram">

  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: "RegionNumberHistogram",
  mounted() {
    this.getlist();
  },
  created() {
  },
  methods: {
    getlist(){
      //制作画布
      let width = 400;
      let height = 300;
      let svg = d3.select("#region_number_histogram")
          .append("svg")
          .attr("width", width)
          .attr("height", height);
      //画布周边的空白
      let padding = {left: 80, right: 10, top: 20, bottom: 30};

      //柱形图数据
      //这里先写死数据
      let datas = [2, 3, 5, 7, 8, 9, 6, 4, 1, 5];

      let ranges = d3.range(datas.length)

      let xScale = d3.scale.ordinal()
          .domain(d3.range(datas.length))
          .rangeRoundBands([0, width - padding.left - padding.right])

      let min = d3.min(datas);
      let max = d3.max(datas);
      let yScale = d3.scale.linear()
          .domain([0, max])
          .range([height - padding.top - padding.bottom, 0]);

      let xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom");
      let yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left");

      let rectPadding = 4;
      let rects = svg.selectAll(".MyRect")
          .data(datas)
          .enter()
          .append("rect")
          .attr("class", "MyRect")
          .attr("transform", "translate(" + padding.left + "," + padding.top +")")
          .attr("x", function (d, i){
            return xScale(i) + rectPadding/2;
          })
          .attr("y", function (d){
            return yScale(d);
          })
          .attr("width", xScale.rangeBand() - rectPadding)
          .attr("height", function (d){
            return height - padding.top -padding.bottom - yScale(d);
          })
          .attr("fill", "steelblue");
      //添加文字元素
      let texts = svg.selectAll(".MyText")
          .data(datas)
          .enter()
          .append("text")
          .attr("class", "MyText")
          .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
          .attr("x", function (d, i){
            return xScale(i) + rectPadding/2;
          })
          .attr("y", function (d){
            return yScale(d);
          })
          .attr("dx", function (){
            return (xScale.rangeBand() - rectPadding * 5)/2;
          })
          .attr("dy", function (d){
            return 0;
          })
          .text(function (d) {
            return d;
          })

      //添加坐标轴元素
      //添加x轴
      svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
          .call(xAxis)

      svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
          .call(yAxis)


      },
    },
}
</script>

<style scoped>
svg{
  margin: 20px 20px;
}
text{
  color: #000000;
}

</style>