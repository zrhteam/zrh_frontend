<template>
  <!--  检查-->
  <!--  项目-->
  <!--  区域-->
  <!--  总部-->
  <!--  按年份-->
  <el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%; margin: 2%">
    <div style="display: none">
      {{ getRiskLevelYear }}
    </div>
    <div class="text item level4" style="padding-top: 15px; padding-bottom: 15px">
      <span>{{ context.title }}</span>
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
    <div id='check_level_year' style="height: 80%; width: 100%;" v-if="context.id==='check_level_year'"></div>
    <div id='prj_level_year' style="height: 80%; width: 100%;" v-if="context.id==='prj_level_year'"></div>
    <div id='region_level_year' style="height: 80%; width: 100%;" v-if="context.id==='region_level_year'"></div>
    <div id='head_level_year' style="height: 80%; width: 100%;" v-if="context.id==='head_level_year'"></div>
    <!--    两个对象之间各风险等级隐患数量的对比-->
    <div id='id_risk_level' style="height: 80%; width: 100%;" v-if="context.id==='id_risk_level'"></div>
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
      level_year: [],
      isShow: true,
      options: [],
      value: []
    }
  },
  methods: {
    drawBarChart() {
      this.$nextTick(_ => {
        let myChart = this.$echarts.init(document.getElementById(this.context.id))
        let arr = this.level_year
        if (this.context.id === 'id_risk_level') {
          bar_option2["series"] = [
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [10, 10, 0, 0],
                  color: "#4992ff"
                }
              },
              barMaxWidth: 40
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [10, 10, 0, 0],
                  color: '#05c091'
                }
              },
              barMaxWidth: 40
            }
          ]
        }
        bar_option2['dataset']['source'] = arr
        if (arr.length != 0) {
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
        } else if (this.context.id) {
          this.$nextTick(() => {
            const dom = document.getElementById(this.context.id)
            dom.innerHTML = '暂无数据'
            dom.style.color = '#ffffff'
            dom.style.fontSize = '14px'
            dom.removeAttribute("_echarts_instance_")
          })
        }
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
    },
  },
  updated() {
    this.drawBarChart()
  },
  mounted() {
    this.drawBarChart();
  },
  destroyed() {
    let myChart = this.$echarts.init(document.getElementById(this.context.id))
    window.addEventListener('resize', function () {
      myChart.resize();
    })
  }
}
</script>

<style scoped>

</style>