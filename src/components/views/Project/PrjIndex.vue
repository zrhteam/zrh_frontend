<template>
    <div style="height: 100%; width: 100%; z-index:1; background-color: transparent">
      <model-fbx :backgroundAlpha="0"
                 src='img/xitongpiantou_new.fbx'></model-fbx>
    </div>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector'
import echarts from "echarts";
import { ModelFbx } from "vue-3d-model"

export default {
  name: "PrjIndex",
  components: {
    ModelFbx
  },
  props: ["userJson"],
  data() {
    return {
      chart: null
    }
  },
}
</script>

<style scoped>

</style>