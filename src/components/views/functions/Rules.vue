<template>
  <!--检查显示违反次数排名前10的法规及相关条款号和内容-->
  <!--项目显示违反次数排名前10的法规、违反次数及其相关条款号和内容-->
  <el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%; margin: 2% 4% 2% 0%">
    <div class="level4" style="padding-top: 0px; padding-bottom: 10px; padding-left: 10px">
      <span>{{ context.title }}</span>
    </div>
    <div>
      <el-table
          :header-cell-style="{color: '#fff'}"
          :data="context.top_data"
          :row-style="{height: '20px'}"
          :default-sort="{prop: 'appear_time', order: 'descending'}"
          ref="table"
          height="300"
          style="width: 100%; color: #fff">
        <el-table-column
            property="appear_time"
            :label="context.label1" width="100%">
        </el-table-column>
        <el-table-column
            prop="rule_name"
            suitable="suitable"
            :label="context.label2" min-width="150px">
        </el-table-column>
        <el-table-column
            prop="clause"
            suitable="suitable"
            :label="context.label3">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="color: #ffffff">条款内容: {{ scope.row.clause_contact }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag
                  effect="plain"
                  color="transparent"
                >{{ scope.row.clause }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Rules",
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