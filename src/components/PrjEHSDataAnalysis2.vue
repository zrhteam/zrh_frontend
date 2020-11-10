<template>
  <el-row style="margin-bottom: 100px">
    <el-col :span="6">
      <!--          最近一次检查隐患专业占比 饼图-->
    </el-col>
    <el-col :span="6">
      <!--          历次检查累计隐患专业占比 饼图-->
    </el-col>
    <el-col :span="6">
      <div id="subtitle">
        <span>当前未整改高风险隐患列表</span>
      </div>
      <div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
          <el-table-column
              prop="description"
              label="隐患描述">
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <div
            style="color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: 16px; font-size: 16px; height: 16px;">
          <span>未整改高风险隐患图片</span>
        </div>
        <div
            style="color: rgb(247, 10, 10); font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 52px;">
          <!--              图片播放-->
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "PrjEHSDataAnalysis2",
  data() {
    return {
      tableData: [{
        description: '2016-05-02'
      }, {
        description: '2016-05-04'
      }, {
        description: '2016-05-06'
      }],
      timer: ''
    }
  },
  mounted() {
    this.timer = setInterval(this.updateTable, 1000);
  },
  methods: {
    updateTable() {
      let first = this.tableData[0];
      this.tableData.shift();
      this.tableData.push(first);
    },

  },
  beforeDestroy() {
      clearInterval(this.timer);
    }
}
</script>

<style scoped>

</style>