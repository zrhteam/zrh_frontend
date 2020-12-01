<template>
  <div>
    <div style="display: none">
      {{ getPrjRiskLevelList }}
    </div>
    <div id="subtitle" class="level4">
      <span>当前未整改高风险隐患列表</span>
    </div>
    <div class="level5">
      <el-table
          :data="riskLevelList"
          style="width: 100%"
          max-height = '400'>
        <el-table-column
            prop="description"
            label="隐患描述">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnsolvedList",
  data() {
    return {
      riskLevelList: []
    }
  },
  computed: {
    getPrjRiskLevelList() {
      let data = this.$store.state.get_project.prj_risk_list;
      console.log(this.$store.state.get_project.prj_risk_list)
      console.log(data)
      let dataArray = []
      for (let i in data) {
        let obj = {
          description: ''
        }
        obj.description = data[i]
        dataArray.push(obj)
      }
      console.log(dataArray)
      this.riskLevelList = dataArray
    },
  },
  mounted() {
    this.timer = setInterval(this.updateTable, 1000);
  },
  methods: {
    updateTable() {
      let first = this.riskLevelList[0];
      this.riskLevelList.shift();
      this.riskLevelList.push(first);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
  }
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