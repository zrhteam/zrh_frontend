<template>
  <div>
    <div class="grid-content bg-purple" >
      <div class = 'level4' style="padding-top: 15px; padding-bottom: 15px">
        <span>未整改高风险隐患图片</span>
      </div>
<!--      图片走马灯播放-->
      <div style = "font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 52px">
        <el-carousel indicator-position="none">
          <el-carousel-item v-for = 'item in img_list' :key = 'item'>
            <img :src = 'item' alt/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div style="display: none">
      {{ getImage }}
    </div>
  </div>

</template>

<script>
export default {
  name: "Region2_2",
  data(){
    return{
      img_list: []
    }
  },
  computed: {
    getImage() {
      let data = this.$store.state.get_region.images;
      console.log('original',data)
      for (let i in data) {
        for (let j in data[i]){
          let obj = 'http://' + data[i][j]
          this.img_list.push(obj)
        }
      }
      //console.log('results',this.img_list)
    },
  }
}
</script>

<style scoped>
img{
  width: 100%;
  height: 100%;
}
</style>