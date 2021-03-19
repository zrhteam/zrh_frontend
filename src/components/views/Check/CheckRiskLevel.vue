<template>
  <!--  显示检查中各风险等级及其对应的隐患数量-->
  <!--  显示项目中各风险等级及其对应的隐患数量-->
  <!--  显示总部中各风险等级及其对应的隐患数量-->

  <el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%; margin: 2% 4% 0% 0%">
    <div style="display: none">
      {{ getRiskLevelData }}
    </div>
    <!--    <div class="text item level4" style="padding-top: 15px; padding-bottom: 15px">-->
    <!--      <span>历次检查累计发现隐患数量</span>-->
    <!--    </div>-->
    <!--    <div id='check_risk_level' style="height: 80%; width: 100%;"></div>-->

    <div class="text item level4" style="padding-top: 15px; padding-bottom: 15px">
      <span>{{ context.title }}</span>
    </div>
    <div id='check_risk_level' style="height: 80%; width: 100%;" v-if="context.id==='check_risk_level'"></div>
    <div id='prj_risk_level' style="height: 80%; width: 100%;" v-if="context.id==='prj_risk_level'"></div>
    <div id='head_risk_level' style="height: 80%; width: 100%;" v-if="context.id==='head_risk_level'"></div>
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";
import {bar_option} from "@/utils/constants";

export default {
  name: "CheckRiskLevel",
  data() {
    return {}
  },
  props: ['context'],
  computed: {
    getRiskLevelData() {
      let data = ''
      let dataArray = []
      if (this.context.id === 'check_risk_level') {
        data = this.$store.state.get_check.check_risk_data;
      } else if (this.context.id === 'prj_risk_level') {
        data = this.$store.state.get_project.prj_risk_data;
      } else if (this.context.id === 'head_risk_level') {
        data = this.$store.state.get_headquarter.risk_level_data;
        console.log("aaa", data)
      }
      if ('risk_level' in data) {
        data = data['risk_level']
        let obj1 = {
          name: '低风险',
          count: 0
        }
        let obj2 = {
          name: '中风险',
          count: 0
        }
        let obj3 = {
          name: '高风险',
          count: 0
        }
        obj1.count = data['1']
        obj2.count = data['2']
        obj3.count = data['3']
        dataArray.push(obj3)
        dataArray.push(obj2)
        dataArray.push(obj1)
      }
      return dataArray
    }
  },
  updated() {
    this.drawBarChart()
  }, mounted() {
    this.drawBarChart();
  },

  methods: {
    drawBarChart() {
      let myChart = this.$echarts.init(document.getElementById(this.context.id))
      let arr = this.getRiskLevelData
      bar_option["grid"]["y2"] = "20%"
      bar_option["dataset"]["source"] = arr
      if (arr.length != 0) {
        myChart.setOption(bar_option);
        myChart.resize();
        window.addEventListener('resize', function () {
          myChart.resize();
        })
        const _this = this;
        const erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementById('check_risk_level'), element => {
          _this.$nextTick(() => {
            myChart.resize();
          });
        });
      } else if (this.context.id) {
        this.$nextTick(() => {
          const dom = document.getElementById(this.context.id)
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