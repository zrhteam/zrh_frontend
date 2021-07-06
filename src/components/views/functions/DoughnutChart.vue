<template>
  <!--  // 两个对象之间检查次数的对比-->
  <!--    // 两个对象之间项目数量的对比-->
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%; margin: 2%">
    <div style="display: none">
      {{ getData }}
    </div>
    <div class="level4" style="padding-top: 15px; padding-bottom: 15px;">
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
    </div>
    <div id="id_by_check" style="height: 80%; width: 100%" v-if="context.id==='id_by_check'">
    </div>
    <div id="id_by_prj" style="height: 80%; width: 100%" v-if="context.id==='id_by_prj'">
    </div>
  </el-card>
</template>

<script>

export default {
  name: "DoughnutChart",
  data() {
    return {
      obj1: this.$store.state.get_comparison.object1,
      obj2: this.$store.state.get_comparison.object2,
      options: [],
      value: '',
      isShow: true
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
            left: '6',
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            }
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
                  color: '#ffffff'
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
                    //自定义颜色
                    let colorList = [
                      '#3d5bfb', '#7c00ff', '#11aeff', '#27e0a6', '#00c800', '#e8395d',
                    ];
                    return colorList[params.dataIndex]
                  },
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
        window.addEventListener('resize', () => {
          myChart.resize();
        })
      })
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
    getData() {
      let data;
      let arr = [];
      if (this.context.id == 'id_by_check') {
        // 两个对象之间检查次数的对比
        data = this.$store.state.get_comparison.by_check
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
      return arr
    },
  },
  updated() {
    this.drawBarChart()
  },
  mounted() {
    this.drawBarChart()
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