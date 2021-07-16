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
    <div class="level4" style="padding-bottom: 5px; padding-left: 10px">
      <span class="level4" style="display:inline-block;width:200px;font-size:20px;">{{ context.title }}</span>
      <el-select v-if="show" v-model="value" placeholder="请选择" size="mini" style="max-width: 8em;"
                 @change="filterMajor">
        <el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="title-line" style=""></div>
    <div id="id_red_line" style="height: 150%; width: 100%" v-if="context.id==='id_red_line'">
    </div>
  </el-card>
</template>

<script>
import {pie_option_data_insight} from "@/utils/constants";

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
          return params + " " + arr[legendIndex].value;
        }
        if (arr.length !== 0) {
          myChart.setOption(pie_option_data_insight);

          myChart.on("click", pieConsole);

          function pieConsole(param) {
            let param2 = new URLSearchParams();
            if (_this.context.id === 'id_red_line') {
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
            dom.innerHTML = '暂无数据'
            dom.style.color = '#ffffff'
            dom.style.fontSize = '14px'
            dom.removeAttribute("_echarts_instance_")
          })
        }
      })
    },
    filterMajor(value) {
      let param2 = new URLSearchParams();
      let obj = {};
      //使用find()方法在下拉数据中根据value绑定的数据查找对象
      obj = this.option.find(function (item) {
        return item.value === value;
      })
      if (obj.label === '全部专业') {
        param2.append('major', 'all');
      } else {
        param2.append('major', obj.label);
      }
      param2.append('region_name', this.$store.state.get_region.region_name);
      this.$store.commit('get_region/changeParam2', {params: param2})
      //显示该区域不同专业下各系统隐患占比情况
      this.$store.dispatch('get_region/getRegionSystemRatio')
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
      if (this.context.id === 'id_red_line'){
        data = this.$store.state.get_insight.red_line_data
        // for (let i in data){
        //   console.log(i)
        // }
        let str = "中庭区域消防广播故障"
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