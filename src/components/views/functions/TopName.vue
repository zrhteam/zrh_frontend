<template>
  <!--存放检查级出现次数排名前10的系统/设备/组件->3张列表-->
  <!--存放项目级出现次数排名前10的系统/设备/组件->3张列表-->
  <!--  <el-card class="box-card " shadow="never"-->
  <!--           style="background-color: transparent; height: 49%; margin: 0px 5px 5px 5px">-->
  <el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%;">
    <div class="level4" style="padding-bottom: 5px; padding-left: 10px">
      <span>{{ context.title }}</span>
    </div>
    <div>
      <el-table
          :header-cell-style="{color: '#fff'}"
          :data="context.top_data"
          :row-style="{height: '0'}"
          :default-sort="{prop: 'appear_time', order: 'descending'}"
          ref="table"
          stripe
          height="2.5rem"
          style="width: 100%; color: #fff">
        <el-table-column
             type='index'>
        </el-table-column>
        <el-table-column
            property="name"
            :label="context.label1" min-width="100px">
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
  name: "TopName",
  props: ['context'],
  mounted() {
    // 拿到表格挂载后的真实DOM
    const table = this.$refs.table
    // 拿到表格中承载数据的div元素
    const divData = table.bodyWrapper
    // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
    setInterval(() => {
      // 元素自增距离顶部1像素
      divData.scrollTop += 1
      // let temp = this.context.top_data.shift()
      // this.context.top_data.push(temp)
      // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
      if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
        // 重置table距离顶部距离
        divData.scrollTop = 0

      //   let temp = this.context.top_data.shift()
      // this.context.top_data.push(temp)
      }
    }, 100)
    // setInterval(() => {
    //
    // }, 1000)
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
