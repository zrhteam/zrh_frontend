<template>

</template>

<script>
import * as d3 from "d3";
import LastCheckPerc from "@/components/views/Project/LastCheckPerc.vue";
import CheckHistoryPerc from "@/components/views/Project/CheckHistoryPerc.vue";
import UnsolvedList from "@/components/views/Project/UnsolvedList.vue";
import UnsolvedImageList from "@/components/views/Project/UnsolvedImageList.vue";

export default {
  name: "PrjEHSDataAnalysis2",
  components: {
    UnsolvedImageList,
    UnsolvedList,
    CheckHistoryPerc,
    LastCheckPerc
  },
  data() {
    return {}
  },
  mounted() {

  },
  methods: {},
  computed: {
    //得到基于项目级展示当前未整改的高风险隐患列表


  },
  created() {
    this.$store.dispatch('get_project/getInitPrjRisk')
    this.$store.dispatch('get_project/getInitProjectNearestPerception')
    // this.$store.dispatch('get_project/getInitProjectNumberChange')  两个参数
    this.$store.dispatch('get_project/getInitProjectImage')

  }
}
</script>

<style scoped>
svg {
  height: 330px;
  width: 460px;
  /* // display: block;*/
  margin-left: 100px;
  /*margin: 0;*/
  z-index: 2
}
</style>