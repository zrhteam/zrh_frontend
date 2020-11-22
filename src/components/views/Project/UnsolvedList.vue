<template>
  <div>
    <div style="display: none">
      {{ getPrjRiskLevelList }}
    </div>
    <div id="subtitle">
      <span>当前未整改高风险隐患列表</span>
    </div>
    <div>
      <el-table
          :data="riskLevelList"
          stripe
          style="width: 100%">
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

</style>