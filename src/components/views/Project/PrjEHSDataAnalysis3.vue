<template>

</template>

<script>
export default {
  name: "PrjEHSDataAnalysis3",
  data() {
    return {
      riskTop: []
    }
  },
  computed: {
    //得到累计隐患数量
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
  },
  created() {
    this.$store.dispatch('get_project/getInitProjectRiskTop')
    this.$store.dispatch('get_project/getInitProjectSystem')
  }
}
</script>

<style scoped>

</style>