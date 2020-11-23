<template>
  <div class="grid-content bg-purple-light">
    <div style="display: none">
      {{ getPrjRiskLevelData }}
    </div>
    <div class="text item level4">
      <span>历次检查累计发现隐患数量</span>
    </div>
    <el-table
        :data="PrjRiskLevelData"
        border
        style="width: 100%" class="level5"
        :header-cell-style="{color:'color: #3e78f3;'}">
      <el-table-column
          prop="risk"
          label="隐患风险等级"
          width="292">
      </el-table-column>
      <el-table-column
          prop="num"
          label="累计发现隐患数量">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CheckedProject",
  data() {
    return {
      PrjRiskLevelData: []
    }
  },
  computed: {
    getPrjRiskLevelData() {
      let data = this.$store.state.get_project.prj_risk_data;
      console.log(this.$store.state.get_project.prj_risk_data)
      console.log(data)
      //  风险等级对应情况
      //  1：低风险； 2：中风险； 3：高风险
      let dataArray = []
      for (let i in data) {
        let obj = {
          risk: '风险',
          num: 0
        }
        if (i == 1) {
          obj.risk = '低风险'
          obj.num = data[i]
        }
        if (i == 2) {
          obj.risk = '中风险'
          obj.num = data[i]
        }
        if (i == 3) {
          obj.risk = '高风险'
          obj.num = data[i]
        }
        dataArray.push(obj)
        console.log(dataArray)
      }
      let obj = {
        risk: '风险',
        num: 0
      }
      if (dataArray.length == 3) {
        obj.risk = '列总计'
        obj.num = dataArray[0].num + dataArray[1].num + dataArray[2].num
        dataArray.push(obj)
        // debugger
        console.log(dataArray)
      }
      this.PrjRiskLevelData = dataArray
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

.el-table-column {
  color: #3e78f3;
}

.el-table td div.cell {
  color: #f80f07;
}
</style>