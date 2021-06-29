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
      <span class="level4">{{ context.title }}</span>
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
    <div id="id_region_major" style="height: 80%; width: 100%" v-if="context.id==='id_region_major'">
    </div>
    <div id="id_region_system" style="height: 80%; width: 100%" v-if="context.id==='id_region_system'">
    </div>
    <div id="id_region_region" style="height: 80%; width: 100%" v-if="context.id==='id_region_region'">
    </div>
    <div id="id_head_major" style="height: 80%; width: 100%" v-if="context.id==='id_head_major'">
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
        pie_option["series"][0]["data"] = arr
        pie_option["legend"]["formatter"] = function (params) {
          var legendIndex = 0;
          arr.forEach(function (v, i) {
            if (v.name == params) {
              legendIndex = i;
            }
          });
          return params + " " + arr[legendIndex].value;
        }
        if (arr.length != 0) {
          myChart.setOption(pie_option);

          myChart.on("click", pieConsole);

          function pieConsole(param) {
            let param2 = new URLSearchParams();
            let _this1 = _this
            if (_this.context.id == 'id_region_major') {
              param2.append('major', param.name);
              param2.append('region_name', _this1.$store.state.get_region.region_name);
              //该检查中在不同专业下属于不同隐患子系统的隐患数量
              _this1.$store.commit('get_region/changeParam2', {params: param2})
              _this1.$store.commit('get_region/changeFilterMajor', {data: param.name})
              //显示该区域不同专业下各系统隐患占比情况
              _this1.$store.dispatch('get_region/getRegionSystemRatio')
              //根据隐患数量显示不同分布区域的占比情况 全发自己做筛选
              _this1.$store.dispatch('get_region/getRegionAreaRatio')
            } else if (_this.context.id == 'id_head_major') {
              param2.append('major', param.name);
              param2.append('headquarter_name', _this1.$store.state.get_headquarter.head_name);
              //该检查中在不同专业下属于不同隐患子系统的隐患数量
              _this1.$store.commit('get_headquarter/changeParam2', {params: param2})
              _this1.$store.commit('get_headquarter/changeFilterMajor', {data: param.name})
              //根据隐患数量显示不同分布区域的占比情况
              _this1.$store.dispatch('get_headquarter/getHeadAreaRatio')
            }
          }

          myChart.resize();
          window.addEventListener("resize", () => {
            this.myChart.resize();
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
      var obj = {};
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
      if (rev == undefined) {
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
      if ((this.context.id == 'id_region_major') || (this.context.id == 'id_head_major')) {
        if (this.context.id == 'id_region_major') {
          data = this.$store.state.get_region.region_major_ratio
        } else {
          data = this.$store.state.get_headquarter.head_major_ratio
        }
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
      } else if ((this.context.id == 'id_region_region') || (this.context.id == 'id_head_region')) {
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
      }
      arr.sort(this.sortNumber('value', true))
      let new_arr = []
      let obj = {
        value: 0,
        name: '其它'
      }
      for (let i = 0; i < arr.length; i++) {
        if (i < 5) {
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