<template>
  <div class="grid-content bg-purple">
    <div style="display: none">
      {{ getPrjNumberChange }}
    </div>
    <div
        style="color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: 16px; font-size: 16px; height: 16px;">
      <span>历次检查隐患数量变化</span>
    </div>
    <div
        style="color: rgb(247, 10, 10); font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 52px;">
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckedHistory",
  computed: {
    getPrjNumberChange() {
      return this.$store.state.get_project.prj_number_change;
    }
  }
}
</script>

<style scoped>

</style>