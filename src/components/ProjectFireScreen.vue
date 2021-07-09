<template>
  <div style="height: 100%; background-color: rgb(14, 14, 14)">
    <el-row class="boundary-A" style="height: 10%">
      <div
          style="position: absolute !important; width: 8.75rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 2px;">
        <div class="title">{{ project_name }}消防专业</div>
      </div>
      <div
          style="position: absolute !important; width: 3.75rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0.613rem;">
        <div class="date">{{ nowDate }} {{ nowTime }}</div>
      </div>
      <div
          style="position: absolute !important; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; width: 6.8rem; height: 0.7rem; left: 22rem; top: 40%;">
        <div class="zrh">
        </div>
      </div>
      <div style="position: absolute !important; width: 6.8rem; height: 0.7rem; left: 23.1rem; top: 40%;">
        <el-button class="date" round size="mini" @click="quitProjectFireScreen" style="z-index: 999;top: 40%">退出
        </el-button>
      </div>
    </el-row>
    <el-row class="boundary-A" style="height: 65%">
      <el-col class="boundary-A" :span="8" style="height: 100%;">
        <el-row class="boundary-A" style="height: 50%;">
          <div class="absolute" style="width: 98%; height: 97%; right: 0.2rem; bottom: 0.2rem;">
            <div class="wrapper" id="risk-wrapper"/>
          </div>
          <MajorRisk majorType="fire-major"></MajorRisk>
        </el-row>
        <el-row class="boundary-A" style="height: 50%;">
          <div class="absolute" style="width: 98%; height: 97%; right: 0.2rem; bottom: 0.2rem;">
            <div class="wrapper" id="risk-rank"/>
          </div>
        </el-row>
      </el-col>
      <el-col class="boundary-A" :span="8" style="height: 100%;">
        <el-row class="boundary-A" style="height: 100%;">
          <div class="absolute" style="width: 100%; height: 99%; left: 0px; bottom: 0.2rem;">
            <div class="wrapper" id="major-risk" />
          </div>
          <OneMajorRisk></OneMajorRisk>
        </el-row>


      </el-col>
      <el-col class="boundary-A" :span="8" style="height: 100%">
        <el-row style="height: 100%">
          <CarouselCard></CarouselCard>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="boundary-A" style="height: 25%;">
      <el-col class="boundary-A" :span="19" style="height: 100%">
        <div class="wrapper" id="list"></div>
      </el-col>
      <el-col class="boundary-A" :span="5" style="height: 100%"></el-col>
    </el-row>
  </div>
</template>

<script>
import MajorRisk from "@/components/views/BigScreen/MajorRisk.vue";
import OneMajorRisk from "@/components/views/BigScreen/OneMajorRisk.vue";
import CarouselCard from "@/components/views/BigScreen/CarouselCard.vue";

export default {
  name: "project_fire_screen",
  components: {CarouselCard, OneMajorRisk, MajorRisk},
  data() {
    return {
      project_name: "",
      timer: null,
      nowDate: "",
      nowTime: "",
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.setNowTimes();
    }, 1000);
    $(document).ready(function () {
      var whei = $(window).width()
      $("html").css({fontSize: whei / 24});
      $(window).resize(function () {
        var whei = $(window).width();
        $("html").css({fontSize: whei / 24})
      });
    });
  },
  methods: {
    setNowTimes() {
      let myDate = new Date();
      // console.log(myDate)
      let yy = String(myDate.getFullYear());
      let mm = myDate.getMonth() + 1;
      let dd = String(
          myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate()
      );
      let hou = String(
          myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours()
      );
      let min = String(
          myDate.getMinutes() < 10
              ? "0" + myDate.getMinutes()
              : myDate.getMinutes()
      );
      let sec = String(
          myDate.getSeconds() < 10
              ? "0" + myDate.getSeconds()
              : myDate.getSeconds()
      );
      this.nowDate = yy + "-" + mm + "-" + dd
      this.nowTime = hou + ":" + min + ":" + sec;
    },
    quitProjectFireScreen() {
      // this.$router.push({path: '/land_headquarters'});
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.boundary-A {
  /*border: 1px dashed #fff*/
}

.title {
  width: 8.75rem;
  height: 100%;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-family: "Microsoft Yahei";
  font-size: 0.35rem;
  writing-mode: horizontal-tb;
  letter-spacing: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.date {
  font-family: "Microsoft Yahei";
  font-size: 0.2rem;
  color: #ffffff;
  display: flex;
}

.zrh {
  width: 1.029rem;
  height: 0.3rem;
  pointer-events: auto;
  background-image: url("../assets/zrh.png");
  border-radius: 0px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

/deep/ .el-button {
  background: transparent !important;
  color: #ffffff;
}

.absolute {
  position: absolute !important;
  margin: 0 !important;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
}

.wrapper {
  width: 100%;
  height: 100%;
  pointer-events: auto;
  border-radius: 0px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#risk-wrapper {
  background-image: url("../assets/major_card1.png");
}

#risk-rank {
  background-image: url('../assets/major_card2.png');
}

#major-risk {
  background-image: url('../assets/major_card4.png');
}

#list {
  background-image: url("../assets/major_card6.png");
}
</style>