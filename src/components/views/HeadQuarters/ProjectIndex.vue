<template>
  <div class="grid-content bg-purple">
    <div class="level4" style="padding-top: 15px">
      <span>项目综合&专业风险指数排名</span>
    </div>
    <div>
      <div id="mydiv1" style="font-color: black">
        <div style="display: none">
          {{ getIndexHistogram }}
        </div>
      </div>
      <div id="number_histogram1" style="height: 400px; width: 100%"></div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3/dist/d3";

export default {
  name: "ProjectIndex",
  // computed: {
  //   getIndexHistogram() {
  //     let data = this.$store.state.get_headquarter.risk_index_data
  //     console.log(data)
  //     let arr = []
  //     for (let i in data) {
  //       let obj = {
  //         name: '',
  //         count: 0
  //       }
  //       obj.name = i;
  //       obj.count = data[i].high_risk_count;
  //       arr.push(obj)
  //     }
  //     let svg = d3.select("#mydiv2 svg")
  //     this.getlist(svg, arr);
  //   },
  //   getNumberHistogram() {
  //     let data = this.$store.state.get_headquarter.risk_number_rank
  //     let arr = []
  //     for (let i in data) {
  //       let obj = {
  //         name: '',
  //         count: 0
  //       }
  //       obj.name = i;
  //       obj.count = data[i].high_risk_count;
  //       arr.push(obj)
  //     }
  //     let svg = d3.select("#mydiv2 svg")
  //     this.getlist(svg, arr);
  //   }
  // },
  // methods: {
  //   getlist(svg, arr) {
  //     // d3.select("#mydiv2 svg").remove();
  //     //制作画布
  //     let width = 500;//画布宽度
  //     let height = 400;//画布高度
  //     // let svg = d3.select("#mydiv2 svg")
  //     // let svg = d3.select(this.$el).select("svg")
  //         svg.attr("width", width)
  //         .attr("height", height);
  //     //画布周边的空白
  //     let padding = {left: 110, right: 30, top: 20, bottom: 30};
  //     //定义一个数组
  //     // let datas = [{
  //     //   key: "yi",
  //     //   value: 20
  //     // }, {
  //     //   key: "er",
  //     //   value: 40
  //     // }];
  //     let datas = arr
  //     //定义坐标轴比例尺
  //     //x轴比例尺
  //     var xScale1 = d3.scaleBand()
  //         .domain(datas.map(d => d.name))
  //         .range([0, width - padding.left - padding.right])
  //
  //     let xScale = d3.scaleBand()
  //         .domain(d3.range(datas.length)) //这里装的是一个数组
  //         .rangeRound([0, width - padding.left - padding.right])
  //         .round(0.05)
  //
  //     //y轴比例尺
  //     let values = datas.map(d => d.count)
  //     let max = d3.max(values);
  //     let yScale = d3.scaleLinear()
  //         .domain([0, max])//值域范围，即y轴的最大最小值
  //         .range([height - padding.top - padding.bottom, 0]);
  //     let yScale1 = d3.scaleLinear()
  //         .domain([0, max])//值域范围，即y轴的最大最小值
  //         .range([height - padding.top - padding.bottom, 0]);
  //     //定义坐标轴
  //     // X轴
  //     let xAxis = d3.axisBottom(xScale1);
  //     //Y轴
  //     let yAxis = d3.axisLeft(yScale1);
  //
  //     //矩形之间的空白
  //     let rectPadding = 4;
  //     //添加矩形元素
  //     let rects = svg.selectAll(".MyRect")
  //         .data(values)
  //         .enter()
  //         .append("rect")//添加矩形
  //         .attr("class", "MyRect")//添加类名
  //         .attr("transform", "translate(" + padding.left + "," + padding.top + ")")//矩形的位置
  //         .attr("x", function (d, i) {
  //           return xScale(i) + rectPadding / 2;
  //         })
  //         .attr("y", function (d) {//生成的矩形距离画布顶部的距离
  //           return yScale(d);
  //         })
  //         .attr("width", xScale.bandwidth() - rectPadding)//根据比例尺来计算出矩形的宽度
  //         // .attr("width", xScale.rangeBand() - rectPadding)
  //         .attr("height", function (d) {
  //           return height - padding.top - padding.bottom - yScale(d);//画布高度-距离顶部-距离底部-矩形距离顶部的高算出矩形的高度
  //         })
  //         .attr("fill", "steelblue");//矩形颜色
  //     //添加文字元素
  //     let texts = svg.selectAll(".MyText")
  //         .data(values)
  //         .enter()
  //         .append("text")//添加图形数据
  //         .attr("class", "MyText")
  //         .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
  //         .attr("x", function (d, i) {
  //           return xScale(i) + rectPadding / 2;
  //         })
  //         .attr("y", function (d) {
  //           return yScale(d);
  //         })
  //         .attr("dx", function () {//文字距离矩形左边的距离
  //           return (xScale.bandwidth() - rectPadding * 5) / 2;
  //           return (xScale.rangeBand() - rectPadding * 5) / 2;
  //         })
  //         .attr("dy", function (d) {//文字距离矩形顶部的距离
  //           return 0;
  //         })
  //         .text(function (d) {
  //           return d.count;
  //         })
  //     //添加坐标轴元素
  //     //添加X轴
  //     svg.append("g")
  //         .attr("class", "axis")
  //         .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
  //         .call(xAxis)
  //     //添加Y轴
  //     svg.append("g")
  //         .attr("class", "axis")
  //         .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
  //         .call(yAxis)
  //     // }
  //   },
  // },
  computed: {
    // getNumberHistogram() {
    getIndexHistogram() {
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
      console.log(arr)
      return arr
    },
  },
  updated() {
    this.drawBarChart()
  },
  mounted() {
    this.drawBarChart();
  },
  methods: {
    drawBarChart() {
      let myChart = this.$echarts.init(document.getElementById('number_histogram1'))
      // 使用刚指定的配置项和数据显示图表。
      let arr = this.getIndexHistogram
      let option = {
        tooltip: {},
        dataset: {
          dimensions: ['name', 'count'],
          source: arr
        },
        xAxis: {type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 45,
            textStyle: {
              fontSize: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              fontSize: 6
            }
          }},
        yAxis: {axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          }},
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
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                )
              }
            },
            barMaxWidth: 40
          }
        ]
      };
      myChart.setOption(option);
      myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
    }
  }
}
</script>

<style scoped>

</style>