<template>
  <el-table
      :data="noteList"
      ref="risk_table"
      :height="tableHeight"
      :header-cell-style="{color: '#fff'}"
      :show-header="false"
      border
  >
    <el-table-column type="index"
                     :width="35"
                     align="left" style="overflow: hidden">
    </el-table-column>
    <el-table-column v-for="(th, key) in noteHeader"
                     :key="key"
                     :prop="th.prop"
                     :label="th.label"
                     :fixed="th.fixed"
                     :width="th.width"
                     :min-width="th.minWidth" align="left">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "HighRiskNote",
  props: {
    noteList: {
      type: Array,
      default: function () {
        return []
      }
    },
    noteHeader: {
      type: Array,
      default: function () {
        return []
      }
    },
    tableHeight: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      timer: null
    }
  },
  mounted() {
    // 拿到表格挂载后的真实DOM
    const table = this.$refs.risk_table
    // 拿到表格中承载数据的div元素
    const divData = table.bodyWrapper
    // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
    let flag = false
    this.timer = setInterval(() => {
      // 元素自增距离顶部1像素
      let height = divData.offsetHeight/5
      divData.scrollTop += height
      if (flag == true) {
        divData.scrollTop = 0
        flag = false
      }
      // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
      if (divData.clientHeight + divData.scrollTop + 1 >= divData.scrollHeight) {
        // 重置table距离顶部距离
        // divData.scrollTop = 0
        // divData.scrollTop += height
        flag = true
      }
      // if (divData.scrollTop % divData.offsetTop == 0) {debugger
      //   setTimeout(() => {
      //   }, 1000)
      // }
    }, 1000)
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
/* 表格内背景颜色 */
/deep/ .el-table__body-wrapper {
  background-color: rgba(0, 0, 0, 0.25);
}

/deep/ .el-table__row > td {
  border-bottom: 0.1px solid rgba(255, 255, 255, 0.3);
}

/*/deep/ .el-table__row > td .el-table_1_column_1 .is-left {*/
/*  border-left: 0.1px solid rgba(255, 255, 255, 0.3);*/
/*  border-right: none;*/
/*}*/

/*/deep/ .el-table__row > td .el-table_1_column_2 .is-left {*/
/*  border-left: none;*/
/*}*/
</style>