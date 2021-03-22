<template>
  <el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%; margin: 1%">
    <!--不同致因阶段改用堆叠图-->
    <!--  总部级-->
    <div id="id_head_reason" style="height: 80%; width: 100%" v-if="context.id==='id_head_reason'">
    </div>
    <!--  区域级-->
    <div id="id_region_reason" style="height: 80%; width: 100%" v-if="context.id==='id_region_reason'">
    </div>
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";
import {pie_option} from "@/utils/constants";

export default {
  name: "StackedHorizontalBar",
  data() {
    return {}
  },
  props: ['context'],
  methods: {
    drawBarChart() {
      this.$nextTick(_ => {
        let myChart;
        myChart = this.$echarts.init(document.getElementById(this.context.id))
        let arr = this.getData
        pie_option["series"][0]["data"] = arr
        if (arr.length != 0) {
          myChart.setOption(pie_option);
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
  },
  computed: {
    getData() {
      let data;
      let arr = [];
      if ((this.context.id == 'id_region_reason') || (this.context.id == 'id_head_reason')) {
        if (this.context.id == 'id_region_reason') {
          data = this.$store.state.get_region.region_stage_ratio
        } else data = this.$store.state.get_headquarter.head_stage_ratio
        console.log("aaaa", data)
        for (let i in data) {
          for (let j in data[i]) {
            let obj = {
              name: '',
              value: 0
            }
            let flag = false
            arr.forEach(item => {
              if (item.name === j) {
                item.value = item.value + data[i][j]
                flag = true
              }
            })
            if (flag === false) {
              obj.name = j;
              obj.value = data[i][j];
              arr.push(obj)
            }
          }
        }
      }
      // let new_arr = []
      // let obj = {
      //   value: 0,
      //   name: '其它'
      // }
      // for (let i = 0; i < arr.length; i++) {
      //   if (i < 5) {
      //     new_arr.push(arr[i])
      //   } else {
      //     obj.value += arr[i].value
      //   }
      // }
      // if (obj.value > 0) {
      //   new_arr.push(obj)
      // }
      return arr
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