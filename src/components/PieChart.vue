<template>
  <svg></svg>
</template>
<script>
import * as d3 from 'd3';
//const data = [99, 71, 78, 25, 36, 92];
export default {
  name: 'non-vue-line-chart',
  template: '<div></div>',
  mounted() {
    var svg = d3.select('svg');

    //var color = d3.scale.category10();
    //var color = d3.schemeCategory10;采用自己设置的颜色
    function getColor(idx){
        var color = ['#CEF6F5', '#A9E2F3', '#58D3F7', '#58ACFA', '#2E9AFE', '#0080FF', '#5858FA', '#AC58FA', '#FA58F4']
        return color[idx % color.length];
    }
    //console.log(color)

    // var dataset = [30, 10, 43, 55, 13];
	const dataset = [
	      { name: "A计划", value: 20 },
	      { name: 'B计划', value: 20 },
	      { name: 'C计划', value: 20 },
	      { name: 'D计划', value: 20 },
	      { name: 'E计划', value: 20 },
	      { name: 'F计划', value: 20 },
	      { name: 'G计划', value: 20 }
	    ];
	var data
    // 这样的值是不能直接绘制图形的，例如绘制饼图的一部分，需要知道一段弧度的起始位置和终止角度，这些值都不存在于数组的dataset中，因此需要用到布局
    // 布局的作用就是：计算出适合于作图的数据
    var pie = d3.pie()
	.sort(null)
	.value(function(d){
		return d.value;
	});
    var piedata = pie(dataset)
    console.log(piedata)//5个整数倍转换成了5个对象，每个对象都有：起始角度（startAngle）和终止角度（endAngle），还有原数据（属性名称为 data）。这些都是绘图需要的数据。
    // 绘制图形
    // 为了根据转换后的piedata绘图，还需要一样工具：生成器
    // 弧生成器
    var outerRadius = 150;
    var innerRadius = 0;
    var arc = d3.arc()//弧生成器；
        .innerRadius(innerRadius)//设置内半径
        .outerRadius(outerRadius)//设置外半径
    // 先添加g，再添加path
    var arcs = svg.selectAll('g')
        .data(piedata)
        .enter()
        .append('g')
        .attr("transform", "translate(200,200)");
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
  },
};
</script>

<style>
        svg {
            /*width: 600px;*/
            /*height: 600px;*/
            display: block;
            /*margin: 100px auto;*/
        }

        /*text {*/
        /*    fill: #fff;*/
        /*}*/
</style>