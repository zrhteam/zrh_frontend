<template>
  <div class="background" style="vertical-align: center">
    <el-row>
      <el-col :span="20" style="height: 1.25rem; ">
        <div style="height: 100%; display: none">
        </div>
      </el-col>
      <el-col :span="4" style="height: 1.25rem; ">
        <el-col :span="14" style="height: 100%; ">
          <div style="height: 100%;">
           <span
               style="font-size: 0.4rem; color: #18bff0; top:30%; right:2rem; position: absolute; font-family: 'Microsoft YaHei'">
              {{ nowTime }}
           </span>
          </div>
        </el-col>
        <el-col :span="10" style="height: 100%; color: #1072b5; font-size: 0.15rem; font-family: 'Microsoft YaHei'">
          <el-row style="top: 35%; right: 0.6rem">
            <span>{{ nowWeek }}</span>
          </el-row>
          <el-row style="top: 35%; right: 0.6rem">
            <span>{{ nowDate }}</span>
          </el-row>
        </el-col>
      </el-col>
    </el-row>
    <img id="img1_bg" :src="imgSrc1" @click="enterDB" alt=""
         style="width: 17.1%; left: 12.7%; top: 41.4%; z-index: 99; position: absolute;"/>
    <img id="img2_bg" :src="imgSrc2" @click="enterHead" alt=""
         style="width: 17.1%; left: 31.3%; top: 44%; z-index: 1; position: absolute;"/>
    <!--    <el-radio-group v-model="radio" style="position: absolute; z-index: 999;top: 70.5%; left: 35.8%; color: #000000">-->
    <!--      <el-radio :label="1">脱敏</el-radio>-->
    <!--      <el-radio :label="2">正常</el-radio>-->
    <!--    </el-radio-group>-->
    <el-dropdown @command="handleCommand" placement="right-start"
                 style="position: absolute; left:10.6rem; top:5.5rem; z-index: 2">
      <el-button style="background-image: url(../assets/data_vis.png);
       left: -3.5rem;
width: 330px;height: 353px;background-repeat:no-repeat;
background-size:330px 353px; border: 0;
background-color: transparent;
position: absolute">
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, i) in mask_arr
" :command="item" @click="enterHead">{{ item }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <img :src="imgSrc3" @click="enterDataAnalysis" alt=""
         style="width: 17.1%; left: 50%; top: 43.5%; z-index: 99; position: absolute;"/>
    <img :src="imgSrc4" @click="enterDataInsight" alt=""
         style="width: 17.1%; left: 68.5%; top: 41.4%; z-index: 99; position: absolute;"/>
  </div>
</template>

<script>
export default {
  name: "SuperOverview",
  data() {
    return {
      headList: [],
      imgSrc1: require('../assets/db_vis.png'),
      imgSrc2: require('../assets/data_vis.png'),
      imgSrc3: require('../assets/data_analysis.png'),
      imgSrc4: require('../assets/data_insight.png'),
      timer: null,
      nowWeek: "",
      nowDate: "",
      nowTime: "",
      doBack: null,
      doStorage: null,
      radio: 2,
      mask_arr: ["A", "B"],
    }
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      this.doBack = () => {
        this.$router.replace({path: '/'});
      }
      window.addEventListener('popstate', this.doBack, false);
    }
    this.timer = setInterval(() => {
      this.setNowTimes();
    }, 1000);
  },
  methods: {
    enterDB() {
      let userType = this.$store.state.get_login.grant_data.data.user_grant //取值:boss，总部，区域，项目
      let headquarter_tag = 'null'
      if (this.$store.state.get_login.grant_data.data.headquarter_tag !== undefined) {
        headquarter_tag = this.$store.state.get_login.grant_data.data.headquarter_tag
      }
      let region_tag = 'null'
      if (this.$store.state.get_login.grant_data.data.region_tag !== undefined) {
        region_tag = this.$store.state.get_login.grant_data.data.region_tag
      }
      let project_tag = 'null'
      if (this.$store.state.get_login.grant_data.data.project_tag !== undefined) {
        project_tag = this.$store.state.get_login.grant_data.data.project_tag
      }

      window.location.href = 'http://124.71.45.84:8085/#/?' +
          window.btoa(window.encodeURIComponent("userType=" + userType + "&headquarter=" + headquarter_tag
              + "&region=" + region_tag + "&project=" + project_tag + "&url=" + window.location.href))
    },
    enterHead(value) {
      let data = {
        label: "华润置地",
        value: "华润置地",
        level: 1
      }
      let node = {
        level: 1
      }
      // 根据radio判断是否需要脱敏，radio为1-》需要脱敏，radio为2-》取消脱敏
      if (value == "A") {
        data.label = "HR"
        this.$store.commit('get_login/changeMasking', {param: true})
        this.$store.commit('get_login/changeExpandedKeys', {param: []})
      } else if (value == "B") {
        this.$store.commit('get_login/changeMasking', {param: false})
        this.$store.commit('get_login/changeExpandedKeys', {param: []})
      }
      //总部名称也需要封装
      this.$store.commit('get_headquarter/changeHeadName', {head_name: data})
      this.$router.push({path: '/land_headquarters', query: {head_name: data}});
      this.handleTreeNodeClick(data, node)
    },
    handleCommand(command) {
      this.enterHead(command)
    },
    enterDataAnalysis() {
      let userType = this.$store.state.get_login.grant_data.data.user_grant //取值:boss，总部，区域，项目
      let headquarter_tag = 'null'
      if (this.$store.state.get_login.grant_data.data.headquarter_tag !== undefined) {
        headquarter_tag = this.$store.state.get_login.grant_data.data.headquarter_tag
      }
      let region_tag = 'null'
      if (this.$store.state.get_login.grant_data.data.region_tag !== undefined) {
        region_tag = this.$store.state.get_login.grant_data.data.region_tag
      }
      let project_tag = 'null'
      if (this.$store.state.get_login.grant_data.data.project_tag !== undefined) {
        project_tag = this.$store.state.get_login.grant_data.data.project_tag
      }

      window.location.href = 'http://124.71.45.84:8090/#/red_line?' +
          window.btoa(window.encodeURIComponent("userType=" + userType + "&headquarter=" + headquarter_tag
              + "&region=" + region_tag + "&project=" + project_tag + "&url=" + window.location.href))
    },
    enterDataInsight() {
      this.$router.push({path: '/analyze'});
    },
    setNowTimes() {
      let myDate = new Date();
      // console.log(myDate)
      let wk = myDate.getDay();
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
      let weeks = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let week = weeks[wk];
      this.nowDate = yy + "." + mm + "." + dd
      this.nowTime = hou + ":" + min + ":" + sec;
      this.nowWeek = week;
    },
  },
  destroyed() {
    window.removeEventListener('popstate', this.doBack, false);
    window.removeEventListener('beforeunload', this.doStorage);
    clearInterval(this.timer)
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    sessionStorage.getItem("superMsg") && this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("superMsg"))));
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    this.doStorage = () => {
      sessionStorage.setItem("superMsg", JSON.stringify(this.$store.state))
    }
    window.addEventListener("beforeunload", this.doStorage)
    $(document).ready(function () {
      var whei = $(window).width()
      $("html").css({fontSize: whei / 24});
      $(window).resize(function () {
        var whei = $(window).width();
        $("html").css({fontSize: whei / 24})
      });
    });
  }
}
</script>

<style scoped>
.background {
  background: url("../assets/system_select.png") no-repeat;
  background-size: cover;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;
}

</style>
