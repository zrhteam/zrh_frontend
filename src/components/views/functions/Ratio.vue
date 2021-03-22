<template>
  <!--区域级-->
  <!--显示该区域各专业隐患占比情况-->
  <!--根据隐患数量显示不同分布区域的占比情况-->
  <!--总部级-->
  <!--各专业隐患数量占比-->
  <!--各分布区域的隐患数量占比情况-->
  <el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%; margin: 1%">
    <div style="display: none">
      {{ getData }}
    </div>
    <div class="level4" style="padding-top: 15px; padding-bottom: 15px; padding-left: 10px">
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
      option: ''
    }
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
      } else if (this.context.id == 'id_region_system') {
        this.show = true
        data = this.$store.state.get_region.region_sys_ratio
        for (let i in data) {
          for (let j in data[i]) {
            let obj = {
              name: '',
              value: ''
            }
            obj['name'] = j;
            obj['value'] = data[i][j]
            arr.push(obj)
          }
        }

        let major = []
        let filter = []
        let count = 0
        for (let i in data) {
          if (filter.indexOf(i) === -1) {
            filter.push(i)
            let obj = {
              value: '',
              label: ''
            }
            obj['value'] = count++;
            obj['label'] = i
            major.push(obj)
          }
        }
        let obj = {
          value: '',
          label: ''
        }
        obj['value'] = '全部专业';
        obj['label'] = '全部专业'
        major.push(obj)
        let old_major = this.$store.state.get_region.all_majors
        if (old_major.length < major.length) {
          this.$store.commit('get_region/changeAllMajors', {all_majors: major})
          this.option = major
        } else {
          this.option = this.$store.state.get_region.all_majors
        }
        // console.log("看一下", data)
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