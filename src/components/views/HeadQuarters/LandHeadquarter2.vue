<template>
  <el-row style="margin-bottom: 100px">
    <el-row>
      <el-col :span="12">
        <ProjectIndex></ProjectIndex>
      </el-col>
      <el-col :span="12">
        <HighProjectRisk></HighProjectRisk>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import IndexHistogram from "@/components/views/functions/IndexHistogram.vue";
import NumberHistogram from "@/components/views/functions/NumberHistogram.vue";
import * as d3 from "d3/dist/d3.js";
import dataService from "@/service/dataService";
import HighProjectRisk from "@/components/views/HeadQuarters/HighProjectRisk.vue";
import ProjectIndex from "@/components/views/HeadQuarters/ProjectIndex.vue";

export default {
  name: "LandHeadquarter2",
  components: {ProjectIndex, HighProjectRisk, IndexHistogram, NumberHistogram},
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('get_headquarter/getInitRiskIndexData')
    this.$store.dispatch('get_headquarter/getInitRiskNumberRank')
  },
  mounted() {
  },
}
</script>

<style scoped>
.grid-content {
  text-align: left;
}
</style>