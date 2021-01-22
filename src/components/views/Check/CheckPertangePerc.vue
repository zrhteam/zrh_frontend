<template>
<el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 49%; margin: 0px 5px 5px 5px">
    <div style="display: none">
      {{ getData }}
    </div>
    <div class="level4" style="padding-top: 15px; padding-bottom: 15px; padding-left: 10px">
      <span class="level4">{{ context.title }}</span>
    </div>
    <div id="check_bar_chart" style="height: 80%; width: 100%">
      <!--        占比（可筛选专业）柱状图-->

    </div>
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";
import {bar_option} from "@/utils/constants";

export default {
  name: "CheckPertangePerc",
  props: ['context'],
  data() {
    return {
      // type: '',
      // bar_chart: 'xx'
    }
  },
  methods: {
    drawBarChart() {
      this.$nextTick(_ => {
        let myChart;
        if (this.type == 'system') {
          if (document.getElementById('check_bar_chart')) {
            document.getElementById('check_bar_chart').id = 'id_check_system'
          }
          myChart = this.$echarts.init(document.getElementById('id_check_system'))
        } else if (this.type == 'reason') {
          if (document.getElementById('check_bar_chart')) {
            document.getElementById('check_bar_chart').id = 'id_check_reason'
          }
          myChart = this.$echarts.init(document.getElementById('id_check_reason'))
        } else if (this.type == 'region') {
          if (document.getElementById('check_bar_chart')) {
            document.getElementById('check_bar_chart').id = 'id_check_region'
          }
          myChart = this.$echarts.init(document.getElementById('id_check_region'))
        }
        // 使用刚指定的配置项和数据显示图表。
        let arr = this.getData
        console.log("bar_arr", arr)
        if (arr.length) {
          bar_option['dataset']['source'] = arr
          myChart.setOption(bar_option);
        }
        myChart.resize();
        window.addEventListener('resize', function () {
          myChart.resize();
        })
        const _this = this;
        const erd = elementResizeDetectorMaker();
        if (this.type == 'system') {
          erd.listenTo(document.getElementById("id_check_system"), element => {
            _this.$nextTick(() => {
              //监听到事件后执行的业务逻辑
              myChart.resize();
            });
          });
        } else if (this.type == 'reason') {
          erd.listenTo(document.getElementById("id_check_reason"), element => {
            _this.$nextTick(() => {
              //监听到事件后执行的业务逻辑
              myChart.resize();
            });
          });
        } else if (this.type == 'region') {
          erd.listenTo(document.getElementById("id_check_region"), element => {
            _this.$nextTick(() => {
              //监听到事件后执行的业务逻辑
              myChart.resize();
            });
          });
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
    }
  },
  computed: {
    getData() {
      console.log('this.context', this.context);
      let data;
      let arr = [];
      if (this.context.type == 'system') {
        data = this.$store.state.get_check.check_system
        for (let i in data) {
          for (let j in data[i]) {
            let obj = {
              name: '',
              count: 0
            }
            obj.name = j;
            obj.count = data[i][j];
            arr.push(obj)
          }
        }
        console.log(arr)
      } else if (this.context.type == 'reason') {
        data = this.$store.state.get_check.check_reason
        console.log(data)
        let obj1 = {
          name: '(空白)',
          count: 0
        }
        let obj2 = {
          name: '施工',
          count: 0
        }
        let obj3 = {
          name: '运营',
          count: 0
        }
        for (let i in data) {
          for (let j in data[i]) {
            if (j == '施工') {
              obj2.count += data[i][j];
            } else if (j == '运营') {
              obj3.count += data[i][j];
            } else {
              obj1.count += data[i][j]
            }
          }
        }
        arr.push(obj1)
        arr.push(obj2)
        arr.push(obj3)
        console.log(arr)
      } else if (this.context.type == 'region') {
        data = this.$store.state.get_check.check_region
        console.log(data)
        let obj1 = {
          name: '(空白)',
          count: 0
        }
        let obj2 = {
          name: '公共区域',
          count: 0
        }
        let obj3 = {
          name: '租户区域',
          count: 0
        }
        for (let i in data) {
          for (let j in data[i]) {
            if (j == '公共区域') {
              obj2.count += data[i][j];
            } else if (j == '租户区域') {
              obj3.count += data[i][j];
            } else {
              obj1.count += data[i][j]
            }
          }
        }
        arr.push(obj1)
        arr.push(obj2)
        arr.push(obj3)
        console.log(arr)
      }
      console.log(arr)
      arr.sort(this.sortNumber('count', true))
      return arr
    },
  },
  updated() {
    this.drawBarChart()
  },
  mounted() {
    console.log('this.context', this.context.type);
    this.type = this.context.type
    // if (this.context.type == system) {
    //   document.getElementById('bar_chart').id = 'id_system'
    //   let id = 'id_system'
    this.drawBarChart();
    // }
  }
}
</script>

<style scoped>

</style>