<template>
  <div style="height: 100%; width: 100%; z-index:1; background-color: transparent">
  <div style="height: 6rem; width: 11rem; z-index:1; background-color: transparent">
<!--    <model-fbx :backgroundAlpha="0" :rotation="rotation"-->
<!--               src='img/xitongpiantou_new.fbx' :lights="[-0.1, 0.1, 1]"-->
<!--               :position="{ x: -80, y: 0, z: 0 }"-->
<!--               :scale="{ x: 1.2, y: 1.2, z: 1.2 }"></model-fbx>-->
    <model-obj :backgroundAlpha="0" src="img/xitongpiantou_new.obj"
        mtl="img/xitongpiantou_new.mtl"></model-obj>
  </div>
  </div>
</template>

<script>
import echarts from "echarts";
import {ModelFbx} from "vue-3d-model"
import {ModelObj} from "vue-3d-model"

export default {
  name: "PrjIndex",
  components: {
    ModelFbx,
    ModelObj
  },
  props: ["userJson"],
  data() {
    return {
      rotation: {
        x: 0.1,
        y: 0,
        z: 0
      },
    }
  },
  methods: {
    // onLoad() {
    //   this.rotate();
    // },
    // rotate() {
    //   this.rotation.y += 0.01;
    //
    //   // requestAnimationFrame(this.rotate);
    //   // this.position = {x: 0, y: 0, z: 0}
    // }
  },
  created() {
  }
}
</script>

<style scoped>

</style>