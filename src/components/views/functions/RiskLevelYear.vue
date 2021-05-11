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
      <el-button type="text" @click="dropGrantChart" v-if="!isShow && context.id==='id_risk_level'"
                 style="float: right; vertical-align: middle">取消授权
      </el-button>
      <el-select size="mini" v-model="value" v-if="isShow && context.id==='id_risk_level'" filterable placeholder="授权"
                 @change="grantChart"
                 style="max-width: 6em; float: right">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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
import elementResizeDetectorMaker from "element-resize-detector";

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
      year_copy: ''
    }
  },
  methods: {
    drawBarChart() {
      let arr = this.level_year

      // bar_option2['dataset']['source'] = arr


      // line_option["xAxis"]["data"] = this.xdata
      // line_option["series"] = this.series
      // line_option["legend"]["data"] = this.legend
      // this.myChart.setOption(line_option);
      bar_option["dataset"][0]["source"] = this.bar_data
      this.myChart.setOption(bar_option);
      // if (arr.length != 0) {
      //   myChart.setOption(bar_option2);
      //   myChart.resize();
      //   window.addEventListener('resize', function () {
      //     this.myChart.resize();
      //   })

      // } else if (this.context.id) {
      //   this.$nextTick(() => {
      //     const dom = document.getElementById(this.context.id)
      //     dom.innerHTML = '暂无数据'
      //     dom.style.color = '#ffffff'
      //     dom.style.fontSize = '14px'
      //     dom.removeAttribute("_echarts_instance_")
      //   })
      // }
    },
    grantChart() {
      let params = new URLSearchParams();
      params.append('level', this.context.level);
      params.append('title', this.context.title);
      params.append('object1', this.$store.state.get_comparison.object1);
      params.append('object2', this.$store.state.get_comparison.object2);
      params.append('user_name', this.value);
      this.$store.commit('get_comparison/changeGrantParam', {params: params})
      this.$store.dispatch('get_comparison/postGrantInfo')
      // this.isShow = !this.isShow
    },
    dropGrantChart() {
      // this.isShow = !this.isShow
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
      if (this.context.id === 'id_risk_level') {
        this.level_year = []
        data = this.$store.state.get_comparison.by_risk_level
        // data = this.$store.state.get_headquarter.risk_level_year
        let obj = ['object']
        let high = ['高风险']
        let mid = ['中风险']
        let low = ['低风险']
        for (let i in data) {
          obj.push(i)
          high.push(data[i]['risk_level']['3'])
          mid.push(data[i]['risk_level']['2'])
          low.push(data[i]['risk_level']['1'])
        }
        this.level_year.push(obj)
        this.level_year.push(high)
        this.level_year.push(mid)
        this.level_year.push(low)
      } else {
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
        if(this.year_copy != '') {
          yy = this.year_copy
        }
        console.log(this.year_copy)
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

        // let risk_level = ['风险总量', '低风险', '中风险', '高风险']
        // let xdata = []
        // let high_risk = []
        // let mid_risk = []
        // let low_risk = []
        // let sum_risk = []
        // for (let i in data) {
        //   xdata.push(i)
        //   let temp = 0
        //   for (let j in data[i]) {
        //     if (j == '1') {
        //       low_risk.push(data[i][j])
        //       temp += data[i][j]
        //     } else if (j == '2') {
        //       mid_risk.push(data[i][j])
        //       temp += data[i][j]
        //     } else if (j == '3') {
        //       high_risk.push(data[i][j])
        //       temp += data[i][j]
        //     }
        //   }
        //   sum_risk.push(temp)
        // }
        // let series = [];
        // for (let i = 0; i < risk_level.length; i++) {
        //   let obj = {
        //     name: risk_level[i],
        //     type: 'line',
        //     stack: '总量',
        //     data: []
        //   }
        //   if (i == 1) {
        //     obj.data = low_risk
        //   } else if (i == 2) {
        //     obj.data = mid_risk
        //   } else if (i == 3) {
        //     obj.data = high_risk
        //   } else if (i == 0) {
        //     obj.data = sum_risk
        //   }
        //   series.push(obj)
        // }
        // this.xdata = xdata
        // this.series = series
        // this.legend = risk_level
      }
      if (this.context.flag === 'grant') {
        this.isShow = false
      } else if (this.context.flag === 'origin') {
        this.isShow = true
      }
      data = this.$store.state.get_comparison.all_user_name
      this.options = []
      for (let i in data) {
        let obj = {
          value: '',
          key: ''
        }
        obj.value = data[i]
        obj.key = data[i]
        this.options.push(obj)
      }
      if (this.context.flag === 'grant') {
        this.isShow = false
      } else if (this.context.flag === 'origin') {
        this.isShow = true
      }
      this.renderSign = !this.renderSign
    },
  },
  // updated() {
  //   this.drawBarChart()
  // },
  mounted() {
    this.echartContainer = this.$refs.echartContainer;
    this.myChart = this.$echarts.init(this.echartContainer)
  },
  destroyed() {
    // window.addEventListener('resize', function () {
    //   this.myChart.resize();
    // })
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

/deep/ .el-input__inner{
  height: 0.25rem;
  line-height: 0.25rem;
}

/deep/ .el-input__icon{
  height: 0.25rem;
  line-height: 0.25rem;
}
</style>
