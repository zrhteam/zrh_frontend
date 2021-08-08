<template>
  <el-row class="Check" style="height: 100%;">
    <el-row id="large1" class="" style="height: 1.25rem;">
      <el-col :span="24" style="height: 100%">
        <div class="title-box-card " shadow="never"
             style="background-color: transparent; height: 99%; width: 99%; margin: 0px 5px 0 5px">
          <el-col :span="4" style="height: 100%; ">
            <el-col :span="6" :offset="14" style="height: 100%;">
              <div style="font-size: 0.4rem; font-weight: bold; color: #1fedfc; top:0.36rem; position: relative">
                {{ getRiskSum }}
              </div>
            </el-col>
          </el-col>
          <el-col :span="16" style="height: 100%;">
            <h4>
            <span class="prj_title"
                  style="color: #c4bcbc; font-family:'Microsoft YaHei'; font-size: 0.4em; vertical-align: 85%; height: 100%">{{
                title1
              }}</span>
              <span class="prj_title"
                    style="color: #c4bcbc; font-family:'Microsoft YaHei'; font-size: 0.4em; vertical-align: 85%; height: 100%">{{
                  title2
                }}</span>
              <span class="prj_title"
                    style="color: #c4bcbc; font-family:'Microsoft YaHei'; font-size: 0.4em; vertical-align: 85%; height: 100%">{{
                  title3
                }}</span>
            </h4>
          </el-col>
          <el-col :span="4" style="height: 1.25rem; position: relative; float:right">
            <el-col :span="12" :offset="3" style="height: 100%; ">
              <div style="height: 100%;">
                  <span style="font-size: 0.4rem; color: #18bff0; bottom:0.35rem; position: relative;">
                    {{ nowTime }}
                  </span>
              </div>
            </el-col>
            <el-col :span="9" style="height: 100%; color: #1072b5; font-size: 0.12rem;">
              <el-row style="top: 35%; position: relative;">
                <span>{{ nowWeek }}</span>
              </el-row>
              <el-row style="top: 35%; position: relative;">
                <span>{{ nowDate }}</span>
              </el-row>
            </el-col>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row id="large2" class="" style="height: 86%;">
      <el-col :span="2" class="" style="height: 100%;">
        <Tree
            :treeObj="treeObj"
            :highlightCurrent="highlightCurrent"
            :expandOnClickNode="expandOnClickNode"
            :currentNodeKey="currentNodeKey"
            @handleNodeClick="handleTrNodeClick"
            style="height:94%; width: 120%; margin-top: 5px; margin-bottom: 0.2rem;"
        ></Tree>
        <el-button size="small" round
                   style="width: 110%; z-index: 9; left: 12%; background-color: #2070dd; color: #ffffff; font-size: 0.26rem; font-weight: bold; float: left; letter-spacing:20px; text-indent: 20px;"
                   @click="intoPrjDataScreen">展开
        </el-button>
      </el-col>
      <el-col :span="22" style="height: 100%;">
        <CheckOverview></CheckOverview>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import PerctangePerc from "@/components/views/Project/PerctangePerc.vue";
import CheckHistoryPerc from "@/components/views/Project/CheckHistoryPerc.vue";
import PrjIndex from "@/components/views/Project/PrjIndex.vue";
import CheckOverview from "@/components/views/Check/CheckOverview.vue";
import Tree from "@/components/views/functions/Tree.vue";
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
import BarRank from "@/components/views/functions/BarRank.vue";
import StackedHorizontalBar from "@/components/views/functions/StackedHorizontalBar.vue";

export default {
  name: "Check",
  components: {
    RiskLevelYear,
    CheckOverview,
    PerctangePerc,
    CheckHistoryPerc,
    // PrjEHSDataAnalysis3,
    PrjIndex,
    Tree,
    BarRank,
    StackedHorizontalBar,
  },
  methods: {
    intoPrjDataScreen() {
      // var large1 = document.getElementById('large1');
      // large1.style.display = 'none'
      // var large2 = document.getElementById('large2');
      // large2.style.display = 'none'
      this.$router.push({path: `/new_check_screen`, query: {check_code: this.$store.state.get_check.check_code}});
    },
    handleTrNodeClick(data, node) {
      this.handleTreeNodeClick(data, node)
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
  mounted() {
    this.timer = setInterval(() => {
      this.setNowTimes();
    }, 1000);

    //得到树形控件的内容 还负责封装了地理位置信息
    this.treeObj = this.$store.state.get_login.grant_data.data.value

    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      this.doBack = () => {
        // this.$router.go(-1)
        window.location.href = document.referrer;
        window.history.back(-1);
      }
      window.addEventListener('popstate', this.doBack, false);
    }
    // window.addEventListener("unload", () => {
    //   this.prjNodeClick(this.$store.state.get_login.grant_data.data.project_tag)
    // })

    $(document).ready(function () {
      var whei = $(window).width()
      $("html").css({fontSize: whei / 24});
      $(window).resize(function () {
        var whei = $(window).width();
        $("html").css({fontSize: whei / 24})
      });
    });
  },
  computed: {
    getName() {
      let data = this.$store.state.get_project.prj_sys_name
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.prj_sys_name.push(obj)
      }
    },
    getRiskSum() {
      let data = this.$store.state.get_project.prj_level_year
      let risk_num = 0;
      for (let i in data) {
        for (let j in data[i]) {
          risk_num += data[i][j]
        }
      }
      return risk_num
    }
  },
  data() {
    return {
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      fit: 'fill',
      url: 'http://www.zhongrh.com/Upfiles/Base/2020111937459.png',
      filterText: '',
      treeObj: this.$store.state.get_login.grant_data.data.value,
      highlightCurrent: true,
      expandOnClickNode: false,
      currentNodeKey: 0,
      form: {
        name: '',
      },
      timer: null,
      title1: this.$store.state.get_headquarter.head_name,
      title2: this.$store.state.get_region.region_name,
      title3: this.$store.state.get_project.prj_name,
      prj_sys_name: [],
      nowWeek: "",
      nowDate: "",
      nowTime: "",
      doBack: null,
      doStorage: null
    };
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    sessionStorage.getItem("checkMsg") && this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("checkMsg"))));
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    this.doStorage = () => {
      sessionStorage.setItem("checkMsg", JSON.stringify(this.$store.state))
    }
    window.addEventListener("beforeunload", this.doStorage)

    // console.log('grant', this.$store.state.get_login.grant_data)
    //得到树形控件的内容 还负责封装了地理位置信息
    this.treeObj = this.$store.state.get_login.grant_data.data.value

    this.title1 = this.$store.state.get_headquarter.head_name
    this.title2 = this.$store.state.get_region.region_name
    this.title3 = this.$store.state.get_project.prj_name
  },
  beforeDestroy() {
    clearInterval(this.timer)

    window.removeEventListener('popstate', this.doBack, false);
    window.removeEventListener('beforeunload', this.doStorage);
    // window.removeEventListener("unload", () => {
    //   this.prjNodeClick(this.$store.state.get_login.grant_data.data.project_tag)
    // }, true)

    // this.$destroy(true);
  }
}
</script>

<style scoped>
.Check {
  background: url("../assets/head_overview_bg.png") no-repeat;
  background-size: cover;
  margin: 0 auto;
  width: 100%;
  height: 90%;
  position: relative;
}

.el-button {
  border: none !important;
}

.prj_title {
  background-image: -webkit-linear-gradient(bottom, #04aaff, #45c3ff, #87dcfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 8px;
}
</style>