<template>
  <div style="height: 100%">
    <el-row style="height: 10%" class="boundary-A">
      <!--      <el-col :span="24">-->
      <div
          style="position: absolute !important; width: 700px; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 2px;">
        <div class="title" >实时隐患监控大屏</div>
      </div>
      <div style="position: absolute !important; width: 300px; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 50px;">
        <div class="date">{{ nowDate }} {{ nowTime }}</div>
      </div>
      <!--      </el-col>-->
    </el-row>
    <el-col :span="19" class="boundary-A" style="height: 90%">
      <el-col :span="6" class="boundary-A" style="height: 75%">
        <el-row style="height: 32%" class="boundary-A">
          <div
              style="width: 380px; height: 60%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 30px; top: 141px;">
            <div class="level2">截止目前已发现隐患</div>
            <div class="counter-container">
              <span class="prefix" style="font-size: 0.32rem">累计</span>
              <!--            写一个循环的number-->
              <div id="real-number" style="font-size: 0.32rem">
              </div>
              <span class="suffix" style="font-size: 0.32rem">例</span>
            </div>
          </div>
          <div
              style="position: absolute !important; width: 92px; height: 40%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px;">
            <div class="risk-title">
              高风险
            </div>
            <div class="counter-container">
              <span class="numbers" style="color:rgb(255, 10, 10); font-size: 0.32rem">12</span>
              <span class="suffix" style="font-size: 0.2rem">例</span>
            </div>
          </div>
          <div
              style="position: absolute !important; width: 92px; height: 40%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 150px;">
            <div class="risk-title">
              中风险
            </div>
            <div class="counter-container">
              <span class="numbers" style="color:rgb(255, 139, 0); font-size: 0.32rem">12</span>
              <span class="suffix" style="font-size: 0.2rem">例</span>
            </div>
          </div>
          <div
              style="position: absolute !important; width: 92px; height: 40%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 309px;">
            <div class="risk-title">
              低风险
            </div>
            <div class="counter-container">
              <span class="numbers" style="color: rgb(10, 166, 255); font-size: 0.32rem">12</span>
              <span class="suffix" style="font-size: 0.2rem">例</span>
            </div>
          </div>
        </el-row>
        <el-row style="height: 32%" class="boundary-A">
          <div
              style="position: absolute !important; width: 90%; height: 48%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0px;">
            <div class="major-card">
              <div
                  style="position: absolute !important; width: 72px; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 8px;">
                <div class="risk-title"
                     style="width: 72px; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  消防
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 72px; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 32px;">
                <div class="risk-title"
                     style="width: 72px; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  专业
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 92px; height: 43px; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 75px; top: 26px;">
                <div
                    style="display: flex; align-items: baseline; color: rgb(255, 255, 255); text-align: center; white-space: nowrap; justify-content: flex-end; width: 92px; height: 43px; background-color: rgba(0, 0, 0, 0);">
                  <span class="numbers" style="font-size: 0.32rem">12</span>
                  <span class="suffix" style="font-size: 0.2rem">例</span>
                </div>
              </div>
            </div>
          </div>
          <div
              style="position: absolute !important; width: 90%; height: 48%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 52%; top: 0px;">
            <div class="major-card">
              <div
                  style="position: absolute !important; width: 72px; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 8px;">
                <div class="risk-title"
                     style="width: 72px; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  电梯
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 72px; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 32px;">
                <div class="risk-title"
                     style="width: 72px; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  专业
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 92px; height: 43px; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 75px; top: 26px;">
                <div
                    style="display: flex; align-items: baseline; color: rgb(255, 255, 255); text-align: center; white-space: nowrap; justify-content: flex-end; width: 92px; height: 43px; background-color: rgba(0, 0, 0, 0);">
                  <span class="numbers" style="font-size: 0.32rem">12</span>
                  <span class="suffix" style="font-size: 0.2rem">例</span>
                </div>
              </div>
            </div>
          </div>
          <div
              style="position: absolute !important; width: 100%; height: 48%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 106px;">
            <div class="major-card">
              <div
                  style="position: absolute !important; width: 72px; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 8px;">
                <div class="risk-title"
                     style="width: 72px; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  电气
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 72px; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 32px;">
                <div class="risk-title"
                     style="width: 72px; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  专业
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 92px; height: 43px; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 75px; top: 26px;">
                <div
                    style="display: flex; align-items: baseline; color: rgb(255, 255, 255); text-align: center; white-space: nowrap; justify-content: flex-end; width: 92px; height: 43px; background-color: rgba(0, 0, 0, 0);">
                  <span class="numbers" style="font-size: 0.32rem">12</span>
                  <span class="suffix" style="font-size: 0.2rem">例</span>
                </div>
              </div>
            </div>
          </div>
          <div
              style="position: absolute !important; width: 100%; height: 48%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 52%; top: 106px;">
            <div class="major-card">
              <div
                  style="position: absolute !important; width: 72px; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 8px;">
                <div class="risk-title"
                     style="width: 72px; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  燃气
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 72px; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 32px;">
                <div class="risk-title"
                     style="width: 72px; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  专业
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 92px; height: 43px; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 75px; top: 26px;">
                <div
                    style="display: flex; align-items: baseline; color: rgb(255, 255, 255); text-align: center; white-space: nowrap; justify-content: flex-end; width: 92px; height: 43px; background-color: rgba(0, 0, 0, 0);">
                  <span class="numbers" style="font-size: 0.32rem">12</span>
                  <span class="suffix" style="font-size: 0.2rem">例</span>
                </div>
              </div>
            </div>
          </div>
        </el-row>
        <el-row style="height: 36%" class="boundary-A"></el-row>
      </el-col>
      <el-col :span="6" class="boundary-A" :offset="12" style="height: 75%">
        <el-row style="height: 32%" class="boundary-A"></el-row>
      </el-col>
      <el-col :span="24" class="boundary-A" style="height: 25%">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-col>
    <el-col :span="5" class="boundary-A" style="height: 90%">
      <el-row style="height: 25%" class="boundary-A">
        <CheckScreenCarousel></CheckScreenCarousel>
      </el-row>
      <el-row style="height: 25%" class="boundary-A"></el-row>
      <el-row style="height: 25%" class="boundary-A"></el-row>
      <el-row style="height: 25%" class="boundary-A"></el-row>
    </el-col>
  </div>
</template>

<script>
import CheckScreenCarousel from "@/components/views/Check/CheckScreenCarousel.vue";
export default {
name: "NewProjectScreen",
  components: {CheckScreenCarousel},
  data() {
    return {
      timer: null,
      nowDate: "",
      nowTime: "",
    }
  },
  mounted() {
    //自定义字符串,用于拼接标签
    var loveStr = "";

    //自定义数组
    var loveArr = ['喜爱一个人需要理由吗？', '需要吗？', '不需要吗？'];

    /****forEach循环****/
    loveArr.forEach(e => {
      loveStr += `<span class="number">${e}</span>`;

      // loveStr += `<div>${e}</div>`;
      //   document.getElementById("#real-number").append('<span class="number">'+e+'</span>')
    })
    console.log(loveStr)

    //拼接完字符串数组后用innerHTML把它渲染到页面中
    document.getElementById("real-number").innerHTML = loveStr
    let numbers = document.getElementsByClassName("number")
    if (numbers) {
      for (let i = 0; i < numbers.length; i++) {
        let number = numbers[i]
        number.style.backgroundColor = '#ff6300'
        number.style.display = 'inline-block'
        number.style.fontWeight = 'bolder'
        number.style.marginRight = '0.15rem'
        number.style.borderRadius = '6px'

      }
    }

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
  },
  created() {
    let param = new URLSearchParams();
    param.append('project_name', this.$store.state.get_login.grant_data.data.project_tag);
    this.$store.commit('get_screen/changeParams', {params: param})
    this.$store.dispatch('get_screen/getProjectScreenRiskNumber')
    this.$store.dispatch('get_screen/getProjectScreenRNRank')
    this.$store.dispatch('get_screen/getProjectScreenRiskLevel')
    this.$store.dispatch('get_screen/getProjectScreenStageRatio')
    this.$store.dispatch('get_screen/getProjectScreenHighRiskNote')
    this.$store.dispatch('get_screen/getProjectScreenPictureNote')
    this.$store.dispatch('get_screen/getProjectScreenTable')
  }
}
</script>

<style scoped>
.boundary-A {
  border: 1px dashed #fff
}

.level2 {
  font-family: "Microsoft YaHei";
  font-style: normal;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  color: #ffffff;
  font-size: 0.32rem;
  display: flex;
  align-items: center;
  font-weight: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: normal;
  margin: 0px;
  justify-content: flex-start;
  width: 100%;
}

.counter-container {
  display: flex;
  align-items: baseline;
  color: #ffffff;
  text-align: center;
  white-space: nowrap;
  justify-content: flex-start;
  font-family: "Microsoft Yahei";
  width: 380px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0);
}

.prefix {
  content: '累计';
  color: #ffffff;
  font-weight: normal;
  vertical-align: super;
  font-family: Microsoft Yahei
}

.number {
  background-color: #ff6300;
  display: inline-block;
  /*letter-spacing: 0.02em;*/
  /*text-indent: 0.02em;*/
  /*height: auto;*/
  /*line-height: normal;*/
  font-weight: bolder;
  margin-right: 0.15em;
  border-radius: 6px;
}

.suffix {
  content: '例';
  color: #ffffff;
  font-weight: normal;
  vertical-align: super;
  font-family: Microsoft Yahei
}

.risk-title {
  display: flex;
  align-items: center;
  color: rgb(255, 255, 255);
  font-size: 0.20rem;
  font-weight: normal;
  font-family: "Microsoft YaHei";
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: normal;
  margin: 0px;
  justify-content: flex-start;
  width: 100%;
}

.numbers {
  display: inline-block;
  letter-spacing: 0.02em;
  text-indent: 0.02em;
  height: auto;
  line-height: normal;
  font-size: 30px;
  font-weight: bolder;
  letter-spacing: 0.02em;
  margin-right: 0em;
  border-radius: 0px;
}

.major-card {
  width: 180px;
  height: 100%;
  pointer-events: auto;
  background-image: url("../assets/check_screen_card.png");
  border-radius: 0px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.title {
  width: 700px;
  height: 100%;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-family: "Microsoft Yahei";
  font-size: 28px;
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
</style>