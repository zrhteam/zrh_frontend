<template>
  <div>
    <div class="main-title">
      <div style="display: none">
        <!--        {{ getPrjImage }}-->
      </div>
      <div class="title-wrapper">
        {{ major_name }}专业-实时隐患图片
      </div>
    </div>
    <div class="slide">
      <div class="slide-wrapper" ref="major">
        <el-carousel indicator-position="none" :interval="2000" :height="dataHeight">
          <el-carousel-item v-for='item in pictureData' :key="item.url">
            <div style="height: 100%">
              <div
                  style="position: absolute; width: 100%; min-height: 20px; top:0px;font-size: 0.15rem; color: #ffffff; padding: 0; overflow: hidden; z-index: 3; background-color: rgba(33, 32, 30, 0.5);">
                {{ item.note }}
              </div>
              <el-image :src='item.url' alt style="height: 100%; width: 100%" :fit="fit"/>
            </div>
          </el-carousel-item>
        </el-carousel>
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
    },
    pictureData: {
      type: Array,
      default: null
    }
  },
  watch: {
    pictureData() {
      if (this.pictureData.length == 0) {
        this.$nextTick(_ => {
          this.$refs.major.innerHTML = '暂无数据'
        })
      }
    }
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