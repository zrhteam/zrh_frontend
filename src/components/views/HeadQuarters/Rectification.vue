<template>
  <div class="grid-content bg-purple boundary plus_top">
    <div class="level13">
      <span>总部整改率</span>
    </div>
    <div
        style="color: rgb(247, 10, 10); font-family: Avenir;
        font-weight: bold; font-style: normal; line-height: normal; font-size: 30px;">
        {{getRectificationRate}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Rectification",
  computed: {
    getRectificationRate() {
      let rate = this.$store.state.get_headquarter.rectification;
      let val = parseFloat(rate).toFixed(2)
      return this.current_correction_rate = val + '%';
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