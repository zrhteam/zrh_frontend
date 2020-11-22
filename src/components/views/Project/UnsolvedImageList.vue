<template>
  <div>
    <div style="display: none">
      {{ getPrjImage }}
    </div>
    <div class="grid-content bg-purple">
      <div
          style="color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: 16px; font-size: 16px; height: 16px;">
        <span>未整改高风险隐患图片</span>
      </div>
      <div
          style="color: rgb(247, 10, 10); font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 52px;">
        <!--              图片播放-->

        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in img_list" :key="item">
            <img :src="item.url" alt/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnsolvedImageList",
  data(){
    return {
      img_list: []
    }
  },
  computed: {
    getPrjImage() {
      let data = this.$store.state.get_project.prj_image;
      // console.log(this.$store.state.get_project.prj_image)
      console.log(data)
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

</style>