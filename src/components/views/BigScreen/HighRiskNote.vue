<template>
  <el-table
      :data="noteList"
      ref="risk_table"
      :height="tableHeight"
      :header-cell-style="{color: '#fff'}"
      :show-header="false"
  >
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
  mounted() {
    // 拿到表格挂载后的真实DOM
    const table = this.$refs.risk_table
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
  }
}
</script>

<style scoped>

</style>