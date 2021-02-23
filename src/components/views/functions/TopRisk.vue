<template>
  <!--检查  -->
  <!--显示在不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述  -->
  <!--显示在不同筛选条件（风险等级/致因阶段/分布区域）下，出现次数排名前top的隐患描述  -->
  <!--项目  -->
  <!--显示在不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述-->
  <!--显示在不同筛选条件（风险等级/致因阶段/分布区域）下，出现次数排名前top的隐患描述  -->
  <!--区域  -->
  <!--显示在不同筛选条件（专业/系统）下隐患数量排名前top的隐患描述  -->
  <!--显示在不同筛选条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患描述  -->
  <!--总部  -->
  <!--显示在不同条件(专业/系统)下隐患数量排名前top的隐患  -->
  <!--显示在不同条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患  -->
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%; margin: 2% 4% 2% 0%">
    <div class="level4">
      <span>{{ context.title }}</span>
      <el-select v-model="value" placeholder="请选择" size="mini" style="max-width: 8em;" @change="filterCondition">
        <el-option
            v-for="item in context.option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="top_value" placeholder="请选择" size="mini" style="max-width: 8em;" @change="filterTop">
        <el-option
            v-for="item in top_option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div>
      <div style="display: none">
        {{ getTopRisk }}
      </div>
      <el-table
          :header-cell-style="{color: '#fff'}"
          :data="sub_top_data"
          :row-style="{height: '20px'}"
          :default-sort="{prop: 'appear_time', order: 'descending'}"
          ref="table"
          height="200"
          style="width: 100%; color: #fff">
        <el-table-column
             type='index'>
        </el-table-column>
        <el-table-column
            property="description"
            :label="context.label1" min-width="150px">
        </el-table-column>
        <el-table-column
            prop="belong"
            label="所属" min-width="100px">
        </el-table-column>
        <el-table-column
            prop="appear_time"
            suitable="suitable"
            :label="context.label2">
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "TopRisk",
  props: ['context', 'top_data'],
  data() {
    return {
      value: "专业",
      top_value: 5,
      top_option: [
        {
          value: 3,
          key: 3
        }, {
          value: 5,
          key: 5
        }, {
          value: 7,
          key: 7
        }, {
          value: 10,
          key: 10
        }],
      sub_top_data: [],
      data: this.top_data
    }
  },
  methods: {
    filterCondition() {
      if (this.context.sign === 'check_risk') {
        let param3 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })
        param3.append('check_code', this.$store.state.get_check.check_code);
        param3.append('condition', obj.key);
        param3.append('top', this.top_value);
        this.$store.commit('get_check/changeParam3', {params: param3})
        this.$store.dispatch('get_check/getCheckRiskTop')
      } else if (this.context.sign === 'check_other') {
        let param4 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })
        param4.append('check_code', this.$store.state.get_check.check_code);
        if ((this.value === '低风险') || (this.value === '中风险') || (this.value === '高风险') || (this.value === '风险')) {
          param4.append('condition', 'risk_level');
          param4.append('level', obj.key);
        } else if ((this.value === '致因阶段') || (this.value === '分布区域')) {
          param4.append('condition', obj.key);
          param4.append('level', 0);
        }
        param4.append('top', this.top_value);
        this.$store.commit('get_check/changeParam4', {params: param4})
        this.$store.dispatch('get_check/getCheckOtherTop')
      } else if (this.context.sign === 'prj_risk') {
        let param3 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })
        param3.append('project_name', this.$store.state.get_project.prj_name);
        param3.append('condition', obj.key);
        param3.append('top', this.top_value);
        this.$store.commit('get_project/changeParam3', {params: param3})
        this.$store.dispatch('get_project/getInitProjectRiskTop')
      } else if (this.context.sign === 'prj_other') {
        let param4 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })
        param4.append('project_name', this.$store.state.get_project.prj_name);
        if ((this.value === '低风险') || (this.value === '中风险') || (this.value === '高风险') || (this.value === '风险')) {
          param4.append('condition', 'risk_level');
          param4.append('level', obj.key);
        } else if ((this.value === '致因阶段') || (this.value === '分布区域')) {
          param4.append('condition', obj.key);
          param4.append('level', 0);
        }
        param4.append('top', this.top_value);
        this.$store.commit('get_project/changeParam4', {params: param4})
        this.$store.dispatch('get_project/getProjectOtherTop')
      } else if (this.context.sign === 'region_risk') {
        let param3 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })
        param3.append('region_name', this.$store.state.get_region.region_name);
        param3.append('condition', obj.key);
        param3.append('top', this.top_value);
        this.$store.commit('get_region/changeParam3', {params: param3})
        this.$store.dispatch('get_region/getInitRegionNumberTop')
      } else if (this.context.sign === 'region_other') {
        let param4 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })
        param4.append('region_name', this.$store.state.get_region.region_name);
        if ((this.value === '低风险') || (this.value === '中风险') || (this.value === '高风险') || (this.value === '风险')) {
          param4.append('condition', 'risk_level');
          param4.append('level', obj.key);
        } else if ((this.value === '致因阶段') || (this.value === '分布区域')) {
          param4.append('condition', obj.key);
          param4.append('level', 0);
        }
        param4.append('top', this.top_value);
        this.$store.commit('get_region/changeParam4', {params: param4})
        this.$store.dispatch('get_region/getRegionOtherTop')
      } else if (this.context.sign === 'head_risk') {
        let param3 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })
        param3.append('headquarter_name', this.$store.state.get_headquarter.head_name);
        param3.append('condition', obj.key);
        param3.append('top', this.top_value);
        this.$store.commit('get_headquarter/changeParam3', {params: param3})
        this.$store.dispatch('get_headquarter/getInitNumberTop')
      } else if (this.context.sign === 'head_other') {
        let param4 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })
        param4.append('headquarter_name', this.$store.state.get_headquarter.head_name);
        if ((this.value === '低风险') || (this.value === '中风险') || (this.value === '高风险') || (this.value === '风险')) {
          param4.append('condition', 'risk_level');
          param4.append('level', obj.key);
        } else if ((this.value === '致因阶段') || (this.value === '分布区域')) {
          param4.append('condition', obj.key);
          param4.append('level', 0);
        }
        param4.append('top', this.top_value);
        this.$store.commit('get_headquarter/changeParam4', {params: param4})
        this.$store.dispatch('get_headquarter/getHeadOtherNumberTop')
      }
    },
    filterTop() {
      if (this.context.sign === 'check_risk') {
        let param3 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })

        param3.append('check_code', this.$store.state.get_check.check_code);
        param3.append('condition', obj.key);
        param3.append('top', this.top_value);
        this.$store.commit('get_check/changeParam3', {params: param3})
        this.$store.dispatch('get_check/getCheckRiskTop')
      } else if (this.context.sign === 'check_other') {
        let param4 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })
        param4.append('check_code', this.$store.state.get_check.check_code);
        if ((this.value === '低风险') || (this.value === '中风险') || (this.value === '高风险') || (this.value === '风险')) {
          param4.append('condition', 'risk_level');
          param4.append('level', obj.key);
        } else if ((this.value === '致因阶段') || (this.value === '分布区域')) {
          param4.append('condition', obj.key);
          param4.append('level', 0);
        }
        param4.append('top', this.top_value);
        this.$store.commit('get_check/changeParam4', {params: param4})
        this.$store.dispatch('get_check/getCheckOtherTop')
      } else if (this.context.sign === 'prj_risk') {
        let param3 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })
        param3.append('project_name', this.$store.state.get_project.prj_name);
        param3.append('condition', obj.key);
        param3.append('top', this.top_value);
        this.$store.commit('get_project/changeParam3', {params: param3})
        this.$store.dispatch('get_project/getInitProjectRiskTop')
      } else if (this.context.sign === 'prj_other') {
        let param4 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })
        param4.append('project_name', this.$store.state.get_project.prj_name);
        if ((this.value === '低风险') || (this.value === '中风险') || (this.value === '高风险') || (this.value === '风险')) {
          param4.append('condition', 'risk_level');
          param4.append('level', obj.key);
        } else if ((this.value === '致因阶段') || (this.value === '分布区域')) {
          param4.append('condition', obj.key);
          param4.append('level', 0);
        }
        param4.append('top', this.top_value);
        this.$store.commit('get_project/changeParam4', {params: param4})
        this.$store.dispatch('get_project/getProjectOtherTop')
      } else if (this.context.sign === 'region_risk') {
        let param3 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })

        param3.append('region_name', this.$store.state.get_region.region_name);
        param3.append('condition', obj.key);
        param3.append('top', this.top_value);
        this.$store.commit('get_region/changeParam3', {params: param3})
        this.$store.dispatch('get_region/getInitRegionNumberTop')
      } else if (this.context.sign === 'region_other') {
        let param4 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })
        param4.append('region_name', this.$store.state.get_region.region_name);
        if ((this.value === '低风险') || (this.value === '中风险') || (this.value === '高风险') || (this.value === '风险')) {
          param4.append('condition', 'risk_level');
          param4.append('level', obj.key);
        } else if ((this.value === '致因阶段') || (this.value === '分布区域')) {
          param4.append('condition', obj.key);
          param4.append('level', 0);
        }
        param4.append('top', this.top_value);
        this.$store.commit('get_region/changeParam4', {params: param4})
        this.$store.dispatch('get_region/getRegionOtherTop')
      } else if (this.context.sign === 'head_risk') {
        let param3 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })

        param3.append('headquarter_name', this.$store.state.get_headquarter.head_name);
        param3.append('condition', obj.key);
        param3.append('top', this.top_value);
        this.$store.commit('get_headquarter/changeParam3', {params: param3})
        this.$store.dispatch('get_headquarter/getInitNumberTop')
      } else if (this.context.sign === 'head_other') {
        let param4 = new URLSearchParams();
        var obj = {};
        //使用find()方法在下拉数据中根据value绑定的数据查找对象
        let _this = this
        obj = this.context.option.find(function (item) {
          return item.value === _this.value;
        })
        param4.append('headquarter_name', this.$store.state.get_headquarter.head_name);
        if ((this.value === '低风险') || (this.value === '中风险') || (this.value === '高风险') || (this.value === '风险')) {
          param4.append('condition', 'risk_level');
          param4.append('level', obj.key);
        } else if ((this.value === '致因阶段') || (this.value === '分布区域')) {
          param4.append('condition', obj.key);
          param4.append('level', 0);
        }
        param4.append('top', this.top_value);
        this.$store.commit('get_headquarter/changeParam4', {params: param4})
        this.$store.dispatch('get_headquarter/getHeadOtherNumberTop')
      }
    },
    updateList() {
      this.sub_top_data = this.getTopRisk
      if ((this.context.sign === 'check_risk') || (this.context.sign === 'check_other') || (this.context.sign === 'prj_risk') || (this.context.sign === 'prj_other')) {
        this.$nextTick(() => {
          // this.sub_top_data = this.getTopRisk
          if (document.getElementById('large1').style.display === 'none')
            document.getElementById('prj_small').style.display = 'block'
        });
      } else if ((this.context.sign === 'region_risk') || (this.context.sign === 'region_other')) {
        this.$nextTick(() => {
          // this.sub_top_data = this.getTopRisk
          if (document.getElementById('region_large1').style.display === 'none')
            document.getElementById('region_small').style.display = 'block'
        });
      } else if ((this.context.sign === 'head_risk') || (this.context.sign === 'head_other')) {
        this.$nextTick(() => {
          // this.sub_top_data = this.getTopRisk
          if (document.getElementById('head_large1').style.display === 'none')
            document.getElementById('head_small').style.display = 'block'
        });
      }
    }
  },
  computed: {
    getTopRisk() {
      let arr = []
      if (this.context.sign === 'check_risk') {
        let data = this.$store.state.get_check.check_risk_top
        arr = []
        this.sub_top_data = []
        for (let i in data) {
          let obj = {
            description: '',
            belong: '',
            appear_time: 0
          }
          // console.log("改变", this.$refs.top.value)
          let value = this.value
          let o = this.context.option.find(function (item) {
            return value === item.value;
          })
          obj['description'] = i
          obj['belong'] = data[i][o.key]
          obj['appear_time'] = data[i].appear_time
          arr.push(obj)
        }
      } else if (this.context.sign === 'check_other') {
        let data = this.$store.state.get_check.check_other_top
        arr = []
        this.sub_top_data = []
        for (let i in data) {
          let obj = {
            description: '',
            belong: '',
            appear_time: 0
          }
          let value = this.value
          let o = this.context.option.find(function (item) {
            return value === item.value;
          })
          obj['belong'] = o.value
          obj['appear_time'] = data[i].appear_time
          arr.push(obj)
          obj['description'] = i
        }
      } else if ((this.context.sign === 'prj_risk') || (this.context.sign === 'region_risk') || (this.context.sign === 'head_risk')) {
        let data = ''
        if (this.context.sign === 'prj_risk') {
          data = this.$store.state.get_project.prj_risk_top
        } else if (this.context.sign === 'region_risk') {
          data = this.$store.state.get_region.risk_number_top
        } else if (this.context.sign === 'head_risk') {
          data = this.$store.state.get_headquarter.risk_number_top
        }
        arr = []
        this.sub_top_data = []
        for (let i in data) {
          let obj = {
            description: '',
            belong: '',
            appear_time: 0
          }
          // console.log("改变", this.$refs.top.value)
          let value = this.value
          let o = this.context.option.find(function (item) {
            return value === item.value;
          })
          if ((this.context.sign === 'region_risk') || (this.context.sign === 'head_risk')) {
            obj['description'] = i
            obj['belong'] = data[i]['count'][o.key]
            obj['appear_time'] = data[i]['count'].appear_time
          } else if (this.context.sign === 'prj_risk') {
            obj['description'] = i
            obj['belong'] = data[i][o.key]
            obj['appear_time'] = data[i].appear_time
          }
          arr.push(obj)
        }
      } else if ((this.context.sign === 'prj_other') || (this.context.sign === 'region_other') || (this.context.sign === 'head_other')) {
        let data = ''
        if (this.context.sign === 'prj_other') {
          data = this.$store.state.get_project.prj_other_top
        } else if (this.context.sign === 'region_other') {
          data = this.$store.state.get_region.risk_other_top
        } else if (this.context.sign === 'head_other') {
          data = this.$store.state.get_headquarter.other_number_top
        }
        arr = []
        this.sub_top_data = []
        for (let i in data) {
          let obj = {
            description: '',
            belong: '',
            appear_time: 0
          }
          let value = this.value
          let o = this.context.option.find(function (item) {
            return value === item.value;
          })
          obj['belong'] = o.value
          obj['appear_time'] = data[i].appear_time
          arr.push(obj)
          obj['description'] = i
        }
      }
      return arr
    }
  },
  mounted() {
    // 拿到表格挂载后的真实DOM
    const table = this.$refs.table
    // 拿到表格中承载数据的div元素
    const divData = table.bodyWrapper
    // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
    setInterval(() => {
      // 元素自增距离顶部1像素
      divData.scrollTop += 1
      // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
      if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
        // 重置table距离顶部距离
        divData.scrollTop = 0
      }
    }, 100)
  },
  updated() {
    this.updateList()
  },
  created() {
    if ((this.context.sign === 'check_risk') || (this.context.sign === 'prj_risk') || (this.context.sign === 'region_risk') || (this.context.sign === 'head_risk')) {
      this.value = "专业"
    } else if ((this.context.sign === 'check_other') || (this.context.sign === 'prj_other') || (this.context.sign === 'region_other') || (this.context.sign === 'head_other')) {
      this.value = "风险"
    }
  }
}
</script>

<style scoped>
/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell {

  background-color: transparent;
}

/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {

  background-color: transparent;
}
</style>