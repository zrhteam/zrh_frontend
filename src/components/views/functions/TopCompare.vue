<template>
  <!--两个对象之间不同分布区域隐患数量的对比-->
  <!--两个对象之间不同致因阶段隐患数量的对比-->
  <!--两个对象之间出现次数前top的隐患的对比-->
  <!--两个对象之间违反次数最多的法规标准的对比-->
  <!--两个对象之间出现隐患次数前top的组件的对比-->
  <!--两个对象之间出现隐患次数前top的设备的对比-->
  <!--两个对象之间出现隐患次数前top的系统的对比-->
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%; margin: 2% 2% 2% 2%">
    <div style="display: none">
      {{ getTop }}
    </div>
    <div class="text item level4" style="padding-top: 15px; padding-bottom: 15px">
      <span>{{ context.title }}</span>
      <el-button type="text" @click="dropGrantChart" v-if="!isShow" style="float: right; vertical-align: middle">取消授权
      </el-button>
      <el-select size="mini" v-model="value" v-if="isShow" filterable placeholder="授权" @change="grantChart"
                 style="max-width: 6em; float: right">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="top_value" placeholder="请选择" size="mini" style="max-width: 6em;">
        <el-option
            v-for="item in top_option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div id='id_area_o1' ref="area_chart1" style="height: 50%; width: 100%;" v-if="context.id1==='id_area_o1'"></div>
    <div id='id_area_o2' ref="area_chart2" style="height: 50%; width: 100%;" v-if="context.id2==='id_area_o2'"></div>

    <div id='id_stage_o1' ref="stage_chart1" style="height: 50%; width: 100%;" v-if="context.id1==='id_stage_o1'"></div>
    <div id='id_stage_o2' ref="stage_chart2" style="height: 50%; width: 100%;" v-if="context.id2==='id_stage_o2'"></div>

    <div id='id_risk_o1' ref="risk_chart1" style="height: 50%; width: 100%;" v-if="context.id1==='id_risk_o1'"></div>
    <div id='id_risk_o2' ref="risk_chart2" style="height: 50%; width: 100%;" v-if="context.id2==='id_risk_o2'"></div>

    <div id='id_module_top1' ref="module_chart1" style="height: 50%; width: 100%;"
         v-if="context.id1==='id_module_top1'"></div>
    <div id='id_module_top2' ref="module_chart2" style="height: 50%; width: 100%;"
         v-if="context.id2==='id_module_top2'"></div>

    <div id='id_equip_top1' ref="equip_chart1" style="height: 50%; width: 100%;"
         v-if="context.id1==='id_equip_top1'"></div>
    <div id='id_equip_top2' ref="equip_chart2" style="height: 50%; width: 100%;"
         v-if="context.id2==='id_equip_top2'"></div>

    <div id='id_system_top1' ref="system_chart1" style="height: 50%; width: 100%;"
         v-if="context.id1==='id_system_top1'"></div>
    <div id='id_system_top2' ref="system_chart2" style="height: 50%; width: 100%;"
         v-if="context.id2==='id_system_top2'"></div>
  </el-card>
</template>

<script>
import {bar_option} from "@/utils/constants";

export default {
  name: "TopCompare",
  props: ['context'],
  data() {
    return {
      o1: [],
      o2: [],
      top_value: 5,
      top_option: [
        {
          value: 3,
          key: 3
        }, {
          value: 5,
          key: 5
        }, {
          value: 7,
          key: 7
        }, {
          value: 10,
          key: 10
        }],
      isShow: true,
      options: [],
      value: '',
      // ref_arr: ['area_chart1', 'area_chart2', 'stage_chart1', 'stage_chart2', 'risk_chart1', 'risk_chart2', 'module_chart1', 'module_chart2', 'equip_chart1', 'equip_chart2', 'system_chart1', 'system_chart2']
    }
  },
  methods: {
    drawBarChart() {
      this.$nextTick(_ => {
        debugger
            let myChart = this.$echarts.init(document.getElementById(this.context.id1))
            bar_option["grid"]["bottom"] = '40%'
            bar_option["xAxis"]["axisLabel"]["rotate"] = 20
            bar_option['dataset'][0]['source'] = this.o1
            myChart.setOption(bar_option);
            myChart.resize();
            window.addEventListener('resize', () => {
              myChart.resize();
            })
            const _this = this;
            setTimeout(() => {
              myChart = this.$echarts.init(document.getElementById(this.context.id2))
              bar_option['dataset'][0]['source'] = this.o2
              myChart.setOption(bar_option);
              myChart.resize();
              window.addEventListener('resize', function () {
                myChart.resize();
              })
              erd.listenTo(document.getElementById(this.context.id2), element => {
                _this.$nextTick(() => {
                  //监听到事件后执行的业务逻辑
                  myChart.resize();
                });
              });
            }, 100)
          }
      )
    },
    filterTop() {
      // alert(this.top_value)
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
    getTop() {
      let data;
      this.o1 = []
      this.o2 = []
      if (this.context.id1 === 'id_area_o1') {
        data = this.$store.state.get_comparison.by_area
      } else if (this.context.id1 === 'id_stage_o1') {
        data = this.$store.state.get_comparison.by_stage
      } else if (this.context.id1 === 'id_risk_o1') {
        data = this.$store.state.get_comparison.by_risk_top
      } else if (this.context.id1 === 'id_module_top1') {
        data = this.$store.state.get_comparison.by_unit_top
      } else if (this.context.id1 === 'id_equip_top1') {
        data = this.$store.state.get_comparison.by_device_top
      } else if (this.context.id1 === 'id_system_top1') {
        data = this.$store.state.get_comparison.by_sys_top
      }
      let count = 0;
      for (let k in data['object1']) {
        count++
      }
      for (let i = 0; i < this.top_value; i++) {
        for (let j in data['object1']) {
          if (data['object1'][j].rank === i) {
            //   debugger
            let obj = {
              name: '',
              count: 0
            }
            obj.name = j
            obj.count = data['object1'][j].appear_time
            this.o1.push(obj)
          }
        }
      }

      count = 0;
      for (let k in data['object2']) {
        count++
      }
      for (let i = 0; i < this.top_value; i++) {
        for (let j in data['object2']) {
          if (data['object2'][j].rank === i) {
            let obj = {
              name: '',
              count: 0
            }
            obj.name = j
            obj.count = data['object2'][j].appear_time
            this.o2.push(obj)
          }
        }
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
    this.drawBarChart()
    // const self = this;//因为箭头函数会改变this指向，指向windows。所以先把this保存
    // setTimeout(() => {
    //   window.addEventListener('resize', function () {
    //     self.chart = self.$echarts.init(self.$refs.area_chart1);
    //     self.chart.resize()
    //   })
    // }, 10)
    // setTimeout(() => {
    //   window.addEventListener('resize', function () {
    //     self.chart = self.$echarts.init(self.$refs.area_chart2);
    //     self.chart.resize()
    //   })
    // }, 10)
    // setTimeout(() => {
    //   window.addEventListener('resize', function () {
    //     self.chart = self.$echarts.init(self.$refs.stage_chart1);
    //     self.chart.resize()
    //   })
    // }, 10)
    // setTimeout(() => {
    //   window.addEventListener('resize', function () {
    //     self.chart = self.$echarts.init(self.$refs.stage_chart2);
    //     self.chart.resize()
    //   })
    // }, 10)
    // setTimeout(() => {
    //   window.addEventListener('resize', function () {
    //     self.chart = self.$echarts.init(self.$refs.risk_chart1);
    //     self.chart.resize()
    //   })
    // }, 10)
    // setTimeout(() => {
    //   window.addEventListener('resize', function () {
    //     self.chart = self.$echarts.init(self.$refs.risk_chart2);
    //     self.chart.resize()
    //   })
    // }, 10)
    // setTimeout(() => {
    //   window.addEventListener('resize', function () {
    //     self.chart = self.$echarts.init(self.$refs.module_chart1);
    //     self.chart.resize()
    //   })
    // }, 10)
    // setTimeout(() => {
    //   window.addEventListener('resize', function () {
    //     self.chart = self.$echarts.init(self.$refs.module_chart2);
    //     self.chart.resize()
    //   })
    // }, 10)
    // setTimeout(() => {
    //   window.addEventListener('resize', function () {
    //     self.chart = self.$echarts.init(self.$refs.equip_chart1);
    //     self.chart.resize()
    //   })
    // }, 10)
    // setTimeout(() => {
    //   window.addEventListener('resize', function () {
    //     self.chart = self.$echarts.init(self.$refs.equip_chart2);
    //     self.chart.resize()
    //   })
    // }, 10)
    // setTimeout(() => {
    //   window.addEventListener('resize', function () {
    //     self.chart = self.$echarts.init(self.$refs.system_chart1);
    //     self.chart.resize()
    //   })
    // }, 10)
    // setTimeout(() => {
    //   window.addEventListener('resize', function () {
    //     self.chart = self.$echarts.init(self.$refs.system_chart2);
    //     self.chart.resize()
    //   })
    // }, 10)
  },
  // destroyed() {
  //   let myChart = this.$echarts.init(document.getElementById(this.context.id1))
  //   window.removeEventListener('resize', function () {
  //     myChart.resize();
  //   })
  //   myChart = this.$echarts.init(document.getElementById(this.context.id2))
  //   window.removeEventListener('resize', function () {
  //     myChart.resize();
  //   })
  // }
}
</script>

<style scoped>

</style>