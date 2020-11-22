<template>
  <div class="grid-content bg-purple">
    <div style="text-align: center">
      <span>项目安全指数排名</span>
    </div>
    <div>
      <div id="mydiv3" style="font-color: black">
        <!--                这里是写项目安全指数排名的柱状图-->

        <SafetyIndexHistogram></SafetyIndexHistogram>
      </div>
    </div>
  </div>
</template>

<script>
import SafetyIndexHistogram from "@/components/views/functions/SafetyIndexHistogram.vue";
export default {
  name: "Region3_2",
  components: {SafetyIndexHistogram}
}
</script>

<style scoped>

</style>