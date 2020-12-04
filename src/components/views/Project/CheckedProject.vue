<template>
  <div class="grid-content bg-purple-light">
    <div style="display: none">
      {{ getPrjRiskLevelData }}
    </div>
    <div class="text item level4" style="padding-top: 15px; padding-bottom: 15px">
      <span>历次检查累计发现隐患数量</span>
    </div>
    <el-table
        :data="PrjRiskLevelData"
        :row-style="{height: '20px'}"
        :cell-style="{padding: '6px'}"
        border
        style="width: 100%; color: #93bce7" class="level5"
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
      // if(!data.length) {
      //   // this.PrjRiskLevelData = []
      // }
      // else {
        //  风险等级对应情况
      //  1：低风险； 2：中风险； 3：高风险
      let obj1 = {
        risk: '低风险',
        num: 0
      }
      let obj2 = {
        risk: '中风险',
        num: 0
      }
      let obj3 = {
        risk: '高风险',
        num: 0
      }
      let obj = {
        risk: '列总计',
        num: 0
      }
      let dataArray = []
      for (let i in data) {
        for (let j in data[i]) {
          if (j == 1) {
            obj1.num += data[i][j]
          }
          if (j == 2) {
            obj2.num += data[i][j]
          }
          if (j == 3) {
            obj3.num += data[i][j]
          }
        }
      }
      dataArray.push(obj3)
      dataArray.push(obj2)
      dataArray.push(obj1)
      obj.num = obj1.num + obj2.num + obj3.num
      dataArray.push(obj)
      console.log(dataArray)
      this.PrjRiskLevelData = dataArray
      }
    },
  // }
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

.el-table-column {
  color: #3e78f3;
}

.el-table td div.cell {
  color: #f80f07;
}
</style>