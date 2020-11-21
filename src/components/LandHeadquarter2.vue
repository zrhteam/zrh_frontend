<template>
  <el-row style="margin-bottom: 100px">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div style="margin-left: 80px">
            <span>项目综合&专业风险指数排名</span>
          </div>
          <div>
            <div id="mydiv1" style="font-color: black">
              <!--              <svg>-->
              <!--                <rect></rect>-->
              <!--              </svg>-->
              <div style="display: none">
                {{ getIndexHistogram }}
              </div>

              <!--              <IndexHistogram></IndexHistogram>-->
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <div>
            <span>项目高风险数量排名</span>
          </div>
          <div>
            <div id="mydiv2">
              <!--              <svg>-->
              <!--                <rect></rect>-->
              <!--              </svg>-->
              <div style="display: none">
                {{ getNumberHistogram }}
              </div>
<!--              <div id="number_histogram">-->
<!--              </div>-->
              <NumberHistogram v-if="NHRefresh"></NumberHistogram>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import IndexHistogram from "@/components/IndexHistogram.vue";
import NumberHistogram from "@/components/NumberHistogram.vue";
import * as d3 from "d3";
import dataService from "@/service/dataService";

export default {
  name: "LandHeadquarter2",
  components: {IndexHistogram, NumberHistogram},
  data() {
    return {
      NHRefresh: true
    }
  },
  created() {
    this.$store.dispatch('get_headquarter/getInitRiskNumberRank')
  },
  mounted() {
    // this.getlist();
  },
  computed: {
    getIndexHistogram() {

    },
    getNumberHistogram() {
      let data = this.$store.state.get_headquarter.risk_number_rank
      let arr = []
      for (let i in data) {
        let obj = {
          name: '',
          count: 0
        }
        obj.name = i;
        obj.count = data[i].high_risk_count;
        arr.push(obj)
      }
      this.NHRefresh = false
      this.$nextTick(() => {
        this.NHRefresh = true
      })
      // debugger
      // console.log(arr)
      // if(arr.length>0)
      // this.getlist(arr);
      // this.getlist();
    }
  },
  methods: {
    getlist() {
      //制作画布
      let width = 500;//画布宽度
      let height = 400;//画布高度
      let svg = d3.select("#number_histogram")
          // let svg = d3.select("body")
          .append("svg")
          .attr("width", width)
          .attr("height", height);
      //画布周边的空白
      let padding = {left: 110, right: 30, top: 20, bottom: 30};
      //定义一个数组
      debugger
      let datas = [{
        key: "yi",
        value: 20
      }, {
        key: "er",
        value: 40
      }];
      //定义坐标轴比例尺
      //x轴比例尺
      // let ranges = d3.range(datas.length)//ranges是datas数组下标集合的一个数组
      /*注意:4版本后下面的这种用法好像不可以了*/
      var xScale1 = d3.scale.ordinal()
          .domain(datas.map(d => d.key))
          .rangeRoundBands([0, width - padding.left - padding.right])
      var xScale = d3.scale.ordinal()
          .domain(d3.range(datas.length))
          .rangeRoundBands([0, width - padding.left - padding.right]);
      // .round(0.05);

      // let xScale = d3.scaleBand()
      //     .domain(ranges) //这里装的是一个数组
      //     .range([0, width - padding.left - padding.right])

      //y轴比例尺
      let values = datas.map(d => d.value)
      // let min = d3.min(datas.value);
      // let max = d3.max(datas.value);
      let max = d3.max(values);
      // let yScale = d3.scaleLinear()
      //     .domain([0, max])//值域范围，即y轴的最大最小值
      //     .range([height - padding.top - padding.bottom, 0]);
      let yScale1 = d3.scale.linear()
          .domain([0, max])//值域范围，即y轴的最大最小值
          .range([height - padding.top - padding.bottom, 0]);
      let yScale = d3.scale.linear()
          .domain([0, max])//值域范围，即y轴的最大最小值
          .range([height - padding.top - padding.bottom, 0]);

      //定义坐标轴
      //X轴
      // let xAxis = d3.axisBottom(xScale);
      // //Y轴
      // let yAxis = d3.axisLeft(yScale);
      alert(d3.select('svg').length)
      if (d3.select('svg').length >= 1) {
        let xAxis = d3.svg.axis()
            .scale(xScale1)       //指定比例尺
            .orient("bottom");    //指定刻度的方向
        let yAxis = d3.svg.axis()
            .scale(yScale1)       //指定比例尺
            .orient("left");    //指定刻度的方向

        //矩形之间的空白
        let rectPadding = 4;
        //添加矩形元素
        let rects = svg.selectAll(".MyRect")
            .data(values)
            .enter()
            .append("rect")//添加矩形
            .attr("class", "MyRect")//添加类名
            .attr("transform", "translate(" + padding.left + "," + padding.top + ")")//矩形的位置
            .attr("x", function (d, i) {
              return xScale(i) + rectPadding / 2;
            })
            .attr("y", function (d) {//生成的矩形距离画布顶部的距离
              return yScale(d);
            })
            // .attr("width", xScale.bandwidth() - rectPadding)//根据比例尺来计算出矩形的宽度
            .attr("width", xScale.rangeBand() - rectPadding)
            .attr("height", function (d) {
              return height - padding.top - padding.bottom - yScale(d);//画布高度-距离顶部-距离底部-矩形距离顶部的高算出矩形的高度
            })
            .attr("fill", "steelblue");//矩形颜色
        //添加文字元素
        let texts = svg.selectAll(".MyText")
            .data(values)
            .enter()
            .append("text")//添加图形数据
            .attr("class", "MyText")
            .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
            .attr("x", function (d, i) {
              return xScale(i) + rectPadding / 2;
            })
            .attr("y", function (d) {
              return yScale(d);
            })
            .attr("dx", function () {//文字距离矩形左边的距离
              // return (xScale.bandwidth() - rectPadding * 5) / 2;
              return (xScale.rangeBand() - rectPadding * 5) / 2;
            })
            .attr("dy", function (d) {//文字距离矩形顶部的距离
              return 0;
            })
            .text(function (d) {
              return d.count;
            })
        //添加坐标轴元素
        //添加X轴
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
            .call(xAxis)
        //添加Y轴
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
            .call(yAxis)
      }
    },
  }

}
</script>

<style scoped>
.grid-content {
  text-align: left;
}
</style>