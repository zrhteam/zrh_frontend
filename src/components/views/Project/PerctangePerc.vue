<template>
  <el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%; margin: 2% 0% 2% 1%;">
    <div style="display: none">
      {{ getData }}
    </div>
    <div class="level4">
      <span>{{ context.title }}</span>
      <el-select v-model="value" placeholder="请选择" size="mini" style="max-width: 25%;" @change="filterMajor">
        <el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!--    <div id="bar_chart" style="height: 80%; width: 100%">-->
    <!--      &lt;!&ndash;        占比（可筛选专业）柱状图&ndash;&gt;-->

    <!--    </div>-->
    <!--        占比（可筛选专业）柱状图-->
    <div id="id_system" style="height: 80%; width: 100%" v-if="context.id==='id_system'">
    </div>
    <div id="id_reason" style="height: 80%; width: 100%" v-if="context.id==='id_reason'">
    </div>
    <div id="id_region" style="height: 80%; width: 100%" v-if="context.id==='id_region'">
    </div>
    <div id="id_check_system" style="height: 80%; width: 100%" v-if="context.id==='id_check_system'">
    </div>
    <div id="id_check_reason" style="height: 80%; width: 100%" v-if="context.id==='id_check_reason'">
    </div>
    <div id="id_check_region" style="height: 80%; width: 100%" v-if="context.id==='id_check_region'">
    </div>
  </el-card>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";
import {bar_option, pie_option} from "@/utils/constants.js";

export default {
  name: "ProjPercentage",
  props: ['context'],
  data() {
    return {
      value: '',
      option: ''
    }
  },
  methods: {
    drawBarChart() {
      this.$nextTick(_ => {
        let myChart;
        myChart = this.$echarts.init(document.getElementById(this.context.id))
        let arr = this.getData
        // bar_option['dataset']['source'] = arr
        // bar_option["xAxis"]["axisLabel"]["rotate"] = 45
        // myChart.setOption(bar_option);
        // console.log("arr", arr)
        if(arr.length != 0) {
          pie_option['series'][0]['data'] = arr
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
        }else if (this.context.id) {
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
      if (this.context.id == 'id_check_reason') {
        //该检查中在筛选专业条件下属于不同致因阶段的隐患数量
        param2.append('check_code', this.$store.state.get_check.check_code);
        this.$store.commit('get_check/changeParam2', {params: param2})
        this.$store.dispatch('get_check/getCheckMajorStage')
      } else if (this.context.id == 'id_check_region') {
        //该检查中在筛选专业条件下属于不同分布区域的隐患数量
        param2.append('check_code', this.$store.state.get_check.check_code);
        this.$store.commit('get_check/changeParam2', {params: param2})
        this.$store.dispatch('get_check/getCheckMajorArea')
      } else if (this.context.id == 'id_check_system') {
        //该检查中在筛选专业条件下属于不同隐患子系统的隐患数量
        param2.append('check_code', this.$store.state.get_check.check_code);
        this.$store.commit('get_check/changeParam2', {params: param2})
        this.$store.dispatch('get_check/getCheckMajorSystem')
      } else if (this.context.id == 'id_reason') {
        //该项目中在筛选专业条件下属于不同致因阶段的隐患数量
        param2.append('project_name', this.$store.state.get_project.prj_name);
        this.$store.commit('get_project/changeParam2', {params: param2})
        this.$store.dispatch('get_project/getInitProjectReason')
      } else if (this.context.id == 'id_region') {
        //该项目中在筛选专业条件下属于不同分布区域的隐患数量
        param2.append('project_name', this.$store.state.get_project.prj_name);
        this.$store.commit('get_project/changeParam2', {params: param2})
        this.$store.dispatch('get_project/getInitProjectRegionDistribution')
      } else if (this.context.id == 'id_system') {
        //该项目中在筛选专业条件下属于不同隐患子系统的隐患数量
        param2.append('project_name', this.$store.state.get_project.prj_name);
        this.$store.commit('get_project/changeParam2', {params: param2})
        this.$store.dispatch('get_project/getInitProjectSystem')
      }
    }
  },
  computed: {
    getData() {
      let data;
      let arr = [];
      if ((this.context.id == 'id_system') || (this.context.id == 'id_check_system')) {
        if (this.context.id == 'id_system') {
          data = this.$store.state.get_project.prj_system
        } else data = this.$store.state.get_check.check_system
        // console.log("隐患子系统",data)
        for (let i in data) {
          for (let j in data[i]) {
            let obj = {
              name: '',
              // count: 0
              value: 0
            }
            //查询所有专业时可能会需要数据合并
            let flag = false
            arr.find(function (item) {
              if (j === item.name) {
                flag = true
                item[j] = item[j] + data[i][j]
              }
            })
            if (flag === false) {
              obj.name = j;
              // obj.count = data[i][j];
              obj.value = data[i][j];
              arr.push(obj)
            }
          }
        }
      } else if ((this.context.id == 'id_reason') || (this.context.id == 'id_check_reason')) {
        if (this.context.id == 'id_reason')
          data = this.$store.state.get_project.prj_reason
        else data = this.$store.state.get_check.check_reason
        for (let i in data) {
          for (let j in data[i]) {
            let obj = {
              name: '',
              // count: 0
              value: 0
            }
            //查询所有专业时可能会需要数据合并
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
      } else if ((this.context.id == 'id_region') || (this.context.id == 'id_check_region')) {
        if (this.context.id == 'id_region')
          data = this.$store.state.get_project.prj_region
        else data = this.$store.state.get_check.check_region
        for (let i in data) {
          for (let j in data[i]) {
            let obj = {
              name: '',
              value: 0
              // count: 0
            }
            //查询所有专业时可能会需要数据合并
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
      if ((this.context.id == 'id_check_system') || (this.context.id == 'id_check_reason') || (this.context.id == 'id_check_region')) {
        // if (this.value === '全部专业') {
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
        let old_major = this.$store.state.get_check.all_majors
        if (old_major.length < major.length) {
          this.$store.commit('get_check/changeAllMajors', {all_majors: major})
          this.option = major
        } else {
          this.option = this.$store.state.get_check.all_majors
        }
      } else if ((this.context.id == 'id_system') || (this.context.id == 'id_reason') || (this.context.id == 'id_region')) {
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
        let old_major = this.$store.state.get_project.all_majors
        if (old_major.length < major.length) {
          this.$store.commit('get_project/changeAllMajors', {all_majors: major})
          this.option = major
        } else {
          this.option = this.$store.state.get_project.all_majors
        }
      }
      arr.sort(this.sortNumber('value', true))
      let new_arr = []
      let obj = {
          value: 0,
          name: '其它'
        }
      for(let ii = 0; ii < arr.length; ii++) {
        if(ii < 5) {
          new_arr.push(arr[ii])
        }else {
          obj.value += arr[ii].value
        }
      }
      if(obj.value > 0) {
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
  created() {
    this.value = '全部专业'
  }
}
</script>

<style scoped>
/*#bar_chart {*/
/*  width: 400px;*/
/*  height: 400px;*/
/*}*/
</style>