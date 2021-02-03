<template>
  <!--  // 两个对象之间检查次数的对比-->
  <!--    // 两个对象之间项目数量的对比-->
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%; margin: 2%">
    <div style="display: none">
      {{ getData }}
    </div>
    <div class="level4" style="padding-top: 15px; padding-bottom: 15px; padding-left: 10px">
      <span class="level4">{{ context.title }}</span>
    </div>
    <div id="id_by_check" style="height: 80%; width: 100%" v-if="context.id==='id_by_check'">
    </div>
    <div id="id_by_prj" style="height: 80%; width: 100%" v-if="context.id==='id_by_prj'">
    </div>
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "DoughnutChart",
  data() {
    return {
      obj1: this.$store.state.get_comparison.object1,
      obj2: this.$store.state.get_comparison.object2
    }
  },
  props: ['context'],
  methods: {
    drawBarChart() {
      this.$nextTick(_ => {
        let myChart;
        myChart = this.$echarts.init(document.getElementById(this.context.id))
        let arr = this.getData
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: '14'
          },
          series: [
            {
              type: 'pie',
              radius: ['50%', '75%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '14',
                  fontWeight: 'bold'
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  // shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  color: function (params) {
                    let colorList = [
                      {
                        c1: '#fce5ca',
                        c2: '#ff9d62'
                      },
                      {
                        c1: '#63e587',
                        c2: '#5fe2e4'
                      },
                      {
                        c1: '#db6400',
                        c2: '#ceb895'
                      },
                      {
                        c1: '#e8e87e',
                        c2: '#a1a170'
                      },
                      {
                        c1: '#007965',
                        c2: '#b1e2da'
                      },
                      {
                        c1: '#7c9473',
                        c2: '#d6efc7'
                      }];
                    return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                      offset: 0,
                      color: colorList[(params.dataIndex) % colorList.length].c1
                    }, {
                      offset: 1,
                      color: colorList[(params.dataIndex) % colorList.length].c2
                    }])
                  }
                }
              },
              labelLine: {
                show: false
              },
              data: arr
            }
          ]
        };
        myChart.setOption(option);
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
  },
  computed: {
    getData() {
      let data;
      let arr = [];
      if (this.context.id == 'id_by_check') {
        // 两个对象之间检查次数的对比
        data = this.$store.state.get_comparison.by_check
        // console.log('data1', data)
        for (let i in data) {
          let obj = {
            name: '',
            value: 0,
            obj: ''
          }
          if (i === 'object1') {
            obj.obj = this.$store.state.get_comparison.object1
          } else if (i === 'object2') {
            obj.obj = this.$store.state.get_comparison.object2
          }
          obj.name = i;
          obj.value = data[i].check_time;
          arr.push(obj)
        }
      } else if (this.context.id == 'id_by_prj') {
        // 两个对象之间项目数量的对比
        data = this.$store.state.get_comparison.by_prj
        for (let i in data) {
          let obj = {
            name: '',
            value: 0,
            obj: ''
          }
          if (i === 'object1') {
            obj.obj = this.$store.state.get_comparison.object1
          } else if (i === 'object2') {
            obj.obj = this.$store.state.get_comparison.object2
          }
          obj.name = i;
          obj.value = data[i].project_num;
          arr.push(obj)
        }
      }
      return arr
    },
  },
  updated() {
    this.drawBarChart()
  },
}
</script>

<style scoped>

</style>