<template>
  <div class="grid-content bg-purple">
    <div class="level4">
      <span>项目累计高风险数量排名</span>
    </div>
    <div id="mydiv4">
      <!--              这里写累计高风险数量排名的柱状图-->
      <RegionNumberHistogram></RegionNumberHistogram>
    </div>
  </div>
</template>

<script>
import RegionNumberHistogram from "@/components/views/functions/RegionNumberHistogram.vue";
export default {
  name: "Region3_3",
  components: {RegionNumberHistogram}
}
</script>

<style scoped>

</style>