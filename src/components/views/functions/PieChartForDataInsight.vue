<template>
  <!--区域级-->
  <!--显示该区域各专业隐患占比情况-->
  <!--根据隐患数量显示不同分布区域的占比情况-->
  <!--总部级-->
  <!--各专业隐患数量占比-->
  <!--各分布区域的隐患数量占比情况-->
  <el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%;">
    <div style="display: none">
      {{ getData }}
    </div>
    <div class="level4">
      <span class="level4" style="display:inline-block;width:600px; height: 10px;font-size:15px;">{{ context.title }}</span>
    </div>
<!--    <div class="title-line" style=""></div>-->
    <el-divider></el-divider>
    <div id="id_red_line_1" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_1'"></div>
    <div id="id_red_line_2" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_2'"></div>
    <div id="id_red_line_3" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_3'"></div>
    <div id="id_red_line_4" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_4'"></div>
    <div id="id_red_line_5" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_5'"></div>
    <div id="id_red_line_6" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_6'"></div>
    <div id="id_red_line_7" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_7'"></div>
    <div id="id_red_line_8" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_8'"></div>
    <div id="id_red_line_9" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_9'"></div>
    <div id="id_red_line_10" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_10'"></div>
    <div id="id_red_line_11" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_11'"></div>
    <div id="id_red_line_12" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_12'"></div>
    <div id="id_red_line_13" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_13'"></div>
    <div id="id_red_line_14" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_14'"></div>
    <div id="id_red_line_15" style="height: 122%; width: 140%" v-if="context.id==='id_red_line_15'"></div>
  </el-card>
</template>

<script>
import {pie_option_data_insight} from "@/utils/constants";
import {round} from "echarts/src/util/number";

export default {
  name: "PieChartForDataInsight",
  data() {
    return {
      show: false,
      value: '全部专业',
      option: '',
    }
  },
  props: ['context'],
  methods: {
    drawBarChart() {
      this.$nextTick(_ => {
        let myChart;
        myChart = this.$echarts.init(document.getElementById(this.context.id))
        let arr = this.getData
        let _this = this
        pie_option_data_insight["series"][0]["data"] = arr
        pie_option_data_insight["legend"]["formatter"] = function (params) {
          let legendIndex = 0;
          arr.forEach(function (v, i) {
            if (v.name === params) {
              legendIndex = i;
            }
          });
          return params + " " + round(arr[legendIndex].value*100,1,true)+"%";
        }
        if (arr.length !== 0) {
          myChart.setOption(pie_option_data_insight);
          myChart.on("click", pieConsole);
          function pieConsole(param) {
            let param2 = new URLSearchParams();
            if (_this.context.id === 'id_red_line_1'||_this.context.id === 'id_red_line_2'||_this.context.id === 'id_red_line_15'||
            _this.context.id === 'id_red_line_3'||_this.context.id === 'id_red_line_4'||_this.context.id === 'id_red_line_5'||
            _this.context.id === 'id_red_line_6'||_this.context.id === 'id_red_line_7'||_this.context.id === 'id_red_line_8'||
            _this.context.id === 'id_red_line_9'||_this.context.id === 'id_red_line_10'||_this.context.id === 'id_red_line_11'||
            _this.context.id === 'id_red_line_12'||_this.context.id === 'id_red_line_13'||_this.context.id === 'id_red_line_14') {
              param2.append('check_key', '华润置地/华东大区');
              param2.append('flag', '1');
              param2.append('start', '2020-3-1 00:00:00');
              param2.append('end', '2022-1-3 00:00:00');
              //该检查中在不同专业下属于不同隐患子系统的隐患数量
              this.$store.commit('get_insight/changeParams', {params: param2})
              this.$store.dispatch('get_insight/getAnalyzeRedlineData')
            }
          }

          myChart.resize();
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        } else if (this.context.id) {
          this.$nextTick(() => {
            const dom = document.getElementById(this.context.id)
            dom.innerHTML = '暂无数据'.bold()
            dom.style.color = '#ffffff'
            dom.style.width = '350px'
            dom.style.height = '122px'
            dom.style.fontSize = '15px'
            dom.removeAttribute("_echarts_instance_")
          })
        }
      })
    },
    sortNumber(attr, rev) {
      if (rev === undefined) {
        rev = 1;
      } else {
        rev = (rev) ? 1 : -1;
      }

      return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * 1;
        }
        if (a > b) {
          return rev * -1;
        }
        return 0;
      }
    }
  },
  computed: {
    getData() {
      let data;
      let arr = [];
      if (this.context.id === 'id_red_line_1'||this.context.id === 'id_red_line_2'||this.context.id === 'id_red_line_3'||
          this.context.id === 'id_red_line_4'||this.context.id === 'id_red_line_5'||this.context.id === 'id_red_line_6'||
          this.context.id === 'id_red_line_7'||this.context.id === 'id_red_line_8'||this.context.id === 'id_red_line_9'||
          this.context.id === 'id_red_line_10'||this.context.id === 'id_red_line_11'||this.context.id === 'id_red_line_12'||
          this.context.id === 'id_red_line_13'||this.context.id === 'id_red_line_14'||this.context.id === 'id_red_line_15'){
        data = this.$store.state.get_insight.red_line_data
        // for (let i in data){
        //   console.log(i)
        // }
        let str = this.context.title
        let result_set = data[str].ratio
        for (let i in result_set) {
          let obj = {
            name: '',
            value: 0
          }
          obj.name = i;
          obj.value = result_set[i];
          arr.push(obj)
        }
      }
      arr.sort(this.sortNumber('value', true))
      let new_arr = []
      let obj = {
        value: 0,
        name: '其它'
      }
      for (let i = 0; i < arr.length; i++) {
        if (i < 6) {
          new_arr.push(arr[i])
        } else {
          obj.value += arr[i].value
        }
      }
      if (obj.value > 0) {
        new_arr.push(obj)
      }
      return new_arr
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