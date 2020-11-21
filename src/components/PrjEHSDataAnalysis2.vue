<template>
  <el-row style="margin-bottom: 100px">
    <el-col :span="6">
      <div style="display: none">
        {{ getPrjNearestPerception }}
      </div>
      <!--          最近一次检查隐患专业占比 饼图-->
      <div>
        <div>
          <span>最近一次检查隐患专业占比</span>
        </div>
        <svg></svg>
      </div>
    </el-col>
    <el-col :span="6">
      <div style="display: none">
        {{ getPrjNumberChange }}
      </div>
      <div>
        <span>历次检查隐患专业占比</span>
      </div>
      <svg></svg>
      <!--          历次检查累计隐患专业占比 饼图-->
    </el-col>
    <el-col :span="6">
      <div style="display: none">
        {{ getPrjRiskLevelList }}
      </div>
      <div id="subtitle">
        <span>当前未整改高风险隐患列表</span>
      </div>
      <div>
        <el-table
            :data="riskLevelList"
            stripe
            style="width: 100%">
          <el-table-column
              prop="description"
              label="隐患描述">
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="6">
      <div style="display: none">
        {{ getPrjImage }}
      </div>
      <div class="grid-content bg-purple">
        <div
            style="color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: 16px; font-size: 16px; height: 16px;">
          <span>未整改高风险隐患图片</span>
        </div>
        <div
            style="color: rgb(247, 10, 10); font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 52px;">
          <!--              图片播放-->

          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in img_list" :key="item">
              <img :src="item.url" alt/>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "PrjEHSDataAnalysis2",

  data() {
    return {
      riskLevelList: [],
      nearest_perception: [],
      number_change: [],
      timer: '',
      img_list: []
    }
  },
  mounted() {
    this.timer = setInterval(this.updateTable, 1000);
  },
  methods: {
    updateTable() {
      let first = this.riskLevelList[0];
      this.riskLevelList.shift();
      this.riskLevelList.push(first);
    },
    drawPie(data) {// 之前的d3版本是"d3": "^3.4.5",
      // document.querySelector('svg').innerHTML = '';
      var svg = d3.select('svg');

      // var color = d3.schemeCategory10;
      function getColor(idx) {
        var color = ['#A9E2F3', '#58D3F7', '#58ACFA', '#2E9AFE', '#0080FF', '#5858FA', '#AC58FA', '#FA58F4']
        return color[idx % color.length];
      }

      // 这样的值是不能直接绘制图形的，例如绘制饼图的一部分，需要知道一段弧度的起始位置和终止角度，这些值都不存在于数组的dataset中，因此需要用到布局
      // 布局的作用就是：计算出适合于作图的数据
      var pie = d3.pie()
          .sort(null)
          .value(function (d) {
            return d.value;
          });
      //debugger
      // var piedata = pie(this.nearest_perception)
      var piedata = pie(data)
      console.log(piedata)//5个整数倍转换成了5个对象，每个对象都有：起始角度（startAngle）和终止角度（endAngle），还有原数据（属性名称为 data）。这些都是绘图需要的数据。
      // 绘制图形
      // 为了根据转换后的piedata绘图，还需要一样工具：生成器
      // 弧生成器
      var outerRadius = 120;
      var innerRadius = 0;
      var arc = d3.arc()//弧生成器；
          .innerRadius(innerRadius)//设置内半径
          .outerRadius(outerRadius)//设置外半径
      // 先添加g，再添加path
      alert(svg.length)
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
            return d.data.major_name;
          });
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    //得到基于项目级展示当前未整改的高风险隐患列表
    getPrjRiskLevelList() {
      let data = this.$store.state.get_project.prj_risk_list;
      console.log(this.$store.state.get_project.prj_risk_list)
      console.log(data)
      let dataArray = []
      for (let i in data) {
        let obj = {
          description: ''
        }
        obj.description = data[i]
        dataArray.push(obj)
      }
      console.log(dataArray)
      this.riskLevelList = dataArray
    },
    getPrjImage() {
      let data = this.$store.state.get_project.prj_image;
      // console.log(this.$store.state.get_project.prj_image)
      console.log(data)
      // this.img_list.push(data);
      //
      // console.log(this.img_list)
      // alert(this.img_list[0])

      for (let i in data) {
        let obj = {
          url: ''
        }
        obj.url = 'http://' + data[i]
        this.img_list.push(obj)
      }
      console.log(this.img_list)
    },
    getPrjNearestPerception() {
      let data = this.$store.state.get_project.prj_nearest_perception;
      for (let i in data) {
        let obj = {
          major_name: '',
          value: 0
        }
        obj.major_name = i;
        obj.value = data[i]
        this.nearest_perception.push(obj)
      }
      this.drawPie(this.nearest_perception);
    },
    getPrjNumberChange() {
      let data = this.$store.state.get_project.prj_number_change
      debugger
      console.log(data)
    }
  },
  created() {
    this.$store.dispatch('get_project/getInitPrjRisk')
    this.$store.dispatch('get_project/getInitProjectNearestPerception')
    // this.$store.dispatch('get_project/getInitProjectNumberChange')  两个参数
    this.$store.dispatch('get_project/getInitProjectImage')

  }
}
</script>

<style scoped>
svg {
  height: 330px;
  width: 460px;
  /* // display: block;*/
  margin-left: 100px;
  /*margin: 0;*/
  z-index: 2
}
</style>