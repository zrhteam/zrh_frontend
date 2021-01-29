<template>
  <!--区域级-->
  <!--显示该区域各专业隐患占比情况-->
  <!--显示该区域不同专业下各系统隐患占比情况-->
  <!--根据隐患数量显示不同致因阶段的占比情况-->
  <!--根据隐患数量显示不同分布区域的占比情况-->
  <!--总部级-->
  <!--各专业隐患数量占比-->
  <!--各致因阶段的隐患数量占比情况-->
  <!--各分布区域的隐患数量占比情况-->
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 49%; margin: 0px 5px 5px 5px">
    <div style="display: none">
      {{ getData }}
    </div>
    <div class="level4" style="padding-top: 15px; padding-bottom: 15px; padding-left: 10px">
      <span class="level4">{{ context.title }}</span>
      <el-select v-model="value" placeholder="请选择" size="mini" style="max-width: 8em;" @change="filterMajor">
        <el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div id="id_region_major" style="height: 80%; width: 100%" v-if="context.id==='id_region_major'">
    </div>
    <div id="id_region_system" style="height: 80%; width: 100%" v-if="context.id==='id_region_system'">
    </div>
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
import {bar_option} from "@/utils/constants";
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
        bar_option['dataset']['source'] = arr
        bar_option["xAxis"]["axisLabel"]["rotate"] = 45
        myChart.setOption(bar_option);
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