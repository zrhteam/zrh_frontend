<template>
  <div class="grid-content bg-purple">
    <div
        style="color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: 16px; font-size: 16px; height: 16px;">
      <span>已检查项目数量</span>
    </div>
    <div
        style="color: rgb(247, 10, 10); font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 30px;">
      {{ getExamineNumber }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Region1-3",
  computed: {
    getExamineNumber() {
      return this.$store.state.get_region.examine_number;
    },
  }
}
</script>

<style scoped>

</style>