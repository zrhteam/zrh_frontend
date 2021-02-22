<template>
  <!--两个对象之间不同专业隐患数量的对比-->
  <!--两个对象之间在同一专业下不同系统的隐患数量的对比-->
  <!--两个对象之间不同设备隐患数量的对比-->
  <!--两个对象之间不同组件隐患数量的对比-->
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%; margin: 2% 2% 2% 2%">
    <div style="display: none">
      {{ getTop }}
    </div>
    <div class="text item level4" style="padding-top: 15px; padding-bottom: 15px">
      <span>{{ context.title }}</span>
    </div>
    <el-col :span="6" style="height: 100%">
      <div id='id_major_o1' style="height: 50%;"></div>
      <div id='id_major_o2' style="height: 50%;"></div>
    </el-col>
    <el-col :span="6" style="height: 100%">
      <div id='id_sys_o1' style="height: 50%;"></div>
      <div id='id_sys_o2' style="height: 50%;"></div>
    </el-col>
    <el-col :span="6" style="height: 100%">
      <div id='id_equip_o1' style="height: 50%;"></div>
      <div id='id_equip_o2' style="height: 50%;"></div>
    </el-col>
    <el-col :span="6" style="height: 100%">
      <div id='id_module_o1' style="height: 50%;"></div>
      <div id='id_module_o2' style="height: 50%;"></div>
    </el-col>
    <!--    <div id='region_level_year' style="height: 80%; width: 100%;" v-if="context.id==='region_level_year'"></div>-->
    <!--    <div id='head_level_year' style="height: 80%; width: 100%;" v-if="context.id==='head_level_year'"></div>-->
    <!--    &lt;!&ndash;    两个对象之间各风险等级隐患数量的对比&ndash;&gt;-->
    <!--    <div id='id_risk_level' style="height: 80%; width: 100%;" v-if="context.id==='id_risk_level'"></div>-->
  </el-card>
</template>

<script>
import {bar_option} from "@/utils/constants";
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "DrillDown",
  props: ['context'],
  data() {
    return {
      o1: [],
      o2: [],
      major_o1: [],
      major_o2: [],
    }
  },
  methods: {
    drawBarChart() {
      this.$nextTick(_ => {
            let myChart = this.$echarts.init(document.getElementById(this.context.id1))
            bar_option['dataset']['source'] = this.major_o1
            myChart.setOption(bar_option);

            let data = this.$store.state.get_comparison.by_major
            let _this = this
            myChart.on('click', function (params) {
              let sys = []
              for (let i in data['object1']) {
                if (i === params.name) {
                  for (let j in data['object1'][i]['system']) {
                    let obj = {
                      name: '',
                      count: 0,
                      obj: 'object1',
                      level: 'system'
                    }
                    obj['name'] = j
                    obj['count'] = data['object1'][i]['system'][j].appear_time
                    sys.push(obj)
                  }
                }
              }
              _this.nextDrawBarChart('id_sys_o1', sys)
            })

            myChart.resize();
            window.addEventListener('resize', function () {
              myChart.resize();
            })
            _this = this;
            const erd = elementResizeDetectorMaker();
            erd.listenTo(document.getElementById(this.context.id1), element => {
              _this.$nextTick(() => {
                //监听到事件后执行的业务逻辑
                myChart.resize();
              });
            });

            myChart = this.$echarts.init(document.getElementById(this.context.id2))
            bar_option['dataset']['source'] = this.major_o2
            myChart.setOption(bar_option);

            myChart.on('click', function (params) {
              let sys = []
              for (let i in data['object2']) {
                if (i === params.name) {
                  for (let j in data['object2'][i]['system']) {
                    let obj = {
                      name: '',
                      count: 0,
                      obj: 'object2',
                      level: 'system'
                    }
                    obj['name'] = j
                    obj['count'] = data['object2'][i]['system'][j].appear_time
                    sys.push(obj)
                  }
                }
              }
              _this.nextDrawBarChart('id_sys_o2', sys)
            })

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
    nextDrawBarChart(id, arr) {
      this.$nextTick(_ => {
            console.log('arr', arr)
            let myChart = this.$echarts.init(document.getElementById(id))
            bar_option['dataset']['source'] = arr
            myChart.setOption(bar_option);

            let data = this.$store.state.get_comparison.by_major
            let _this = this
            myChart.on('click', function (params) {
              let arr = []
              if (params.data.level === 'system') {
                for (let i in data[params.data.obj]) {
                  for (let j in data[params.data.obj][i]['system']) {
                    if (j === params.name) {
                      for (let k in data[params.data.obj][i]['system'][j]['equipment']) {
                        let obj = {
                          name: '',
                          count: 0,
                          obj: params.data.obj,
                          level: 'equipment'
                        }
                        obj['name'] = k
                        obj['count'] = data[params.data.obj][i]['system'][j]['equipment'][k].appear_time
                        arr.push(obj)
                      }
                    }
                  }
                }
                if(params.data.obj === 'object1') _this.nextDrawBarChart('id_equip_o1', arr)
                else if(params.data.obj === 'object2') _this.nextDrawBarChart('id_equip_o2', arr)
              }
              if (params.data.level === 'equipment') {
                for (let i in data[params.data.obj]) {
                  for (let j in data[params.data.obj][i]['system']) {
                    for (let k in data[params.data.obj][i]['system'][j]['equipment']) {
                      if (k === params.name) {
                        for (let l in data[params.data.obj][i]['system'][j]['equipment'][k]['module']) {
                          let obj = {
                            name: '',
                            count: 0,
                            obj: params.data.obj,
                            level: 'module'
                          }
                          obj['name'] = l
                          obj['count'] = data[params.data.obj][i]['system'][j]['equipment'][k]['module'][l].appear_time
                          arr.push(obj)
                        }
                      }
                    }
                  }
                }
                if(params.data.obj === 'object1') _this.nextDrawBarChart('id_module_o1', arr)
                else if(params.data.obj === 'object2') _this.nextDrawBarChart('id_module_o2', arr)
              }
              // console.log('111', params)
            })

            myChart.resize();
            window.addEventListener('resize', function () {
              myChart.resize();
            })
            _this = this;
            const erd = elementResizeDetectorMaker();
            erd.listenTo(document.getElementById(id), element => {
              _this.$nextTick(() => {
                //监听到事件后执行的业务逻辑
                myChart.resize();
              });
            });
          }
      )
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
    getTop() {
      let data;
      if (this.context.id1 === 'id_major_o1') {
        this.o1 = []
        this.o2 = []
        data = this.$store.state.get_comparison.by_major
        for (let i in data['object1']) {
          let obj = {
            name: '',
            count: 0
          }
          obj['name'] = i
          obj['count'] = data['object1'][i].appear_time
          this.major_o1.push(obj)
        }

        for (let i in data['object2']) {
          let obj = {
            name: '',
            count: 0
          }
          obj['name'] = i
          obj['count'] = data['object2'][i].appear_time
          this.major_o2.push(obj)
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