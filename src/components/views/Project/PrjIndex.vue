<template>
  <el-col :span="14" class="" style="height: 100%">
    <!--    <div class="map_container" style="height: 66%; width: 100%; z-index:1; background-color: transparent">-->
    <!--      <div :style="{height:'100%',width:'100%'}" ref="map_2"></div>-->
    <!--    </div>-->
    <div class="map_container" style="height: 66%; width: 100%; z-index:1; background-color: transparent">
      <div :style="{height:'100%',width:'100%'}" ref="map_2"></div>
<!--      <model-fbx :backgroundAlpha="0"-->
<!--                 src='img/vanke.fbx'></model-fbx>-->
    </div>
    <div style="height: 30%; margin: 2%">
      <RiskLevelYear :context="{title:'项目年隐患数量', id:'prj_level_year'}"></RiskLevelYear>
    </div>
  </el-col>
</template>

<script>
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
import elementResizeDetectorMaker from 'element-resize-detector'
import echarts from "echarts";
import { ModelFbx } from "vue-3d-model"

export default {
  name: "PrjIndex",
  components: {
    RiskLevelYear,
    ModelFbx
  },
  props: ["userJson"],
  data() {
    return {
      chart: null
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
#map_1 {
  width: 100%;
  height: calc(100vh);
}
</style>