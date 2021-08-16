<template>
  <!--每个项目历次检查的指数，放到项目级默认下的地图下面-->
  <el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%;">
    <div class="level4" style="padding-bottom: 5px; padding-left: 10px">
      <span class="level4">各区域高风险数量</span>
    </div>
    <div class="title-line" style=""></div>
    <!--      <div id="mydiv2">-->
    <div style="display: none">
      {{ getNumberHistogram }}
    </div>
    <!--        <svg></svg>-->
    <div id="number_histogram" style="height: 80%; width: 100%"></div>
    <!--      </div>-->

  </el-card>

</template>

<script>
// import * as d3 from "d3/dist/d3";
import echarts from "echarts";
import {bar_option3, pie_option} from "@/utils/constants";

export default {
  name: "HighProjectRisk",
  data() {
    return {
      myChart: null,
      doResize: null
    }
  },
  computed: {
    getNumberHistogram() {
      var data = this.$store.state.get_headquarter.risk_number_rank
      var arr = []
      // 判断是否需要脱敏
      if (this.$store.state.get_login.masking == true) {
        var range = this.$store.state.get_login.hide_tag
        var value = this.$store.state.get_headquarter.head_name.value
        var sub_range = {}
        range.forEach(function (item) {
          if (item.value == value) {
            sub_range = item
            return
          }
        })
        for (var i in data) {
          var obj = {
            name: '',
            count: 0
          }
          var aa = {}
          sub_range['children'].forEach(function (item) {
            if(item.value == i) {
              aa = item
              return
            }
          })
          obj.name = aa.label;
          obj.count = data[i]['high_risk_count'];
          arr.push(obj)
        }
      } else if (this.$store.state.get_login.masking == false) {
        for (var i in data) {
          let obj = {
            name: '',
            count: 0
          }
          obj.name = i;
          obj.count = data[i]['high_risk_count'];
          arr.push(obj)
        }
      }
      arr.sort(this.sortNumber('count', true))
      bar_option3["dataset"]["source"] = arr
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
      this.$nextTick(_ => {
        let showed = this.getNumberHistogram.length ? false : true
        bar_option3["title"]["show"] = showed
        // if (this.getNumberHistogram.length != 0) {
        this.myChart = this.$echarts.init(document.getElementById('number_histogram'))
        // 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(bar_option3);
        this.myChart.resize();
        this.doResize = () => {
          if (this.myChart) {
            this.myChart.resize();
          }
        }
        window.addEventListener("resize", this.doResize);
      })
    },
    fontSize(res) {
      let docEl = document.documentElement,
          clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
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
    window.removeEventListener('resize', this.doResize)
    if (this.myChart) {
      this.myChart.dispose();
      this.myChart = null;
    }
  }
}
</script>

<style scoped>

</style>