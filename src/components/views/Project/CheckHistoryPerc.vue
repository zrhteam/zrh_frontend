<template>
  <el-card class="box-card-t" shadow="never"
           style="background-color: transparent; height: 100%;">
    <div style="display: none;">
      {{ getPrjHistoryPerception }}
    </div>
    <div class="level4" style="padding-bottom: 5px; padding-left: 10px">
      <span class="level4">不同专业隐患数量</span>
    </div>
    <div class="title-line" style=""></div>
    <div id="pie2" style="height: 80%; width: 100%"></div>
    <!--          历次检查累计隐患专业占比 饼图-->
  </el-card>
</template>

<script>
import {pie_option} from "@/utils/constants";

export default {
  name: "CheckHistoryPerc",
  data() {
    return {
      myChart: null,
      doResize: null
    }
  },
  computed: {
    getPrjHistoryPerception() {
      let data = this.$store.state.get_project.prj_history_prec;
      // console.log(data)
      let arr_major = []
      for (let i in data) {
        let obj = {
          value: 0,
          name: ''
        }
        obj.name = i;
        obj.value = data[i]
        arr_major.push(obj)
      }
      return arr_major
    }
  },
  updated() {
    this.drawPieChart()
  },
  mounted() {
    // console.log(this.screenWidth)
    // const that = this
    // window.onresize = () => {
    //   return (() => {
    //     window.screenWidth = document.body.clientWidth
    //     that.screenWidth = window.screenWidth
    //   })()
    // }
    this.drawPieChart();
  },
  methods: {
    drawPieChart() {
      pie_option['series'][0]['data'] = this.getPrjHistoryPerception
      let arr = this.getPrjHistoryPerception
      let showed = arr.length ? false : true
      pie_option["title"]["show"] = showed
      pie_option["legend"]["formatter"] = function (params) {
        var legendIndex = 0;
        arr.forEach(function (v, i) {
          if (v.name == params) {
            legendIndex = i;
          }
        });
        return params + " " + arr[legendIndex].value;
      }
      let _this = this
      if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
        this.myChart.dispose() // 销毁
      }
      this.myChart = this.$echarts.init(document.getElementById('pie2'))
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(pie_option);

      this.myChart.on("click", pieConsole);

      function pieConsole(param) {
        //     获取data长度
        // console.log(pie_option.series[0].data.length);
        //      获取地N个data的值
        // 　　alert(option.series[0].data[i]);
        //     获取series中param.dataIndex事件对应的值
        // console.log(param.value);
        // console.log(param.name);
        let param2 = new URLSearchParams();
        param2.append('project_name', _this.$store.state.get_project.prj_name);
        param2.append('major', param.name);
        _this.$store.commit('get_project/changeParam2', {params: param2})
        _this.$store.commit('get_project/changeFilterMajor', {data: param.name})
        //基于项目级展示在不同专业下属于不同隐患子系统的隐患数量
        _this.$store.dispatch('get_project/getInitProjectSystem')
        //基于项目级显示在不同专业情况下，隐患区域分布的情况
        _this.$store.dispatch('get_project/getInitProjectRegionDistribution')
        // console.log(pie_option.series[param.seriesIndex].data[param.dataIndex].value);
        // console.log(pie_option.series[param.seriesIndex].data[param.dataIndex].name);
        // 　　clickFunc(param.dataIndex);//执行点击效果,触发相应js函数
        //param具体包含的方法见 https://blog.csdn.net/allenjay11/article/details/76033232
      }

      this.myChart.resize();
      this.doResize = () => {
        if (this.myChart) {
          this.myChart.resize();
        }
      }
      window.addEventListener("resize", this.doResize);
    }
  },
  beforeDestroy() {
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
  destroyed() {
    window.removeEventListener("resize", this.doResize);
  }
}
</script>

<style scoped>

</style>
