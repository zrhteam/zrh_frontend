<template>
  <!--  总部级-->
  <!--  按照检查次数对区域排名-->
  <!--  展示按照项目数量对区域排名-->

  <!--  区域级-->
  <!--  属于同一总部该区域内每个项目的高风险隐患数量-->
  <!--  返回该区域每个项目的检查次数-->
  <!--  不同子系统隐患数量-->

  <!--  项目级-->
  <!--  不同子系统隐患数量-->
  <!--  检查级-->
  <!--  不同子系统隐患数量-->
  <el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%;">
    <div style="display: none">
      {{ getData }}
    </div>
    <div class="level4" style="padding-bottom: 5px; padding-left: 10px">
      <span class="level4">{{ context.title }}</span>
    </div>
    <div class="title-line" style=""></div>
    <div ref='barEchartContainer' style="height: 80%; width: 100%;"/>
  </el-card>
</template>

<script>
import {bar_option, bar_option3} from "@/utils/constants";
import echarts from "echarts";

export default {
  name: "BarRank",
  props: ['context'],
  data() {
    return {
      option: '',
      barEchartContainer: null,
      myChart: null,
      arr: [],
      renderSign: false
    }
  },
  methods: {
    fontSize(res) {
      let docEl = document.documentElement,
          clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    },
    doResize() {
      if (this.myChart != null) { // 如果不存在，就进行初始化
          this.myChart.resize();
        }
    },
    drawBarChart() {
      let arr = this.arr
      arr.sort(this.sortNumber('count', true))
      if (this.myChart == null || this.myChart == "" || this.myChart == undefined) {
        this.barEchartContainer = this.$refs.barEchartContainer;
        this.myChart = this.$echarts.init(this.barEchartContainer)
      }
      if (this.context.id == 'id_head_rank1' || this.context.id == 'id_project_system' || this.context.id == 'id_check_system' || this.context.id == 'id_region_rank1' || this.context.id == 'id_region_rank2' || this.context.id == 'id_region_system') {
        if (this.context.id == 'id_project_system' || this.context.id == 'id_check_system' || this.context.id == 'id_region_rank1' || this.context.id == 'id_region_rank2' || this.context.id == 'id_region_system') {
          bar_option3["grid"]["bottom"] = this.fontSize(0.35)
          if (arr.length != 0) {
            bar_option3["series"][0]["barCategoryGap"] = this.fontSize(0.8 / arr.length)
          }
          // }else if(this.context.id == 'id_region_rank2') {
          //   bar_option3["series"][0]["barCategoryGap"] = this.fontSize(0.8/arr.length)
        }
        let showed = arr.length ? false : true
        bar_option3["title"]["show"] = showed
        bar_option3["dataset"]["source"] = arr
        this.myChart.setOption(bar_option3);
      } else {
        let showed = arr.length ? false : true
        bar_option["title"]["show"] = showed
        bar_option["dataset"][0]["source"] = arr
        bar_option["xAxis"]["axisLabel"]["rotate"] = 0
        bar_option["grid"]["y2"] = '30%'
        bar_option["series"][0]["barCategoryGap"] = String(this.fontSize(2.6 / arr.length))
        // bar_option["series"][0]["barCategoryGap"] = '50'
        this.myChart.setOption(bar_option);
      }
      this.myChart.resize();
      window.addEventListener("resize", this.doResize);
    },
    // filterMajor(value) {
    //   let param2 = new URLSearchParams();
    //   var obj = {};
    //   //使用find()方法在下拉数据中根据value绑定的数据查找对象
    //   obj = this.option.find(function (item) {
    //     return item.value === value;
    //   })
    //   if (obj.label === '全部专业') {
    //     param2.append('major', 'all');
    //   } else {
    //     param2.append('major', obj.label);
    //   }
    //   if (this.context.id == 'id_region_system') {
    //     param2.append('region_name', this.$store.state.get_region.region_name);
    //     this.$store.commit('get_region/changeParam2', {params: param2})
    //     //显示该区域不同专业下各系统隐患占比情况
    //     this.$store.dispatch('get_region/getRegionSystemRatio')
    //   } else if (this.context.id == 'id_project_system') {
    //     param2.append('project_name', this.$store.state.get_project.prj_name);
    //     this.$store.commit('get_project/changeParam2', {params: param2})
    //     //基于项目级展示在不同专业下属于不同隐患子系统的隐患数量
    //     this.$store.dispatch('get_project/getInitProjectSystem')
    //   } else if (this.context.id == 'id_check_system') {
    //     //该检查中在筛选专业条件下属于不同隐患子系统的隐患数量
    //     param2.append('check_code', this.$store.state.get_check.check_code);
    //     this.$store.commit('get_check/changeParam2', {params: param2})
    //     this.$store.dispatch('get_check/getCheckMajorSystem')
    //   }
    // },
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
    },
  },
  computed: {
    getData() {
      var data;
      var arr = [];
      if ((this.context.id == 'id_head_rank1') || (this.context.id == 'id_head_rank2')) {
        if (this.context.id == 'id_head_rank1') {
          data = this.$store.state.get_headquarter.rank_by_check
        } else if (this.context.id == 'id_head_rank2') {
          data = this.$store.state.get_headquarter.rank_by_prj
        }
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
            var aa = {label: i}
            sub_range['children'].forEach(function (item) {
              if (item.value == i) {
                aa = item
                return
              }
            })
            obj['name'] = aa.label
            obj['count'] = data[i]
            arr.push(obj)
          }
        } else if (this.$store.state.get_login.masking == false) {
          for (var i in data) {
            var obj = {
              name: '',
              count: 0
            }
            obj['name'] = i
            obj['count'] = data[i]
            arr.push(obj)
          }
        }
      } else if ((this.context.id == 'id_region_rank1') || (this.context.id == 'id_region_rank2')) {
        if (this.context.id == 'id_region_rank1') {
          data = this.$store.state.get_region.high_risk_rank
        } else if (this.context.id === 'id_region_rank2') {
          data = this.$store.state.get_region.rank_by_check
        }
        // 判断是否需要脱敏
        if (this.$store.state.get_login.masking == true) {
          var range = this.$store.state.get_login.hide_tag
          var value = this.$store.state.get_region.region_name.value
          var sub_range = {}
          range.forEach(function (item) {
            item['children'].forEach(function (sub_item) {
              if (sub_item.value == value) {
                sub_range = sub_item
                return
              }
            })
            return
          })
          for (var i in data) {
            var obj = {
              name: '',
              count: 0
            }
            var aa = {}
            sub_range['children'].forEach(function (item) {
              if (item.value == i) {
                aa = item
                return
              }
            })
            obj['name'] = aa.label
            obj['count'] = data[i].count
            arr.push(obj)
          }
        } else if (this.$store.state.get_login.masking == false) {
          for (var i in data) {
            var obj = {
              name: '',
              count: 0
            }
            obj['name'] = i
            obj['count'] = data[i].count
            arr.push(obj)
          }
        }
      } else if ((this.context.id == 'id_region_system') || (this.context.id == 'id_project_system') || (this.context.id == 'id_check_system')) {
        if (this.context.id == 'id_region_system')
          data = this.$store.state.get_region.region_sys_ratio
        else if (this.context.id == 'id_project_system')
          data = this.$store.state.get_project.prj_system
        else if (this.context.id == 'id_check_system')
          data = this.$store.state.get_check.check_system
        for (let i in data) {
          for (let j in data[i]) {
            let obj = {
              name: '',
              count: ''
            }
            obj['name'] = j;
            obj['count'] = data[i][j]
            arr.push(obj)
          }
        }
        let major = []
        let filter = []
        let count = 0
        for (let i in data) {
          if (filter.indexOf(i) === -1) {
            filter.push(i)
            let obj = {
              value: '',
              label: ''
            }
            obj['value'] = count++;
            obj['label'] = i
            major.push(obj)
          }
        }
        let obj = {
          value: '',
          label: ''
        }
        obj['value'] = '全部专业';
        obj['label'] = '全部专业'
        major.push(obj)
        let old_major = this.$store.state.get_region.all_majors
        if (old_major.length < major.length) {
          this.$store.commit('get_region/changeAllMajors', {all_majors: major})
          this.option = major
        } else {
          this.option = this.$store.state.get_region.all_majors
        }
      }
      this.renderSign = !this.renderSign
      this.arr = arr
    },
  },
  // updated() {
  //   this.drawBarChart()
  // },
  mounted() {
    this.barEchartContainer = this.$refs.barEchartContainer;
    this.myChart = this.$echarts.init(this.barEchartContainer)
    // this.drawBarChart()
  },
  watch: {
    renderSign() {
      this.drawBarChart()
    }
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

</style>
