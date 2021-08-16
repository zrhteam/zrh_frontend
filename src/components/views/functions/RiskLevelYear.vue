<template>
  <!--  检查-->
  <!--  项目-->
  <!--  区域-->
  <!--  总部-->
  <!--  按年份-->
  <el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%;">
    <div style="display: none">
      {{ getRiskLevelYear }}
    </div>
    <div class="text item level4" style="padding-bottom: 5px">
      <span class="level4" style="padding-right: 5px">{{ context.title }}</span>
      <el-select v-model="year" placeholder="请选择" size="mini" style="max-width: 8em;"
                 @change="filterYear">
        <el-option
            v-for="item in year_option"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="title-line" style=""></div>
    <div ref='echartContainer' style="height: 80%; width: 100%;"/>
    <!--    <div id='check_level_year' style="height: 80%; width: 100%;" v-if="context.id==='check_level_year'"></div>-->
    <!--    <div id='prj_level_year' style="height: 80%; width: 100%;" v-if="context.id==='prj_level_year'"></div>-->
    <!--    <div id='region_level_year' style="height: 80%; width: 100%;" v-if="context.id==='region_level_year'"></div>-->
    <!--    <div id='head_level_year' style="height: 80%; width: 100%;" v-if="context.id==='head_level_year'"></div>-->
    <!--    &lt;!&ndash;    两个对象之间各风险等级隐患数量的对比&ndash;&gt;-->
    <!--    <div id='id_risk_level' style="height: 80%; width: 100%;" v-if="context.id==='id_risk_level'"></div>-->
  </el-card>
</template>

<script>
import {line_option, bar_option2, bar_option} from "@/utils/constants";

export default {
  name: "RiskLevelYear",
  props: ['context'],
  data() {
    return {
      xdata: [],//封装x轴
      series: [],//封装数据
      legend: [],
      level_year: [],
      isShow: true,
      options: [],
      value: [],
      echartContainer: null,
      myChart: null,
      renderSign: false,
      bar_data: [],
      year: '',
      year_option: [],
      year_copy: '',
      doResize: null
    }
  },
  methods: {
    drawBarChart() {
      window.addEventListener("resize", this.doResize);
      if (this.bar_data.length != 0) {
        this.echartContainer = this.$refs.echartContainer;
        this.echartContainer.style.top = '0%'
        this.myChart = this.$echarts.init(this.echartContainer)
        bar_option["dataset"][0]["source"] = this.bar_data
        this.myChart.setOption(bar_option);
        this.doResize = () => {
          if (this.myChart) {
            this.myChart.resize();
          }
        }
      } else if (this.bar_data.length == 0) {
        this.$nextTick(() => {
          const dom = this.$refs.echartContainer
          dom.innerHTML = '暂无数据'
          dom.style.color = '#ABA9B6'
          dom.style.fontSize = '14px'
          dom.style.display = 'block'
          dom.style.top = '36%'
          dom.style.position = 'relative'
          dom.removeAttribute("_echarts_instance_")
        })
      }
    },
    filterYear(value) {
      this.year_copy = value
    }
  },
  watch: {
    renderSign() {
      this.drawBarChart()
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
      } else if (this.context.id == 'region_level_year') {
        data = this.$store.state.get_region.risk_level_year
      } else if (this.context.id == 'head_level_year') {
        data = this.$store.state.get_headquarter.risk_level_year
      }
      let myDate = new Date();
      let yy = String(myDate.getFullYear());
      if (this.year_copy != '') {
        yy = this.year_copy
      }
      this.bar_data = []
      let flag = false
      if (data[yy] == undefined) {
        flag = true
      }
      this.year_option = []
      for (let i in data) {
        this.year_option.push(i)
      }
      for (let i in data) {
        if (i == yy || flag == true) {
          let obj = {
            name: '风险总量',
            count: 0
          }
          for (let j in data[i]) {
            let sub_obj = {
              name: '',
              count: 0
            }
            if (j == '1') {
              sub_obj.name = '低风险'
              sub_obj.count = data[i][j]
              obj.count += data[i][j]
            } else if (j == '2') {
              sub_obj.name = '中风险'
              sub_obj.count = data[i][j]
              obj.count += data[i][j]
            } else if (j == '3') {
              sub_obj.name = '高风险'
              sub_obj.count = data[i][j]
              obj.count += data[i][j]
            }
            this.bar_data.push(sub_obj)
          }
          if (obj.count == 0) {
            flag = true
          } else {
            this.bar_data.push(obj)
            this.year = i
          }
        }
      }
      this.renderSign = !this.renderSign
    },
  },
  mounted() {
    if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
      this.myChart.dispose() // 销毁
    }
    this.echartContainer = this.$refs.echartContainer;
    this.myChart = this.$echarts.init(this.echartContainer)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.doResize);

    if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
      this.myChart.dispose() // 销毁
    }
    this.myChart = null
  }
}
</script>

<style scoped>
/deep/ .el-cascader--mini {
  line-height: 0.25rem;
}

/deep/ .el-input--suffix {
  height: 0.25rem;
  line-height: 0.25rem;
}

/deep/ .el-input__inner {
  height: 0.25rem;
  line-height: 0.25rem;
}

/deep/ .el-input__icon {
  height: 0.25rem;
  line-height: 0.25rem;
}
</style>
