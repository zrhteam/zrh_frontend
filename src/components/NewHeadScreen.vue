<template>
  <div style="height: 100%">
    <el-row style="height: 10%" class="boundary-A">
      <div class="absolute-layer" style="width: 544px; height: 56px; left: 0px; top: 0px;">
        <div class="title" style="width: 544px; height: 56px; font-size: 39px;">
          总部隐患大屏
        </div>
      </div>
    </el-row>
    <el-col :span="5" class="boundary-A" style="height: 90%">
      <el-row style="height: 40%" class="boundary-A">
        <div class="absolute-layer" style="width: 372px; height: 41px; left: 0px; top: 0px;">
          <div class="card-label" style="  width: 372px; height: 41px; ">
          </div>
        </div>
        <div class="absolute-layer" style="width: 300px; height: 56px; left: 50px; top: -8px;">
          <div class="card-title" style="width: 300px; height: 56px; font-size: 20px;">
            隐患数量
          </div>
        </div>
      </el-row>
      <el-row style="height: 30%" class="boundary-A"></el-row>
      <el-row style="height: 30%" class="boundary-A"></el-row>
    </el-col>
    <el-col :span="14" class="boundary-A" style="height: 90%">
      <el-row style="height: 75%" class="boundary-A"></el-row>
      <el-row style="height: 25%" class="boundary-A"></el-row>
    </el-col>
    <el-col :span="5" class="boundary-A" style="height: 90%">
      <el-row style="height: 35%" class="boundary-A"></el-row>
      <el-row style="height: 35%" class="boundary-A"></el-row>
      <el-row style="height: 30%" class="boundary-A"></el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "NewHeadScreen"
}
</script>

<style scoped>
.boundary-A {
  border: 1px dashed #fff
}

.absolute-layer {
  position: absolute !important;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
}

.title {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-family: 'Microsoft Yahei';
  writing-mode: horizontal-tb;
  letter-spacing: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.card-label {
  pointer-events: auto;
  background-image: url("../assets/card-title.png");
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