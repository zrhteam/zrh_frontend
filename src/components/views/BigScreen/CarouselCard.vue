<template>
  <el-carousel indicator-position="outside" style="width: 98%; height: 100%; left: 0.2rem; top: 0px">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3>{{ item }}</h3>
      <div class="absolute" style="width: 100%; height: 656px; left: 0.2rem; top: 0px;">
        <div class="wrapper"></div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "CarouselCard"
}
</script>

<style scoped>
/deep/ .el-carousel__container {
  width: 100%;
  height: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item {
  background-image: url("../../../assets/major_card2.png");
}

.absolute {
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
}
</style>