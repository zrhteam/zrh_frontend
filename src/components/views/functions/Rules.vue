<template>
  <!--检查显示违反次数排名前10的法规及相关条款号和内容-->
  <!--项目显示违反次数排名前10的法规、违反次数及其相关条款号和内容-->
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px">
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
          @row-click="rowClick"
          style="width: 100%; height: 100%; color: #fff">
        <el-table-column
            property="appear_time"
            :label="context.label1" width="100%">
        </el-table-column>
        <el-table-column
            prop="rule_name"
            suitable="suitable"
            :label="context.label2" width="100%">
        </el-table-column>
        <el-table-column
            prop="clause"
            suitable="suitable"
            :label="context.label3" width="100%">
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Rules",
  props: ['context'],
  methods: {
    rowClick(row, column) {
      this.$notify({
          title: '条款内容',
          message: row.clause_contact,
          offset: 200
        });
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