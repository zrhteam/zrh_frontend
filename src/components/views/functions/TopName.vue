<template>
  <!--存放检查级出现次数排名前10的系统/设备/组件->3张列表-->
  <!--存放项目级出现次数排名前10的系统/设备/组件->3张列表-->
<!--  <el-card class="box-card " shadow="never"-->
<!--           style="background-color: transparent; height: 49%; margin: 0px 5px 5px 5px">-->
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%; margin: 2% 2% 2% 2%">
    <div class="level4" style="padding-top: 0px; padding-bottom: 10px; padding-left: 10px">
      <span>{{ context.title }}</span>
    </div>
    <div>
      <el-table
          :header-cell-style="{color: '#fff'}"
          :data="context.top_data"
          :row-style="{height: '20px'}"
          :cell-style="{padding: '0px'}"
          :default-sort="{prop: 'appear_time', order: 'descending'}"
          style="width: 100%; height: 100%; color: #fff">
        <el-table-column
            label="排名" type='index'>
        </el-table-column>
        <el-table-column
            property="name"
            :label="context.label1" width="100%">
        </el-table-column>
        <el-table-column
            prop="appear_time"
            suitable="suitable"
            :label="context.label2" width="100%">
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "TopName",
  props: ['context'],
}
</script>

<style scoped>
/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell{

  background-color: transparent;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {

  background-color: transparent;
}
</style>
