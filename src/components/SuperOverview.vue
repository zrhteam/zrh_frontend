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
           <span style="font-size: 0.4rem; color: #18bff0; bottom:0.35rem; position: relative;">
              {{ nowTime }}
           </span>
          </div>
        </el-col>
        <el-col :span="10" style="height: 100%; color: #1072b5; font-size: 0.12rem;">
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
    <img id="img2_bg" :src="imgSrc2" alt=""
         style="width: 17.1%; left: 31.3%; top: 43.5%; z-index: 1; position: absolute;"/>
    <el-dropdown @command="handleCommand" style="z-index: 2">
      <el-button style="background-image: url(../assets/data_vis.png);
left:-4.5rem; top:2.8rem;
width: 330px;height: 353px;background-repeat:no-repeat ;
background-size:330px 353px; border: 0;
background-color: transparent;
position: absolute">
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, i) in headList" :command="item" @click="enterHead">{{ item }}
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
    }
  },
  mounted() {
    this.headList = this.getHeadList()
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
    }
    this.timer = setInterval(() => {
      this.setNowTimes();
    }, 1000);
  },
  methods: {
    getHeadList() {
      // console.log('grant2', this.$store.state.get_login.grant_data)
      let arr = []
      for (let i in this.$store.state.get_login.grant_data.data.value.headquarter_tag) {
        arr.push(i)
      }
      return arr
    },
    enterDB() {
      window.location.href = 'http://124.71.45.84:8085';//数据库可视化系统的
    },
    enterHead(head_name) {
      //得到选取的总部名称，进入相应总部页面
      // let param = new URLSearchParams();
      // param.append('headquarter_name', head_name);
      // this.$store.commit('get_headquarter/changeParams', {params: param})
      // this.$store.commit('get_headquarter/changeHeadName', {params: param})
      let data = {
        label: head_name
      }
      let node = {
        level: 1
      }
      this.$router.push({path: '/land_headquarters'});
      this.handleTreeNodeClick(data, node)
    },
    handleCommand(command) {
      this.enterHead(command)
    },
    enterDataAnalysis() {
      this.$router.push({path: '/data_compare'});
    },
    enterDataInsight() {
      this.$router.push({path: '/analyze'});
    },
    Click() {
      alert("click")
    },
    goBack() {
      this.$router.replace({path: '/'});
      // this.$router.go(-1)
      // this.$router.push({path: '/'});
      //replace替换原路由，作用是避免回退死循环
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
    window.removeEventListener('popstate', this.goBack, false);
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    sessionStorage.getItem("superMsg") && this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("superMsg"))));
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("superMsg", JSON.stringify(this.$store.state))
    })
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
  /*background: url("../assets/home_page.png") no-repeat;*/
  background: url("../assets/system_select.png") no-repeat;
  background-size: cover;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;
}

</style>