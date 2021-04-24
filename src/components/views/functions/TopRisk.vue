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
  <!--  每一级的两个都合成一个了-->
  <el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%;">
    <div class="level4" style="padding-bottom: 5px; padding-left: 10px">
      <span>{{ context.title }}</span>
      <!--      <el-select v-model="value" placeholder="请选择" size="mini" style="max-width: 8em;" @change="filterCondition">-->
      <!--        <el-option-->
      <!--            v-for="item in context.option"-->
      <!--            :key="item.value"-->
      <!--            :label="item.label"-->
      <!--            :value="item.value"-->
      <!--        >-->
      <!--        </el-option>-->
      <!--      </el-select>-->
      <el-cascader
          size="mini"
          style="max-width: 8em;" @change="filterCondition"
          ref="cascaderAddr"
          :value="value"
          :options="options"
          :props="{ checkStrictly: true }"
          clearable></el-cascader>
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
          stripe
          style="width: 99%; color: #fff; margin: 3px">
        <el-table-column
            type='index'>
        </el-table-column>
        <el-table-column
            property="description"
            :label="context.label1" min-width="200px">
        </el-table-column>
        <el-table-column
            prop="belong"
            label="所属" min-width="100px">
        </el-table-column>
        <el-table-column
            prop="appear_time"
            suitable="suitable"
            :label="context.label2" min-width="60px">
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "TopRisk",
  props: ['context'],
  data() {
    return {
      value: "施工",
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
      options: this.$store.state.get_login.danger_selection
    }
  },
  methods: {
    filterCondition() {
      const checkedNodes = this.$refs['cascaderAddr'].getCheckedNodes() // 获取当前点击的节点
      this.value = checkedNodes[0].data.label
      if (this.context.sign === 'check_other') {
        let param4 = new URLSearchParams();
        param4.append('top', this.top_value);
        param4.append('check_code', this.$store.state.get_check.check_code);
        if (checkedNodes[0].level === 1) {
          //致因阶段
          if (checkedNodes[0].data.belong == 'stage') {
            param4.append('flag', 1);
          }
          // 风险等级
          else if (checkedNodes[0].data.belong == 'risk_level') {
            param4.append('flag', 2);
          }
          // 专业
          else if (checkedNodes[0].data.belong == 'major_name') {
            param4.append('flag', 3);
          }
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        } else if (checkedNodes[0].level === 2) {
          //专业+系统
          if (checkedNodes[0].data.belong == 'system_name') {
            param4.append('flag', 4);
          }
          // 专业+区域
          else if (checkedNodes[0].data.belong == 'area') {
            param4.append('flag', 5);
          }
          param4.append(checkedNodes[0].parent.data.belong, checkedNodes[0].parent.data.label);
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        }
        this.$store.commit('get_check/changeParam4', {params: param4})
        this.$store.dispatch('get_check/getCheckOtherTop')
      } else if (this.context.sign === 'prj_other') {
        let param4 = new URLSearchParams();
        param4.append('top', this.top_value);
        param4.append('project_name', this.$store.state.get_project.prj_name);
        if (checkedNodes[0].level === 1) {
          //致因阶段
          if (checkedNodes[0].data.belong == 'stage') {
            param4.append('flag', 1);
          }
          // 风险等级
          else if (checkedNodes[0].data.belong == 'risk_level') {
            param4.append('flag', 2);
          }
          // 专业
          else if (checkedNodes[0].data.belong == 'major_name') {
            param4.append('flag', 3);
          }
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        } else if (checkedNodes[0].level === 2) {
          //专业+系统
          if (checkedNodes[0].data.belong == 'system_name') {
            param4.append('flag', 4);
          }
          // 专业+区域
          else if (checkedNodes[0].data.belong == 'area') {
            param4.append('flag', 5);
          }
          param4.append(checkedNodes[0].parent.data.belong, checkedNodes[0].parent.data.label);
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        }
        this.$store.commit('get_project/changeParam4', {params: param4})
        this.$store.dispatch('get_project/getProjectOtherTop')
      } else if (this.context.sign === 'region_other') {
        let param4 = new URLSearchParams();
        param4.append('top', this.top_value);
        param4.append('region_name', this.$store.state.get_region.region_name);
        if (checkedNodes[0].level === 1) {
          //致因阶段
          if (checkedNodes[0].data.belong == 'stage') {
            param4.append('flag', 1);
          }
          // 风险等级
          else if (checkedNodes[0].data.belong == 'risk_level') {
            param4.append('flag', 2);
          }
          // 专业
          else if (checkedNodes[0].data.belong == 'major_name') {
            param4.append('flag', 3);
          }
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        } else if (checkedNodes[0].level === 2) {
          //专业+系统
          if (checkedNodes[0].data.belong == 'system_name') {
            param4.append('flag', 4);
          }
          // 专业+区域
          else if (checkedNodes[0].data.belong == 'area') {
            param4.append('flag', 5);
          }
          param4.append(checkedNodes[0].parent.data.belong, checkedNodes[0].parent.data.label);
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        }
        this.$store.commit('get_region/changeParam4', {params: param4})
        this.$store.dispatch('get_region/getRegionOtherTop')
      } else if (this.context.sign === 'head_other') {
        let param4 = new URLSearchParams();
        param4.append('top', this.top_value);
        param4.append('headquarter_name', this.$store.state.get_headquarter.head_name);
        if (checkedNodes[0].level === 1) {
          //致因阶段
          if (checkedNodes[0].data.belong == 'stage') {
            param4.append('flag', 1);
          }
          // 风险等级
          else if (checkedNodes[0].data.belong == 'risk_level') {
            param4.append('flag', 2);
          }
          // 专业
          else if (checkedNodes[0].data.belong == 'major_name') {
            param4.append('flag', 3);
          }
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        } else if (checkedNodes[0].level === 2) {
          //专业+系统
          if (checkedNodes[0].data.belong == 'system_name') {
            param4.append('flag', 4);
          }
          // 专业+区域
          else if (checkedNodes[0].data.belong == 'area') {
            param4.append('flag', 5);
          }
          param4.append(checkedNodes[0].parent.data.belong, checkedNodes[0].parent.data.label);
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        }
        this.$store.commit('get_headquarter/changeParam4', {params: param4})
        this.$store.dispatch('get_headquarter/getHeadOtherNumberTop')
      }
    },
    filterTop() {
      const checkedNodes = this.$refs['cascaderAddr'].getCheckedNodes() // 获取当前点击的节点
      // console.log(checkedNodes)
      // console.log(checkedNodes[0].data.label) // 获取当前点击的节点的label
      // console.log(checkedNodes[0].pathLabels) // 获取由 label 组成的数组
      if (this.context.sign === 'check_other') {
        let param4 = new URLSearchParams();
        param4.append('top', this.top_value);
        param4.append('check_code', this.$store.state.get_check.check_code);
        if (checkedNodes[0].level === 1) {
          //致因阶段
          if (checkedNodes[0].data.belong == 'stage') {
            param4.append('flag', 1);
          }
          // 风险等级
          else if (checkedNodes[0].data.belong == 'risk_level') {
            param4.append('flag', 2);
          }
          // 专业
          else if (checkedNodes[0].data.belong == 'major_name') {
            param4.append('flag', 3);
          }
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        } else if (checkedNodes[0].level === 2) {
          //专业+系统
          if (checkedNodes[0].data.belong == 'system_name') {
            param4.append('flag', 4);
          }
          // 专业+区域
          else if (checkedNodes[0].data.belong == 'area') {
            param4.append('flag', 5);
          }
          this.$store.commit('get_check/changeParam4', {params: param4})
          this.$store.dispatch('get_check/getCheckOtherTop')
        }
      } else if (this.context.sign === 'prj_other') {
        let param4 = new URLSearchParams();
        param4.append('top', this.top_value);
        param4.append('project_name', this.$store.state.get_project.prj_name);
        if (checkedNodes[0].level === 1) {
          //致因阶段
          if (checkedNodes[0].data.belong == 'stage') {
            param4.append('flag', 1);
          }
          // 风险等级
          else if (checkedNodes[0].data.belong == 'risk_level') {
            param4.append('flag', 2);
          }
          // 专业
          else if (checkedNodes[0].data.belong == 'major_name') {
            param4.append('flag', 3);
          }
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        } else if (checkedNodes[0].level === 2) {
          //专业+系统
          if (checkedNodes[0].data.belong == 'system_name') {
            param4.append('flag', 4);
          }
          // 专业+区域
          else if (checkedNodes[0].data.belong == 'area') {
            param4.append('flag', 5);
          }
          param4.append(checkedNodes[0].parent.data.belong, checkedNodes[0].parent.data.label);
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        }
        this.$store.commit('get_project/changeParam4', {params: param4})
        this.$store.dispatch('get_project/getProjectOtherTop')
      } else if (this.context.sign === 'region_other') {
        let param4 = new URLSearchParams();
        param4.append('top', this.top_value);
        param4.append('region_name', this.$store.state.get_region.region_name);
        if (checkedNodes[0].level === 1) {
          //致因阶段
          if (checkedNodes[0].data.belong == 'stage') {
            param4.append('flag', 1);
          }
          // 风险等级
          else if (checkedNodes[0].data.belong == 'risk_level') {
            param4.append('flag', 2);
          }
          // 专业
          else if (checkedNodes[0].data.belong == 'major_name') {
            param4.append('flag', 3);
          }
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        } else if (checkedNodes[0].level === 2) {
          //专业+系统
          if (checkedNodes[0].data.belong == 'system_name') {
            param4.append('flag', 4);
          }
          // 专业+区域
          else if (checkedNodes[0].data.belong == 'area') {
            param4.append('flag', 5);
          }
          param4.append(checkedNodes[0].parent.data.belong, checkedNodes[0].parent.data.label);
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        }
        this.$store.commit('get_region/changeParam4', {params: param4})
        this.$store.dispatch('get_region/getRegionOtherTop')
      } else if (this.context.sign === 'head_other') {
        let param4 = new URLSearchParams();
        param4.append('top', this.top_value);
        param4.append('headquarter_name', this.$store.state.get_headquarter.head_name);
        if (checkedNodes[0].level === 1) {
          //致因阶段
          if (checkedNodes[0].data.belong == 'stage') {
            param4.append('flag', 1);
          }
          // 风险等级
          else if (checkedNodes[0].data.belong == 'risk_level') {
            param4.append('flag', 2);
          }
          // 专业
          else if (checkedNodes[0].data.belong == 'major_name') {
            param4.append('flag', 3);
          }
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        } else if (checkedNodes[0].level === 2) {
          //专业+系统
          if (checkedNodes[0].data.belong == 'system_name') {
            param4.append('flag', 4);
          }
          // 专业+区域
          else if (checkedNodes[0].data.belong == 'area') {
            param4.append('flag', 5);
          }
          param4.append(checkedNodes[0].parent.data.belong, checkedNodes[0].parent.data.label);
          param4.append(checkedNodes[0].data.belong, checkedNodes[0].data.label);
        }
        this.$store.commit('get_headquarter/changeParam4', {params: param4})
        this.$store.dispatch('get_headquarter/getHeadOtherNumberTop')
      }
    },
    updateList() {
      this.sub_top_data = this.getTopRisk
      if ((this.context.sign === 'check_other') || (this.context.sign === 'prj_other')) {
        this.$nextTick(() => {
          // this.sub_top_data = this.getTopRisk
          if (document.getElementById('large1').style.display === 'none')
            document.getElementById('prj_small').style.display = 'block'
        });
      } else if (this.context.sign === 'region_other') {
        this.$nextTick(() => {
          // this.sub_top_data = this.getTopRisk
          if (document.getElementById('region_large1').style.display === 'none')
            document.getElementById('region_small').style.display = 'block'
        });
      } else if (this.context.sign === 'head_other') {
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
      // debugger
      let arr = []
      let data = ''
      if (this.context.sign === 'check_other') {
        data = this.$store.state.get_check.check_other_top
      } else if (this.context.sign === 'prj_other') {
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
        obj['belong'] = this.value
        obj['appear_time'] = data[i]
        obj['description'] = i
        arr.push(obj)
      }
      this.options = this.$store.state.get_login.danger_selection
      return arr
    }
  },
  mounted() {
    // 拿到表格挂载后的真实DOM
    const table = this.$refs.table
    // 拿到表格中承载数据的div元素
    const divData = table.bodyWrapper
    let _this = this
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
    this.updateList()
  },
  updated() {
    this.updateList()
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

/deep/ .el-cascader--mini {
  line-height: 0.25rem;
}

/deep/ .el-input--suffix {
  height: 0.25rem;
  line-height: 0.25rem;
}

/deep/ .el-input__inner{
  height: 0.25rem;
  line-height: 0.25rem;
}

/deep/ .el-input__icon{
  height: 0.25rem;
  line-height: 0.25rem;
}

</style>