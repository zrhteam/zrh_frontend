<template>
  <div class="grid-content bg-purple">
    <div style="display: none">
      {{ getPrjRiskTop }}
    </div>
    <div class="level4">
      <span>历次重复出现隐患前五名</span>
    </div>
    <div>
      <el-table
          :data="riskTop"
          style="width: 100%">
        <el-table-column
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            property="description"
            label="隐患描述"
            width="292">
        </el-table-column>
        <el-table-column
            prop="major"
            label="所属专业">
        </el-table-column>
        <el-table-column
            prop="frequency"
            label="出现频率">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryTopRisk",
  data() {
    return {
      riskTop:[],
    }
  },
  methods: {
    getPrjRiskTop() {
      let data = this.$store.state.get_project.prj_risk_top;
      console.log(this.$store.state.get_project.prj_risk_top)
      console.log(data)
      let dataArray = []
      for (let i in data) {
        let obj = {
          description: '隐患描述',
          major: '所属专业',
          frequency: 0
        }
        obj.description = i
        obj.major = data[i].major_name
        obj.frequency = data[i].appear_time
        dataArray.push(obj)
        console.log(dataArray)
      }
      this.riskTop = dataArray
    }
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