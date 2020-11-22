<template>
  <div>
    <div style="display: none">
      {{ getPrjNumberChange }}
    </div>
    <div>
      <span>历次检查隐患专业占比</span>
    </div>
    <svg></svg>
    <!--          历次检查累计隐患专业占比 饼图-->
  </div>
</template>

<script>
export default {
  name: "CheckHistoryPerc",
  computed: {
    getPrjNumberChange() {
      return this.$store.state.get_project.prj_number_change;
    }
  }
}
</script>

<style scoped>

</style>