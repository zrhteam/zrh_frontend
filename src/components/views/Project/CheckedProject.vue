<template>
  <div class="grid-content bg-purple-light">
    <div style="display: none">
      {{ getPrjRiskLevelData }}
    </div>
    <div class="text item">
      <span>历次检查累计发现隐患数量</span>
    </div>
    <el-table
        :data="PrjRiskLevelData"
        border
        style="width: 100%">
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

</style>