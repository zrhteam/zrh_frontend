<template>
  <!--区域级-->
  <!--显示该区域各专业隐患占比情况-->
  <!--根据隐患数量显示不同致因阶段的占比情况-->
  <!--根据隐患数量显示不同分布区域的占比情况-->
  <!--总部级-->
  <!--各专业隐患数量占比-->
  <!--各致因阶段的隐患数量占比情况-->
  <!--各分布区域的隐患数量占比情况-->
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px">
    <div style="display: none">
      {{ getData }}
    </div>
    <div class="level4" style="padding-top: 15px; padding-bottom: 15px; padding-left: 10px">
      <span class="level4">{{ context.title }}</span>
    </div>
    <div id="id_region_major" style="height: 80%; width: 100%" v-if="context.id==='id_region_major'">
    </div>
    <!--    <div id="id_region_system" style="height: 80%; width: 100%" v-if="context.id==='id_region_system'">-->
    <!--    </div>-->
    <div id="id_region_reason" style="height: 80%; width: 100%" v-if="context.id==='id_region_reason'">
    </div>
    <div id="id_region_region" style="height: 80%; width: 100%" v-if="context.id==='id_region_region'">
    </div>
    <div id="id_head_major" style="height: 80%; width: 100%" v-if="context.id==='id_head_major'">
    </div>
    <div id="id_head_reason" style="height: 80%; width: 100%" v-if="context.id==='id_head_reason'">
    </div>
    <div id="id_head_region" style="height: 80%; width: 100%" v-if="context.id==='id_head_region'">
    </div>
  </el-card>
</template>

<script>
import {bar_option, pie_option} from "@/utils/constants";
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "Ratio",
  props: ['context'],
  methods: {
    drawBarChart() {
      this.$nextTick(_ => {
        let myChart;
        myChart = this.$echarts.init(document.getElementById(this.context.id))
        let arr = this.getData
        pie_option["series"][0]["data"] = arr
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
      })
    }
  },
  computed: {
    getData() {
      let data;
      let arr = [];
      if ((this.context.id == 'id_region_major') || (this.context.id == 'id_head_major')) {
        if (this.context.id == 'id_region_major') {
          data = this.$store.state.get_region.region_major_ratio
        } else data = this.$store.state.get_headquarter.head_major_ratio
        for (let i in data) {
          let obj = {
            name: '',
            value: 0
          }
          obj.name = i;
          obj.value = data[i];
          arr.push(obj)
        }
      } else if ((this.context.id == 'id_region_reason') || (this.context.id == 'id_head_reason')) {
        if (this.context.id == 'id_region_reason') {
          data = this.$store.state.get_region.region_stage_ratio
        } else data = this.$store.state.get_headquarter.head_stage_ratio
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
      }else if ((this.context.id == 'id_region_region') || (this.context.id == 'id_head_region')) {
        if (this.context.id == 'id_region_region') {
          data = this.$store.state.get_region.region_area_ratio
        } else data = this.$store.state.get_headquarter.head_area_ratio
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
        console.log("看一下", arr)
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