<template>
  <div style="height: 100%; width: 100%; z-index:1; background-color: transparent">
    <div style="height: 6rem; width: 11rem; z-index:1; background-color: transparent">
      <model-obj :backgroundAlpha="0"
                 src="img/xitongpiantou_new.obj"
                 mtl="img/xitongpiantou_new.mtl"
                 :position="{ x: -100, y: 0, z: 20 }"
                 :rotation="{ x: Math.PI / 14, y: Math.PI / 10, z: 0 }"
                 :scale="{ x: 1.32, y: 1.32, z: 1.32}"></model-obj>
    </div>
  </div>
</template>

<script>
// import {ModelObj} from "vue-3d-model"

export default {
  name: "PrjIndex",
  components: {
    // ModelObj
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