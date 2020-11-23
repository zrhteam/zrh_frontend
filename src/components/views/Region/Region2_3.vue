<template>
  <div class="grid-content bg-purple">
    <div>
      <span>所有项目累计发现隐患专业分布</span>
    </div>
    <div>
      <div id="mycheckbox">
        <checkbox></checkbox>

      </div>
      <!--              在这里展示三维图-->
      <div>
<!--        <RiskDistribution></RiskDistribution>-->
      </div>
    </div>
  </div>
</template>

<script>
import RiskDistribution from "@/components/views/functions/RiskDistribution.vue";
import checkbox from "@/components/views/functions/checkbox.vue";
export default {
  name: "Region2_3",
  components: {RiskDistribution, checkbox}
}
</script>

<style scoped>

</style>