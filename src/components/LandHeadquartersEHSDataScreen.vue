<template>
  <!--  置地总部EHS数据大屏-->
  <headquarterOverview class="head_overview"></headquarterOverview>

</template>

<script>
import headquarterOverview from "@/components/views/HeadQuarters/HeadquarterOverview.vue";

export default {
  name: "LandHeadquartersEHSDataScreen",
  components: {
    headquarterOverview
  },

  data() {
    return {
      head_name: '',
    }
  },
  computed: {},
  methods: {
    selfAdaption() {
      let _this = this;
      let timer = setTimeout(() => {
        window.addEventListener('resize', this.doResize, true)
      }, 10)
      clearTimeout(timer)
    },
    doResize(){
      this.$refs.echarts.resize();
    },
    goBack() {
      if (this.$store.state.get_login.grant_data.data.user_grant === '总部') {
        this.$router.replace({path: '/'});
      } else this.$router.replace({path: '/super_overview'});
      // this.$router.push({path: '/'});
      // this.$router.go(-1)
      //replace替换原路由，作用是避免回退死循环
    },
  },
  mounted() {
    this.selfAdaption();
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
    }
    // alert(1)
    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener("onbeforeunload", () => {
    //   sessionStorage.setItem("headMsg", JSON.stringify(this.$store.state))
    //   alert(1)
      var timer = setTimeout(() => {
        document.getElementById('head_quarter').style.display = 'block'
        document.getElementById('region_part').style.display = 'none'
      }, 200);
    // })
    clearTimeout(timer)


    $(document).ready(function () {
      var whei = $(window).width()
      $("html").css({fontSize: whei / 24});
      $(window).resize(function () {
        var whei = $(window).width();
        $("html").css({fontSize: whei / 24})
      });
    });
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.goBack, false);
    window.removeEventListener('resize', this.doResize, true)
    window.removeEventListener("beforeunload", () => {
      sessionStorage.setItem("headMsg", JSON.stringify(this.$store.state))
    })
  },
  created() {
    // if (!sessionStorage.getItem("headMsg")) {
    // let data = {
    //   label: this.$store.state.get_login.grant_data.data.headquarter_tag
    // }
    // let node = {
    //   level: 1
    // }
    // // this.$router.push({path: '/land_headquarters'});
    // this.handleTreeNodeClick(data, node)
    // if (this.$store.state.get_login.grant_data.data.user_grant === "总部") {
    //   let param = new URLSearchParams();
    //   param.append('headquarter_name', this.$store.state.get_login.grant_data.data.headquarter_tag);
    //   this.$store.commit('get_headquarter/changeParams', {params: param})
    //   //总部名称也需要封装
    //   this.$store.commit('get_headquarter/changeHeadName', {head_name: this.$store.state.get_login.grant_data.data.headquarter_tag})
    //   // this.$store.dispatch('get_headquarter/getInitRiskNumberRank')
    //   // this.$store.dispatch('get_headquarter/getInitImage')
    //   // this.$store.dispatch('get_headquarter/getInitNumberTop')
    //   // this.$store.dispatch('get_headquarter/getInitRiskList')
    //   // this.$store.dispatch('get_headquarter/getInitRiskIndexData')
    //
    //   //显示整个总部检查后的总体危险指数以及各专业对应的危险指数
    //   this.$store.dispatch('get_headquarter/getInitRiskIndexData')
    //   //展示总部各风险等级及其对应的隐患数量
    //   this.$store.dispatch('get_headquarter/getInitRiskLevelData')
    //   //根据风险指数对区域进行排序
    //   this.$store.dispatch('get_headquarter/getInitRiskIndexData')
    //   //显示每个区域的高风险数量
    //   this.$store.dispatch('get_headquarter/getInitRiskNumberRank')
    //
    //   // //筛选，默认发condition: major, top: 5
    //   // let param3 = new URLSearchParams();
    //   // param3.append('headquarter_name', this.$store.state.get_login.grant_data.data.headquarter_tag);
    //   // param3.append('condition', 'major');
    //   // param3.append('top', 5);
    //   // this.$store.commit('get_headquarter/changeParam3', {params: param3})
    //   // //显示在不同条件(专业/系统)下隐患数量排名前top的隐患
    //   // this.$store.dispatch('get_headquarter/getInitNumberTop')
    //   //按年份显示总部的高中低风险等级对应的隐患数量
    //   this.$store.dispatch('get_headquarter/getHeadRiskLevelYear')
    //
    //   //筛选，默认发condition: stage,all top: 5
    //   let param4 = new URLSearchParams();
    //   param4.append('headquarter_name', this.$store.state.get_login.grant_data.data.headquarter_tag);
    //   param4.append('flag', 1);
    //   param4.append('top', 5);
    //   param4.append('stage', '施工');
    //   this.$store.commit('get_headquarter/changeParam4', {params: param4})
    //   //显示在不同条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患 变了
    //   this.$store.dispatch('get_headquarter/getHeadOtherNumberTop')
    //   //按照检查次数对区域排名
    //   this.$store.dispatch('get_headquarter/getHeadCheckRank')
    //   //各专业隐患数量占比
    //   this.$store.dispatch('get_headquarter/getHeadMajorRatio')
    //   // 各致因阶段的隐患数量占比情况
    //   this.$store.dispatch('get_headquarter/getHeadStageRatio')
    //   // 各分布区域的隐患数量占比情况
    //   this.$store.dispatch('get_headquarter/getHeadAreaRatio')
    //   // 展示按照项目数量对区域排名
    //   this.$store.dispatch('get_headquarter/getHeadProjectRank')
    //   // 按专业不同风险等级隐患数量
    //   this.$store.dispatch('get_headquarter/getHeadRiskLevelRatio')
    // }
    // }
    //  查看该用户是否有授权图表
    // let param5 = new URLSearchParams();
    // param5.append('user_name', this.$store.state.get_login.user_name);
    // this.$store.commit('get_login/changeNameParam', {params: param5})
    // this.$store.dispatch('get_login/getGrantInfo')
    //在页面加载时读取sessionStorage里的状态信息
    sessionStorage.getItem("headMsg") && this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("headMsg"))));
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("headMsg", JSON.stringify(this.$store.state))
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
/*@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");*/

.head_overview {
  background: url("../assets/head_overview_bg.png") no-repeat;
  background-size: cover;
  margin: 0 auto;
  width: 100%;
  height: 90%;
  position: relative;
}

#title {
  text-align: left;
  font-size: 28px;
  font-weight: 700;
}

i {
  font-style: normal;
}

.chart-image-icon {
  position: absolute;
  left: 20px;
  top: 0;
  width: 20%;
  height: 80%;
  background-size: 100% 100%;
}

.chart-image-icon {
  font-family: 'microsoft YaHei';
}

.chart-text-title {
  color: #000000;
  font-weight: bold;
  font-style: normal;
  line-height: normal;
  font-size: 12px;
}

.plus_top {
  margin-top: 20px;
}


</style>
