<template>
  <el-card class="box-card-t" shadow="never"
           style="background-color: transparent; height: 100%;">
    <div style="display: none">
      {{ getCheckHistoryPerception }}
    </div>
    <div class="level4" style="padding-bottom: 5px; padding-left: 10px">
      <span class="level4">不同专业隐患数量</span>
    </div>
    <div class="title-line" style=""></div>
    <div id="pie2_2" style="height: 80%; width: 100%"></div>
    <!--          本次检查累计隐患专业占比 饼图-->
  </el-card>
</template>

<script>
import {pie_option} from "@/utils/constants";

export default {
  name: "CheckRiskRatio",
  computed: {
    getCheckHistoryPerception() {
      let data = this.$store.state.get_check.check_risk_ratio;
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
      // console.log(arr_major)
      // pie_option['series'][0]['data'] = arr_major
      return arr_major
    }
  },
  updated() {
    this.drawPieChart()
  },
  data() {
    return {
      myChart: null
    }
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
      let arr = this.getCheckHistoryPerception
      if (arr.length != 0) {
        pie_option['series'][0]['data'] = arr
        pie_option["legend"]["formatter"] = function (params) {
          var legendIndex = 0;
          arr.forEach(function (v, i) {
            if (v.name == params) {
              legendIndex = i;
            }
          });
          return params + " " + arr[legendIndex].value;
        }

        if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
          this.myChart.dispose() // 销毁
        }
        this.myChart = this.$echarts.init(document.getElementById('pie2_2'))
        // 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(pie_option);
        this.myChart.on("click", pieConsole);
        let _this = this

        function pieConsole(param) {
          //     获取data长度
          //      获取地N个data的值
          // 　　alert(option.series[0].data[i]);
          //     获取series中param.dataIndex事件对应的值
          let param2 = new URLSearchParams();
          param2.append('check_code', _this.$store.state.get_check.check_code);
          param2.append('major', param.name);
          _this.$store.commit('get_check/changeParam2', {params: param2})
          _this.$store.commit('get_check/changeFilterMajor', {data: param.name})
          //该检查中在不同专业下属于不同隐患子系统的隐患数量
          _this.$store.dispatch('get_check/getCheckMajorSystem')
          //该检查中在不同专业情况下，隐患区域分布的情况
          _this.$store.dispatch('get_check/getCheckMajorArea')

          // console.log(pie_option.series[param.seriesIndex].data[param.dataIndex].value);
          // console.log(pie_option.series[param.seriesIndex].data[param.dataIndex].name);
          // 　　clickFunc(param.dataIndex);//执行点击效果,触发相应js函数
          //param具体包含的方法见 https://blog.csdn.net/allenjay11/article/details/76033232
        }

        this.myChart.resize();
        window.addEventListener('resize', function () {
          if (this.myChart) {
            this.myChart.resize();
          }
        })
      } else if (document.getElementById("pie2_2")) {
        this.$nextTick(() => {
          const dom = document.getElementById(document.getElementById("pie2_2"))
          dom.innerHTML = '暂无数据'
          dom.style.color = '#ffffff'
          dom.style.fontSize = '14px'
          dom.removeAttribute("_echarts_instance_")
        })
      }
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
    window.removeEventListener('resize', function () {
      this.myChart.resize();
    })
  }
}
</script>

<style scoped>

</style>