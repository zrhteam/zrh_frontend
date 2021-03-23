<template>
  <el-card class="box-card boundary-C" shadow="never"
           style="background-color: transparent; height: 100%; left: 10%; top: 10%">
    <div style="display: none">
      {{ getCheckHistoryPerception }}
    </div>
    <div class="level4">
      <span>不同专业隐患数量</span>
    </div>
    <div id="pie2_2" style="height: 100%; width: 100%"></div>
    <!--          本次检查累计隐患专业占比 饼图-->
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";
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
      pie_option['series'][0]['data'] = arr_major
      return pie_option
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
      if (this.getCheckHistoryPerception['series'][0]["data"].length != 0) {
        let myChart = this.$echarts.init(document.getElementById('pie2_2'))
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.getCheckHistoryPerception);
        myChart.resize();
        window.addEventListener('resize', function () {
          myChart.resize();
        })
        const _this = this;
        const erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementById("pie2_2"), element => {
          _this.$nextTick(() => {
            //监听到事件后执行的业务逻辑
            myChart.resize();
          });
        });
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
  }
}
</script>

<style scoped>

</style>