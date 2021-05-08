<template>
  <el-card id="check_img_height" class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%;">
    <div style="display: none">
      {{ getPrjImage }}
    </div>
    <!--      <div class="level4" style="padding-bottom: 5px; padding-left: 10px">-->
    <!--        <span class="level4">高风险隐患</span>-->
    <!--      </div>-->
    <!--      <div class="title-line" style=""></div>-->
    <div style="height: 80%">
      <!--              图片播放-->
      <el-carousel indicator-position="none" :interval="3000" :height="dataHeight">
        <el-carousel-item v-for='item in img_list'>
          <div style="height: 80%">
            <img :src='item.url' alt style="height: 100%"/>
            <div style="font-size: 8px; color: #058ddb; padding: 0">{{ item.note }}</div>
          </div>
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
      img_list: []
    }
  },
  props: {
    dataHeight: {
      type: String,
      default: '3.2rem'
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
          url: '',
          note: ''
        }
        obj['url'] = 'http://' + data[i]['image_url']
        obj['note'] = data[i]['check_name'] + ": " + data[i]['note']
        this.img_list.push(obj)
      }
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