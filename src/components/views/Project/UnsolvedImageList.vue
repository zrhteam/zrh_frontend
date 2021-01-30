<template>
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px">

    <div class="grid-content bg-purple">
      <div class="level4" style="padding-top: 15px; padding-bottom: 15px; padding-left: 10px">
        <span>未整改高风险隐患图片</span>
        <el-select v-model="top_value" placeholder="请选择" size="mini" style="max-width: 8em;" @change="filterTop">
          <el-option
              v-for="item in top_option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div
          style="color: rgb(247, 10, 10); font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 52px;">
        <!--              图片播放-->
        <el-carousel indicator-position="none">
          <el-carousel-item v-for="item in img_list">
            <img :src="item.url" alt/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div style="display: none">
      {{ getPrjImage }}
    </div>
  </el-card>
</template>

<script>
export default {
  name: "UnsolvedImageList",
  data() {
    return {
      img_list: [],
      top_value: 5,
      top_option: [
        {
          value: 3,
          key: 3
        }, {
          value: 5,
          key: 5
        }, {
          value: 7,
          key: 7
        }, {
          value: 10,
          key: 10
        }],
    }
  },
  computed: {
    getPrjImage() {
      let data = this.$store.state.get_project.prj_image;
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
  },
  methods: {
    filterTop() {
      let param5 = new URLSearchParams();
      var obj = {};
      //使用find()方法在下拉数据中根据value绑定的数据查找对象
      let _this = this
      obj = this.context.option.find(function (item) {
        return item.value === _this.value;
      })
      param5.append('project_name', this.$store.state.get_project.prj_name);
      param5.append('top', this.top_value);
      this.$store.commit('get_project/changeParam5', {params: param5})
      this.$store.dispatch('get_project/getInitProjectImage')
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