<template>
  <div class="grid-content bg-purple boundary">
    <div
        style="color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: 16px; font-size: 16px; height: 16px;">
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
      return this.$store.state.get_headquarter.rectification ;
    },
  }
}
</script>

<style scoped>

</style>