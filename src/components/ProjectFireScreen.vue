<template>
  <div style="height: 100%">
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
        <el-button class="date" round size="mini" @click="quitProjectScreen" style="z-index: 999;top: 40%">退出
        </el-button>
      </div>
    </el-row>
    <el-row class="boundary-A" style="height: 65%">
      <el-col class="boundary-A" :span="8" style="height: 100%">
        <el-row class="boundary-A" style="height: 50%">
        </el-row>
        <el-row class="boundary-A" style="height: 50%">
        </el-row>
      </el-col>
      <el-col class="boundary-A" :span="8" style="height: 100%"></el-col>
      <el-col class="boundary-A" :span="8" style="height: 100%"></el-col>
    </el-row>
    <el-row class="boundary-A" style="height: 25%">
      <el-col class="boundary-A" :span="19" style="height: 100%"></el-col>
      <el-col class="boundary-A" :span="5" style="height: 100%"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "project_fire_screen",
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
  }
}
</script>

<style scoped>
.boundary-A {
  border: 1px dashed #fff
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

/deep/ .el-button{
  background: transparent !important;
  color: #ffffff;
}
</style>