<template>
  <el-card class="box-card boundary-C" shadow="never"
           style="background-color: transparent; height: 90%; left: 10%; top: 10%">
    <div class="level13" style="padding-top: 10px; padding-bottom: 10px">
      <span>总部整改率</span>
    </div>
    <div
        style="color: rgb(247, 10, 10); font-family: Avenir;
        font-weight: bold; font-style: normal; line-height: normal; font-size: 30px;">
      {{ getRectificationRate }}
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Rectification",
  computed: {
    getRectificationRate() {
      console.log(this.$store.state.get_headquarter.rectification)
      return this.$store.state.get_headquarter.rectification
    },
  }
}
</script>

<style scoped>
.level13 {
  font-size: 16px;
  font-family: "Microsoft YaHei";
  color: #ffffff;
}

.plus_top {

}
</style>