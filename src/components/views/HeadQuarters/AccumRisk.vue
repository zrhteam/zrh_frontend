<template>
  <div>
    <div style="display: none" class="boundary">
      {{ getRiskLevelData }}
    </div>
    <div class="grid-content bg-purple-light boundary">
      <div class="text item level4" style="padding-top: 15px; padding-bottom: 15px; padding-left: 10px;">
        <span>所有项目累计发现隐患数量</span>
      </div>
      <el-table
          :data="riskLevelData"
          :row-style="{height:'20px'}"
          :cell-style="{padding: '5px'}"
          border
          style="width: 100%; color: #93bce7">
        <el-table-column
            prop="risk"
            label="隐患风险等级"
            width="280px">
        </el-table-column>
        <el-table-column
            prop="num"
            label="累计发现隐患数量">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccumRisk",
  data() {
    return {
      riskLevelData: []
    }
  },
  computed: {
    getRiskLevelData() {
      let data = this.$store.state.get_headquarter.risk_level_data.risk_level;
      console.log(this.$store.state.get_headquarter.risk_level_data.risk_level)
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
        console.log(dataArray)
      }
      // obj.risk = '列总计'
      // obj.num = dataArray[0].num + dataArray[1].num + dataArray[2].num
      // dataArray.push(obj)
      // console.log(dataArray)
      this.riskLevelData = dataArray
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