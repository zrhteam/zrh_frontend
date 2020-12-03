<template>
  <div class="grid-content bg-purple">
    <div class="level11">
      <span>已检查项目数量</span>
    </div>
    <div class="level12" style="text-align: center; padding-top: 40px">
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
.level12 {
  font-size: 62px;
  font-family: Avenir;
  color: #ffffff;
}
</style>