<template>
  <el-card class="box-card boundary-C" shadow="never"
           style="background-color: transparent; height: 100%; left: 10%; top: 10%">
    <div style="display: none">
      {{ getPrjHistory }}
    </div>
    <div class="level4">
      <span>历次检查隐患数量变化</span>
    </div>
    <div id="history_chart" style="height: 100%; width: 100%; display: block"></div>
  </el-card>
</template>

<script>
import {bar_option} from "@/utils/constants";

export default {
  name: "CheckedHistory",
  data() {
    return {
      myChart: null
    }
  },
  computed: {
    getPrjHistory() {
      let data = this.$store.state.get_project.prj_number_change;
      // console.log('licichange', data)
      let arr = []
      for (let i in data) {
        let obj = {
          count: 0,
          name: ''
        }
        obj.name = data[i].start_time;
        obj.count = data[i].risk_num
        arr.push(obj)
      }
      // console.log(arr)
      arr.sort(this.sortNumber('count', true))
      return arr
    }
  },

  updated() {
    this.drawBarChart()
  },

  mounted() {
    this.drawBarChart();
  },
  methods: {
    drawBarChart() {
      // document.getElementById('history_chart').innerHTML = ''
      if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
          this.myChart.dispose() // 销毁
      }
      this.myChart = this.$echarts.init(document.getElementById('history_chart'))
      bar_option['dataset']['source'] = this.getPrjHistory
      bar_option["xAxis"]["axisLabel"]["rotate"] = 0
      this.myChart.setOption(bar_option);
      this.myChart.resize();
      window.addEventListener('resize', () => {
        this.myChart.resize();
      })
    },
    sortNumber(attr, rev) {
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = (rev) ? 1 : -1;
      }

      return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
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
    window.removeEventListener("resize", () => {
        this.myChart.resize();
      });
  }
}
</script>

<style scoped>

</style>