<template>
  <!--  项目和检查的下方表格-->
  <el-table
      :data="recordList"
      ref="record_table"
      :height="tableHeight"
      :header-cell-style="{color: '#fff'}"
      :show-header="true"
      :cell-class-name="cellClassName"
      :row-class-name="rowClassName"
      stripe
  >
    <el-table-column v-if="this.showRank == 'true'" type="index"
                     :width="45"
                     align="left" style="overflow: hidden">
    </el-table-column>
    <el-table-column v-for="(th, key) in tableHeader"
                     :key="key"
                     :prop="th.prop"
                     :label="th.label"
                     :fixed="th.fixed"
                     :width="th.width"
                     :min-width="th.minWidth" align="left" style="overflow: hidden">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "RecordList2",
  props: {
    recordList: {
      type: Array,
      default: function () {
        return []
      }
    },
    tableHeader: {
      type: Array,
      default: function () {
        return []
      }
    },
    tableHeight: {
      type: String,
      default: '100%'
    },
    cellClassName: {
      type: Function,
      default: function () {
        return Function
      }
    },
    rowClassName: {
      type: Function,
      default: function () {
        return Function
      }
    },
    showRank: {
      type: String,
      default: function () {
        return 'false'
      }
    }
  },
  data() {
    return {
      timer: null
    }
  },
  mounted() {
    // 拿到表格挂载后的真实DOM
    const table = this.$refs.record_table
    // 拿到表格中承载数据的div元素
    const divData = table.bodyWrapper
    // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
    let flag = false
    this.timer = setInterval(() => {
      // 元素自增距离顶部1像素
      let height = divData.offsetTop
      divData.scrollTop += height
      if (flag == true) {
        divData.scrollTop = 0
        flag = false
      }
      // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
      if (divData.clientHeight + divData.scrollTop + 1 > divData.scrollHeight) {
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

</style>