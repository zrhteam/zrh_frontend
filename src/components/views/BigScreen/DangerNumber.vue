<template>
  <div>
    <div class="absolute-layer" style="width: 372px; height: 41px; left: 0px; top: 0px;">
      <div class="card-label" style="  width: 372px; height: 41px; ">
      </div>
    </div>
    <div class="absolute-layer" style="width: 300px; height: 56px; left: 50px; top: -8px;">
      <div class="card-title" style="width: 300px; height: 56px; font-size: 20px;">
        隐患数量
      </div>
    </div>
    <div class="absolute-layer" style="width: 300px; height: 73px; left: 61px; top: 194px;">
      <div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DangerNumber"
}
</script>

<style scoped>
.absolute-layer {
  position: absolute !important;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
}

.card-label {
  pointer-events: auto;
  background-image: url("../../../assets/card-title.png");
  border-radius: 0px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.card-title {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgb(255, 255, 255);
  font-weight: normal;
  font-family: "Microsoft Yahei";
  writing-mode: horizontal-tb;
  letter-spacing: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>