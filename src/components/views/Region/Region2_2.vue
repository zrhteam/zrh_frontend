<template>
  <!--  <el-card class="box-card " shadow="never"-->
  <!--                 style="background-color: transparent; height: 49%; margin: 0px 5px 5px 5px">-->
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px">
    <div class="grid-content bg-purple">
      <div class='level4' style="padding-top: 15px; padding-bottom: 15px">
        <span>未整改高风险隐患图片</span>
      </div>
      <!--      图片走马灯播放-->
      <div style="font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 52px">
        <el-carousel indicator-position="none" height="210px">
          <el-carousel-item v-for='item in img_list'>
            <div style="height: 100%">
              <img :src='item.url' alt style="height: 80%"/>
              <h6 style="height: 20%; font-size: 8px; color: #ffffff; padding: 0">{{ item.note }}</h6>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div style="display: none">
      {{ getImage }}
    </div>
  </el-card>

</template>

<script>
export default {
  name: "Region2_2",
  data() {
    return {
      img_list: [],
    }
  },
  computed: {
    getImage() {
      let data = this.$store.state.get_region.images.image_list;
      console.log('original', data)
      for (let i in data) {
        let obj = {
          url: '',
          note: ''
        }
        obj['url'] = 'http://' + data[i]['image_url']
        obj['note'] = data[i]['check_name'] + ": " + data[i]['note']
        this.img_list.push(obj)
        // for (let j in data[i]){
        //   let obj = 'http://' + data[i][j]
        //   this.img_list.push(obj)
        // }
      }
      console.log('results', this.img_list)
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