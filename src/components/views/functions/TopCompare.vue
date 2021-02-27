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
      <el-button type="text" @click="grantChart" style="float: right; vertical-align: middle">授权</el-button>
      <el-select v-model="top_value" placeholder="请选择" size="mini" style="max-width: 8em;">
        <el-option
            v-for="item in top_option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div id='id_area_o1' style="height: 50%; width: 100%;" v-if="context.id1==='id_area_o1'"></div>
    <div id='id_area_o2' style="height: 50%; width: 100%;" v-if="context.id2==='id_area_o2'"></div>

    <div id='id_stage_o1' style="height: 50%; width: 100%;" v-if="context.id1==='id_stage_o1'"></div>
    <div id='id_stage_o2' style="height: 50%; width: 100%;" v-if="context.id2==='id_stage_o2'"></div>

    <div id='id_risk_o1' style="height: 50%; width: 100%;" v-if="context.id1==='id_risk_o1'"></div>
    <div id='id_risk_o2' style="height: 50%; width: 100%;" v-if="context.id2==='id_risk_o2'"></div>

    <div id='id_module_top1' style="height: 50%; width: 100%;" v-if="context.id1==='id_module_top1'"></div>
    <div id='id_module_top2' style="height: 50%; width: 100%;" v-if="context.id2==='id_module_top2'"></div>

    <div id='id_equip_top1' style="height: 50%; width: 100%;" v-if="context.id1==='id_equip_top1'"></div>
    <div id='id_equip_top2' style="height: 50%; width: 100%;" v-if="context.id2==='id_equip_top2'"></div>

    <div id='id_system_top1' style="height: 50%; width: 100%;" v-if="context.id1==='id_system_top1'"></div>
    <div id='id_system_top2' style="height: 50%; width: 100%;" v-if="context.id2==='id_system_top2'"></div>

  </el-card>
</template>

<script>
import {bar_option} from "@/utils/constants";
import elementResizeDetectorMaker from "element-resize-detector";

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
    }
  },
  methods: {
    drawBarChart() {
      this.$nextTick(_ => {
            let myChart = this.$echarts.init(document.getElementById(this.context.id1))
            bar_option['dataset']['source'] = this.o1
            myChart.setOption(bar_option);
            myChart.resize();
            window.addEventListener('resize', function () {
              myChart.resize();
            })
            const _this = this;
            const erd = elementResizeDetectorMaker();
            erd.listenTo(document.getElementById(this.context.id1), element => {
              _this.$nextTick(() => {
                //监听到事件后执行的业务逻辑
                myChart.resize();
              });
            });

            myChart = this.$echarts.init(document.getElementById(this.context.id2))
            bar_option['dataset']['source'] = this.o2
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
      params.append('object1', this.o1);
      params.append('object2', this.o2);
      this.$store.commit('get_comparison/changeGrantParam', {params: params})
      this.$store.dispatch('get_comparison/postGrantInfo')
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
    },
  },
  updated() {
    this.drawBarChart()
  },
}
</script>

<style scoped>

</style>