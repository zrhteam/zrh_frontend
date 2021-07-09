<template>
  <div>
    <div class="main-title">
      <div style="display: none">
        {{ getPrjImage }}
      </div>
      <div class="title-wrapper">
        {{ major_name }}专业-实时隐患图片
      </div>
    </div>
    <div class="slide">
      <div class="slide-wrapper" ref="major">
        <el-carousel indicator-position="none" :interval="2000" :height="dataHeight">
          <el-carousel-item v-for='item in img_list' :key="item.url">
            <div style="height: 100%">
              <div
                  style="position: absolute; width: 100%; min-height: 20px; top:0px;font-size: 8px; color: #ffffff; padding: 0; overflow: hidden; z-index: 3; background-color: rgba(33, 32, 30, 0.5);">
                {{ item.note }}
              </div>
              <el-image :src='item.url' alt style="height: 100%"/>
            </div>
          </el-carousel-item>
        </el-carousel>
<!--        <el-carousel indicator-position="outside" :height="dataHeight">-->
<!--    <el-carousel-item v-for="item in 4" :key="item">-->
<!--      <h3>{{ item }}</h3>-->
<!--    </el-carousel-item>-->
<!--  </el-carousel>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MajorPicture",
  data() {
    return {
      img_list: [],
      major_name: this.context.name
    }
  },
  props: {
    dataHeight: {
      type: String,
      default: '2.2rem'
    },
    context: {
      type: Object
    }
  },
  computed: {
    getPrjImage() {
      let data
      if (this.context.sign == "project-fire") {
        data = this.$store.state.get_screen.projects_picture_note;
      } else if (this.context.sign == "check-fire") {
        data = this.$store.state.get_screen.checks_picture_note;
      }

      if (this.context.sign == "project-fire" || this.context.sign == "check-fire") {
        this.img_list = []
        for (let i in data['消防专业']) {
          let obj = {
            url: '',
            note: ''
          }
          obj['url'] = 'http://' + data['消防专业'][i]['image_url']
          obj['note'] = data['消防专业'][i]['note']
          this.img_list.push(obj)
        }
      }

      if (this.context.sign == "project-lift") {
        data = this.$store.state.get_screen.projects_picture_note;
      } else if (this.context.sign == "check-lift") {
        data = this.$store.state.get_screen.checks_picture_note;
      }
      if (this.context.sign == "project-lift" || this.context.sign == "check-lift") {
        this.img_list = []
        for (let i in data['电梯专业']) {
          let obj = {
            url: '',
            note: ''
          }
          obj['url'] = 'http://' + data['电梯专业'][i]['image_url']
          obj['note'] = data['电梯专业'][i]['note']
          this.img_list.push(obj)
        }
      }

      if (this.context.sign == "project-electric") {
        data = this.$store.state.get_screen.projects_picture_note;
      } else if (this.context.sign == "check-electric") {
        data = this.$store.state.get_screen.checks_picture_note;
      }
      if (this.context.sign == "project-electric" || this.context.sign == "check-electric") {
        this.img_list = []
        for (let i in data['电气专业']) {
          let obj = {
            url: '',
            note: ''
          }
          obj['url'] = 'http://' + data['电气专业'][i]['image_url']
          obj['note'] = data['电气专业'][i]['note']
          this.img_list.push(obj)
        }
      }

      if (this.context.sign == "project-fuel") {
        data = this.$store.state.get_screen.projects_picture_note;
      } else if (this.context.sign == "check-fuel") {
        data = this.$store.state.get_screen.checks_picture_note;
      }
      if (this.context.sign == "project-fuel" || this.context.sign == "check-fuel") {
        this.img_list = []
        for (let i in data['燃气专业']) {
          let obj = {
            url: '',
            note: ''
          }
          obj['url'] = 'http://' + data['燃气专业'][i]['image_url']
          obj['note'] = data['燃气专业'][i]['note']
          this.img_list.push(obj)
        }
      }
      if (typeof (data.image_list) != undefined) {debugger
        if (this.img_list.length == 0) {
          this.$nextTick(_ => {
            this.$refs.major.innerHTML = '暂无数据'
            // document.getElementById("major-picture").innerHTML
          })
        }
      }
    },
  }
}
</script>

<style scoped>
.main-title {
  position: absolute;
  width: 300px;
  height: 0.5rem;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
  left: 1px;
  top: 0px;
}

.title-wrapper {
  width: 300px;
  height: 0.5rem;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgb(255, 99, 0);
  font-weight: bold;
  font-family: "Microsoft Yahei";
  font-size: 0.2rem;
  writing-mode: horizontal-tb;
  letter-spacing: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.slide {
  position: absolute;
  width: 270px;
  height: 180px;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
  left: 0px;
  top: 0.5rem;
}

.slide-wrapper {
  width: 5rem;
  height: 180px;
  pointer-events: auto;
  font-size: 12px;
  font-family: "Microsoft Yahei";
  color: rgb(255, 255, 255);
  cursor: pointer;
}
</style>