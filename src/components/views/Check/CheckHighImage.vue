<template>
  <el-card id="check_img_height" class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%;">
    <!--      <div class="level4" style="padding-bottom: 5px; padding-left: 10px">-->
    <!--        <span class="level4">高风险隐患</span>-->
    <!--      </div>-->
    <!--      <div class="title-line" style=""></div>-->
    <div ref="picture" style="height: 80%">
      <!--              图片播放-->
      <el-carousel indicator-position="none" :interval="3000" :height="dataHeight">
        <el-carousel-item v-for='item in HighImageData'>
          <div style="height: 85%">
            <el-image :src='item.url' alt style="height: 100%; width: 90%"/>
          </div>
          <div style="height: 0.6rem;font-size: 0.15rem; color: #058ddb; padding: 0">{{ item.note }}</div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "CheckHighImage",
  data() {
    return {
      // img_list: [],
    }
  },
  props: {
    dataHeight: {
      type: String,
      default: '3rem'
    },
    HighImageData: {
      type: Array,
      default: null
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>