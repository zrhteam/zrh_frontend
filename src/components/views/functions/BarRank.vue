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
    <div class="level4" style="padding-top: 15px; padding-bottom: 15px; padding-left: 10px">
      <span class="level4">{{ context.title }}</span>
      <!--      <el-select v-if="show" v-model="value" placeholder="请选择" size="mini" style="max-width: 8em;"-->
      <!--                 @change="filterMajor">-->
      <!--        <el-option-->
      <!--            v-for="item in option"-->
      <!--            :key="item.value"-->
      <!--            :label="item.label"-->
      <!--            :value="item.value">-->
      <!--        </el-option>-->
      <!--      </el-select>-->
    </div>
    <div id="id_head_rank1" style="height: 90%; width: 100%" v-if="context.id==='id_head_rank1'">
    </div>
    <div id="id_head_rank2" style="height: 80%; width: 100%" v-if="context.id==='id_head_rank2'">
    </div>
    <div id="id_region_rank1" style="height: 80%; width: 100%" v-if="context.id==='id_region_rank1'">
    </div>
    <div id="id_region_rank2" style="height: 80%; width: 100%" v-if="context.id==='id_region_rank2'">
    </div>
    <div id="id_region_system" style="height: 80%; width: 100%" v-if="context.id==='id_region_system'">
    </div>
    <div id="id_project_system" style="height: 80%; width: 100%" v-if="context.id==='id_project_system'">
    </div>
    <div id="id_check_system" style="height: 80%; width: 100%" v-if="context.id==='id_check_system'">
    </div>
  </el-card>
</template>

<script>
import {bar_option} from "@/utils/constants";
import elementResizeDetectorMaker from "element-resize-detector";
import echarts from "echarts";

export default {
  name: "BarRank",
  props: ['context'],
  data() {
    return {
      option: '',
    }
  },
  methods: {
    drawBarChart() {
      this.$nextTick(_ => {
        let myChart;
        myChart = this.$echarts.init(document.getElementById(this.context.id))
        let arr = this.getData
        if (arr.length != 0) {
          arr.sort(this.sortNumber('count', true))
          if (this.context.id == 'id_head_rank1') {
            let option = {
              dataset: {
                // dimensions: ['name', 'count'],
                source: arr
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow',
                }
              },
              grid: {containLabel: true},
              xAxis: {
                name: 'amount',
                axisLabel: {
                  interval: 0,
                  textStyle: {
                    fontSize: 10
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: '#ffffff',
                    fontSize: 8
                  }
                },
                splitLine: {
                  show: false
                }
              },
              yAxis: {
                type: 'category',
                axisLine: {
                  lineStyle: {
                    color: '#ffffff'
                  }
                },
                splitLine: {
                  show: false
                }
              },
              series: [
                {
                  type: 'bar',
                  encode: {
                    // Map the "amount" column to X axis.
                    x: 'count',
                    // Map the "product" column to Y axis
                    y: 'name'
                  },
                  itemStyle: {
                    normal: {
                      //柱形图圆角，初始化效果
                      barBorderRadius: [0, 10, 10, 0],
                      color: new echarts.graphic.LinearGradient(
                          1, 0, 0, 0,
                          [
                            {offset: 0, color: '#23dbdc'},
                            // {offset: 0.5, color: '#1f77a0'},
                            {offset: 1, color: '#1860b4'}
                          ]
                      )
                    }
                  },
                  emphasis: {
                    itemStyle: {
                      color: '#40abc4'
                    }
                  },
                  // barMaxWidth: 20,
                  barCategoryGap: '10',
                }
              ]
            };
            myChart.setOption(option);
          } else {
            bar_option['dataset']['source'] = arr
            bar_option["xAxis"]["axisLabel"]["rotate"] = 0
            bar_option["grid"]["y2"] = '30%'
            bar_option["series"][0]["barCategoryGap"] = '50'
            myChart.setOption(bar_option);
          }

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
    filterMajor(value) {
      let param2 = new URLSearchParams();
      var obj = {};
      //使用find()方法在下拉数据中根据value绑定的数据查找对象
      obj = this.option.find(function (item) {
        return item.value === value;
      })
      if (obj.label === '全部专业') {
        param2.append('major', 'all');
      } else {
        param2.append('major', obj.label);
      }
      if (this.context.id == 'id_region_system') {
        param2.append('region_name', this.$store.state.get_region.region_name);
        this.$store.commit('get_region/changeParam2', {params: param2})
        //显示该区域不同专业下各系统隐患占比情况
        this.$store.dispatch('get_region/getRegionSystemRatio')
      } else if (this.context.id == 'id_project_system') {
        param2.append('project_name', this.$store.state.get_project.prj_name);
        this.$store.commit('get_project/changeParam2', {params: param2})
        //基于项目级展示在不同专业下属于不同隐患子系统的隐患数量
        this.$store.dispatch('get_project/getInitProjectSystem')
      } else if (this.context.id == 'id_check_system') {
        //该检查中在筛选专业条件下属于不同隐患子系统的隐患数量
        param2.append('check_code', this.$store.state.get_check.check_code);
        this.$store.commit('get_check/changeParam2', {params: param2})
        this.$store.dispatch('get_check/getCheckMajorSystem')
      }
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
  },
  computed: {
    getData() {
      let data;
      let arr = [];
      if ((this.context.id == 'id_head_rank1') || (this.context.id == 'id_head_rank2')) {
        if (this.context.id == 'id_head_rank1') {
          data = this.$store.state.get_headquarter.rank_by_check
        } else if (this.context.id == 'id_head_rank2') {
          data = this.$store.state.get_headquarter.rank_by_prj
        }
        for (let i in data) {
          let obj = {
            name: '',
            count: 0
          }
          obj['name'] = i
          obj['count'] = data[i]
          arr.push(obj)
        }
      } else if ((this.context.id == 'id_region_rank1') || (this.context.id == 'id_region_rank2')) {
        if (this.context.id == 'id_region_rank1') {
          data = this.$store.state.get_region.high_risk_rank
        } else if (this.context.id === 'id_region_rank2') {
          data = this.$store.state.get_region.rank_by_check
        }
        for (let i in data) {
          let obj = {
            name: '',
            count: 0
          }
          obj['name'] = i
          obj['count'] = data[i].count
          arr.push(obj)
        }
      } else if ((this.context.id == 'id_region_system') || (this.context.id == 'id_project_system') || (this.context.id == 'id_check_system')) {
        this.show = true
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
      return arr
    },
  },
  updated() {
    this.drawBarChart()
  },
  mounted() {
    this.drawBarChart()
  },
}
</script>

<style scoped>

</style>