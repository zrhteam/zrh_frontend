<template>
  <!--  检查-->
  <!--  项目-->
  <!--  区域-->
  <!--  总部-->
  <!--  按年份-->
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px">
    <div style="display: none">
      {{ getRiskLevelYear }}
    </div>
    <div class="text item level4" style="padding-top: 15px; padding-bottom: 15px">
      <span>{{ context.title }}</span>
    </div>
    <div id='check_level_year' style="height: 80%; width: 100%;" v-if="context.id==='check_level_year'"></div>
    <div id='prj_level_year' style="height: 80%; width: 100%;" v-if="context.id==='prj_level_year'"></div>
  </el-card>
</template>

<script>
import {bar_option, bar_option2} from "@/utils/constants";
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "RiskLevelYear",
  props: ['context'],
  data() {
    return {
      level_year: []
    }
  },
  methods: {
    drawBarChart() {
      this.$nextTick(_ => {
        let myChart = this.$echarts.init(document.getElementById(this.context.id))
        let arr = this.level_year
        bar_option2['dataset']['source'] = arr
        myChart.setOption(bar_option2);
        myChart.resize();
        window.addEventListener('resize', function () {
          myChart.resize();
        })
        const _this = this;
        const erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementById(this.context.id), element => {
          _this.$nextTick(() => {
            //监听到事件后执行的业务逻辑
            myChart.resize();
          });
        });
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
  computed: {
    getRiskLevelYear() {
      let data;
      this.level_year = []
      if (this.context.id == 'check_level_year') {
        data = this.$store.state.get_check.check_level_year
      } else if (this.context.id == 'prj_level_year') {
        data = this.$store.state.get_project.prj_level_year
      }
      let risk_level = ['risk_level', '高风险', '中风险', '低风险']
      if (this.level_year.length === 0) {
        this.level_year.push(risk_level)
      }
      for (let i in data) {
        let sub_arr = []
        sub_arr.push(i)
        for (let j in data[i]) {
          sub_arr.push(data[i][j])
        }
        this.level_year.push(sub_arr)
      }
      console.log('数据', this.level_year)
    },
  },
  updated() {
    this.drawBarChart()
  },
}
</script>

<style scoped>

</style>