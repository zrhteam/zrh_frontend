<template>
<el-card class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%; margin: 2% 4% 2% 0%">
    <div style="display: none">
      {{ getPrjImage }}
    </div>
    <div class="grid-content bg-purple">
      <div class="level4" style="padding-top: 15px; padding-bottom: 15px; padding-left: 10px">
        <span>高风险隐患</span>
      </div>
      <div
          style="color: rgb(247, 10, 10); font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 52px;">
        <!--              图片播放-->

        <el-carousel indicator-position="none" :interval="3000">
          <el-carousel-item v-for="item in img_list">
            <img :src="item.url" alt/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "CheckHighImage",
  data() {
    return {
      img_list: []
    }
  },
  computed: {
    getPrjImage() {
      let data = this.$store.state.get_check.check_image;
      // console.log(this.$store.state.get_project.prj_image)
      console.log("imagedata", data)
      // this.img_list.push(data);
      //
      // console.log(this.img_list)

      for (let i in data) {
        let obj = {
          url: ''
        }
        obj.url = 'http://' + data[i]
        this.img_list.push(obj)
      }
      console.log(this.img_list)
    },
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>