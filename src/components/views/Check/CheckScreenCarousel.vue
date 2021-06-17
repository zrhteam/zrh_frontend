<template>
  <!--  检查级消防、电梯、电气、燃气四个专业的轮播图-->
  <el-card id="check_img_height" class="box-card-t " shadow="never"
           style="background-color: transparent; height: 100%;">
    <div style="display: none">
      {{ getPrjImage }}
    </div>
          <div class="level3" style="padding-bottom: 10px; padding-top: 10px">
            <span>高风险隐患</span>
          </div>
    <div style="height: 80%">
      <!--              图片播放-->
      <el-carousel indicator-position="none" :interval="300000" :height="dataHeight">
        <el-carousel-item v-for='item in img_list'>
          <div style="height: 84%">
            <el-image :src='item.url' alt style="height: 95%"/>
            <div style="height: 5%;font-size: 8px; color: #058ddb; padding: 0">{{ item.note }}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "CheckScreenCarousel",
  data() {
    return {
      img_list: []
    }
  },
  props: {
    dataHeight: {
      type: String,
      default: '3rem'
    },
    context: {
      type: Object
    }
  },
  computed: {
    getPrjImage() {
      // let data = this.$store.state.get_check.check_image;
      let data
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
.level3 {
  font-family: "Microsoft YaHei";
  font-style: normal;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  color: #ff6300;
}
</style>