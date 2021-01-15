<template>
  <el-card class="box-card boundary-C" shadow="never"
           style="background-color: transparent; height: 90%; left: 10%; top: 10%">
    <div class="level11" style="padding-top: 15px">
      <span>已检查项目数量</span>
    </div>
    <div class="level12" style="text-align: center; padding-top: 15%">
      {{ getExamineNumber }}
    </div>
  </el-card>
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