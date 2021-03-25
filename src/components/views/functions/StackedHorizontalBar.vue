<template>
  <el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%; margin: 1%">
    <div class="level4" style="padding-top: 15px; padding-bottom: 15px; padding-left: 10px">
      <span class="level4">{{ context.title }}</span>
    </div>
    <!--不同致因阶段改用堆叠图-->
    <!--  总部级-->
    <div id="id_head_reason" style="height: 80%; width: 100%" v-if="context.id==='id_head_reason'">
    </div>
    <!--  区域级-->
    <div id="id_region_reason" style="height: 80%; width: 100%" v-if="context.id==='id_region_reason'">
    </div>
    <!--  项目级-->
    <div id="id_project_reason" style="height: 80%; width: 100%" v-if="context.id==='id_project_reason'">
    </div>
    <!--  检查级-->
    <div id="id_check_reason" style="height: 80%; width: 100%" v-if="context.id==='id_check_reason'">
    </div>
    <!--    新增的不同风险等级隐患数量-->
    <!--    总部级-->
    <!--    <div id="id_head_risk" style="height: 80%; width: 100%" v-if="context.id==='id_head_risk'">-->
    <!--    </div>-->
    <!--  区域级-->
    <div id="id_region_risk" style="height: 80%; width: 100%" v-if="context.id==='id_region_risk'">
    </div>
    <!--    项目级-->
    <div id="id_project_risk" style="height: 80%; width: 100%" v-if="context.id==='id_project_risk'">
    </div>
    <!--      检查级-->
    <div id="id_check_risk" style="height: 80%; width: 100%" v-if="context.id==='id_check_risk'">
    </div>
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "StackedHorizontalBar",
  data() {
    return {
      legend: [],
      yAxis: [],
      s_data: [],
    }
  },
  props: ['context'],
  methods: {
    drawBarChart() {
      this.$nextTick(_ => {
        let myChart;
        myChart = this.$echarts.init(document.getElementById(this.context.id))
        let arr = this.getData
        let data = []
        let r_data = []
        //转置
        let hang = this.s_data.length
        if (hang > 0) {
          let lie = this.s_data[0].length
          for (let i = 0; i < lie; i++) {
            let sub_r = []
            for (let j = 0; j < hang; j++) {
              sub_r.push(this.s_data[j][i])
            }
            r_data.push(sub_r)
          }
        }
        for (let i in r_data) {
          let obj = {
            name: this.legend[i],
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              fontWeight: 200,
              fontSize: 8
            },
            emphasis: {
              focus: 'series'
            },
            data: r_data[i],
            itemStyle: {},
          }
          data.push(obj)
        }
        if (data.length > 0) {
          data[data.length - 1]["itemStyle"] = {
            normal: {
              //柱形图圆角，初始化效果
              barBorderRadius: [0, 10, 10, 0],
            }
          }
        }
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
              type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {
            data: this.legend,
            textStyle: {
              color: '#ffffff'
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            },
            type: 'value'
          },
          yAxis: {
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            },
            type: 'category',
            data: this.yAxis
          },
          series: data
        };


        // if (arr.length != 0) {
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
        // } else if (this.context.id) {
        //   this.$nextTick(() => {
        //     const dom = document.getElementById(this.context.id)
        //     dom.innerHTML = '暂无数据'
        //     dom.style.color = '#ffffff'
        //     dom.style.fontSize = '14px'
        //     dom.removeAttribute("_echarts_instance_")
        //   })
        // }
      })
    },
  },
  computed: {
    getData() {
      let data;
      let arr = [];
      let sub_arr = [];
      let legend = [];
      let yAxis = [];
      let s_data = [];
      if ((this.context.id == 'id_check_reason') || (this.context.id == 'id_project_reason') || (this.context.id == 'id_region_reason') || (this.context.id == 'id_head_reason')) {
        if (this.context.id == 'id_check_reason') {
          data = this.$store.state.get_check.check_reason
        } else if (this.context.id == 'id_project_reason') {
          data = this.$store.state.get_project.prj_reason
        } else if (this.context.id == 'id_region_reason') {
          data = this.$store.state.get_region.region_stage_ratio
        } else data = this.$store.state.get_headquarter.head_stage_ratio
        for (let i in data) {
          for (let j in data[i]) {
            let obj = {
              name: '',
              value: 0
            }
            let flag = false
            sub_arr.forEach(item => {
              if (item.name === j) {
                item.value = item.value + data[i][j]
                flag = true
              }
            })
            if (flag === false) {
              obj.name = j;
              obj.value = data[i][j];
              sub_arr.push(obj)
              legend.push(j)
            }
          }
          yAxis.push(i)
        }
        for (let i in data) {
          let sub_data = []
          for (let k in legend) {
            let flag = false
            for (let j in data[i]) {
              if (j == legend[k]) {
                sub_data.push(data[i][j])
                flag = true
              }
            }
            if (flag == false) {
              sub_data.push(0)
            }
          }
          s_data.push(sub_data)
        }

        let sub_data = []
        for (let k in legend) {
          let flag = false
          for (let j in sub_arr) {
            if (sub_arr[j].name == legend[k]) {
              sub_data.push(sub_arr[j].value)
              flag = true
            }
          }
          if (flag == false) {
            sub_data.push(0)
          }
        }
        s_data.push(sub_data)
      } else if ((this.context.id == 'id_region_risk') || (this.context.id == 'id_project_risk') || (this.context.id == 'id_check_risk')) {
        if (this.context.id == 'id_region_risk')
          data = this.$store.state.get_region.region_risk_level_ratio
        else if (this.context.id == 'id_project_risk') {
          data = this.$store.state.get_project.prj_risk_level_ratio
        }
        else if (this.context.id == 'id_check_risk') {
          data = this.$store.state.get_check.check_risk_level_ratio
        }
        for (let i in data) {
          for (let j in data[i]) {
            let obj = {
              name: '',
              value: 0
            }
            let flag = false
            sub_arr.forEach(item => {
              if (item.name === j) {
                item.value = item.value + data[i][j]
                flag = true
              }
            })
            if (flag === false) {
              obj.name = j;
              obj.value = data[i][j];
              sub_arr.push(obj)
              legend.push(j)
            }
          }
          yAxis.push(i)
        }
        for (let i in data) {
          let sub_data = []
          for (let k in legend) {
            let flag = false
            for (let j in data[i]) {
              if (j == legend[k]) {
                sub_data.push(data[i][j])
                flag = true
              }
            }
            if (flag == false) {
              sub_data.push(0)
            }
          }
          s_data.push(sub_data)
        }

        let sub_data = []
        let t_legend = []
        for (let k in legend) {
          let flag = false
          for (let j in sub_arr) {
            if (sub_arr[j].name == legend[k]) {
              sub_data.push(sub_arr[j].value)
              flag = true
            }
          }
          if (flag == false) {
            sub_data.push(0)
          }
          if (k == 0) {
            t_legend.push('低风险')
          } else if (k == 1) {
            t_legend.push('中风险')
          } else if (k == 2) {
            t_legend.push('高风险')
          }
        }
        legend = t_legend
        s_data.push(sub_data)
      }
      yAxis.push("总计")

      this.legend = legend
      this.yAxis = yAxis
      this.s_data = s_data
    },
  },
  updated() {
    this.drawBarChart()
  },
  mounted() {
    this.drawBarChart();
  },
}
</script>

<style scoped>

</style>