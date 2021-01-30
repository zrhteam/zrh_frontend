<template>
  <!--  总部级-->
  <!--  按照检查次数对区域排名-->
  <!--  展示按照项目数量对区域排名-->
  <!--  区域级-->
  <!--  属于同一总部该区域内每个项目的高风险隐患数量-->
  <!--  返回该区域每个项目的检查次数-->
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px">
    <div style="display: none">
      {{ getData }}
    </div>
    <div class="level4" style="padding-top: 15px; padding-bottom: 15px; padding-left: 10px">
      <span class="level4">{{ context.title }}</span>
    </div>
    <div id="id_head_rank1" style="height: 80%; width: 100%" v-if="context.id==='id_head_rank1'">
    </div>
    <div id="id_head_rank2" style="height: 80%; width: 100%" v-if="context.id==='id_head_rank2'">
    </div>
    <div id="id_region_rank1" style="height: 80%; width: 100%" v-if="context.id==='id_region_rank1'">
    </div>
    <div id="id_region_rank2" style="height: 80%; width: 100%" v-if="context.id==='id_region_rank2'">
    </div>
  </el-card>
</template>

<script>
import {bar_option} from "@/utils/constants";
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "BarRank",
  props: ['context'],
  data() {
    return {}
  },
  methods: {
    drawBarChart() {
      this.$nextTick(_ => {
        let myChart;
        myChart = this.$echarts.init(document.getElementById(this.context.id))
        let arr = this.getData
        arr.sort(this.sortNumber('count', true))
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
    },
  },
  computed: {
    getData() {
      let data;
      let arr = [];
      if ((this.context.id == 'id_head_rank1') || (this.context.id == 'id_head_rank2')) {
        if (this.context.id == 'id_head_rank1') {
          data = this.$store.state.get_headquarter.rank_by_check
        } else if (this.context.id == 'id_head_rank2') {
          data = this.$store.state.get_headquarter.rank_by_prj
        }
        for (let i in data) {
          let obj = {
            name: '',
            count: 0
          }
          obj['name'] = i
          obj['count'] = data[i]
          arr.push(obj)
        }
      } else if ((this.context.id == 'id_region_rank1') || (this.context.id == 'id_region_rank2')) {
        if (this.context.id == 'id_region_rank1') {
          data = this.$store.state.get_region.rank_by_check
        } else if (this.context.id == 'id_region_rank2') {
          data = this.$store.state.get_region.rank_by_prj
        }
        for (let i in data) {
          let obj = {
            name: '',
            appear_time: 0
          }
          obj['name'] = i
          obj['count'] = data[i].count
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