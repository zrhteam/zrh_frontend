<template>
  <!-- 商业地产事业部2020年巡检项目EHS大数据分析 -->
  <!--  <el-container>-->
  <!--    <el-header>-->
  <!--      <el-row>-->
  <!--        <el-col :span="24">-->
  <!--          <div id="title" class="grid-content bg-purple-dark level1" style="text-align: left; padding-top: 17px">-->
  <!--            <span>商业地产事业部2020年巡检项目EHS大数据分析</span>-->
  <!--          </div>-->
  <!--        </el-col>-->
  <!--      </el-row>-->
  <!--    </el-header>-->
  <!--    <el-main>-->
  <!--&lt;!&ndash;      安全指数&ndash;&gt;-->
  <!--      <el-row class="boundary" type="flex">-->
  <!--        <el-col :span="10" class="boundary-B margin">-->
  <!--          <el-card shadow="never" style="background-color: transparent; height: 280px">-->
  <!--            <el-row class="margin">-->
  <!--            <el-col :span = '24'>-->
  <!--              <div class = 'safety_index' style="height: 150px">-->
  <!--              </div>-->
  <!--            </el-col>-->
  <!--          </el-row>-->
  <!--          &lt;!&ndash;            各专业安全指数&ndash;&gt;-->
  <!--          <el-row class="margin">-->
  <!--            <el-col :span="6">-->
  <!--              <ProjectIndexView :context="{title:'消防指数', val:28.93}"></ProjectIndexView>-->
  <!--            </el-col>-->
  <!--            <el-col :span="6">-->
  <!--              <ProjectIndexView :context="{title:'电梯指数', val:76.83}"></ProjectIndexView>-->
  <!--            </el-col>-->
  <!--            <el-col :span="6">-->
  <!--              <ProjectIndexView :context="{title:'燃气指数', val:82.69}"></ProjectIndexView>-->
  <!--            </el-col>-->
  <!--            <el-col :span="6">-->
  <!--              <ProjectIndexView :context="{title:'电气指数', val:82.69}"></ProjectIndexView>-->
  <!--            </el-col>-->
  <!--          </el-row>-->
  <!--          </el-card>-->


  <!--        </el-col>-->
  <!--&lt;!&ndash;        已检查的项目数量&ndash;&gt;-->
  <!--        <el-col :span="4" class="boundary-B part1 margin">-->
  <!--          <el-card shadow="never" style="background-color: transparent; height: 280px">-->
  <!--          </el-card>-->

  <!--        </el-col>-->
  <!--&lt;!&ndash;        各风险等级对应的隐患数量&ndash;&gt;-->
  <!--        <el-col :span="10" class="boundary-B part1 margin">-->
  <!--          <el-card shadow="never" style="background-color: transparent; height: 280px">-->
  <!--            <Region1_4></Region1_4>-->
  <!--          </el-card>-->
  <!--        </el-col>-->
  <!--      </el-row>-->

  <!--      <el-row class="boundary" tyep="flex">-->
  <!--&lt;!&ndash;        项目当前未整改高风险隐患列表&ndash;&gt;-->
  <!--        <el-col class="boundary-B part2 margin" :span="7">-->
  <!--          <el-card shadow="never" style="background-color: transparent; height: 500px">-->
  <!--            <Region2_1></Region2_1>-->
  <!--          </el-card>-->
  <!--        </el-col>-->
  <!--&lt;!&ndash;        未整改高风险隐患图片&ndash;&gt;-->
  <!--        <el-col class="boundary-B part2 margin" :span="8">-->
  <!--          <el-card shadow="never" style="background-color: transparent; height: 500px">-->
  <!--            <Region2_2></Region2_2>-->
  <!--          </el-card>-->
  <!--        </el-col>-->
  <!--&lt;!&ndash;各项目累计发现的隐患在各专业的分布&ndash;&gt;-->
  <!--        <el-col class="boundary-B part2 margin" :span="8">-->
  <!--          <el-card shadow="never" style="background-color: transparent; height: 500px">-->
  <!--            <Region2_3></Region2_3>-->
  <!--          </el-card>-->
  <!--        </el-col>-->
  <!--      </el-row>-->

  <!--      <el-row class="boundary" type="flex">-->
  <!--&lt;!&ndash;项目累计出现次数前10的隐患及其对应数量&ndash;&gt;-->
  <!--        <el-col :span="8" class="boundary-B part2 margin">-->
  <!--          <el-card shadow="never" style="background-color: transparent; height: 570px">-->
  <!--            <Region3_1></Region3_1>-->
  <!--          </el-card>-->
  <!--        </el-col>-->
  <!--&lt;!&ndash;项目安全指数排名&ndash;&gt;-->
  <!--        <el-col :span="8" class="boundary-B part2 margin">-->
  <!--          <el-card shadow="never" style="background-color: transparent; height: 570px">-->
  <!--            <Region3_2></Region3_2>-->
  <!--          </el-card>-->
  <!--        </el-col>-->
  <!--&lt;!&ndash;项目累计高风险数量排名&ndash;&gt;-->
  <!--        <el-col :span="8" class="boundary-B part2 margin">-->
  <!--          <el-card shadow="never" style="background-color: transparent; height: 570px">-->
  <!--            <Region3_3 ref="echarts"></Region3_3>-->
  <!--          </el-card>-->
  <!--        </el-col>-->

  <!--      </el-row>-->
  <!--    </el-main>-->
  <!--  </el-container>-->
  <RegionOverview class="region-overview"></RegionOverview>
</template>

<script>
import RegionOverview from "@/components/views/Region/RegionOverview.vue";

export default {
  name: "RegionDepartment",
  components: {
    RegionOverview,
  },
  data() {
    return {
      region_name: '',
      doBack: null,
      doStorage: null
    }
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      this.doBack = () => {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1
            && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1
            && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1
            && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
        if (isIE) {
          window.history.back(-1);
        } else if (isEdge) {
          window.history.back(-1);
        } else if (isFF) {
          history.back()
          return false
        } else if (isChrome) {
          window.history.back(-1);
        } else if (isSafari) {
          window.history.back(-1);
        }
      }
      window.addEventListener('popstate', this.doBack, false);
    }
    $(document).ready(function () {
      var whei = $(window).width()
      $("html").css({fontSize: whei / 24});
      $(window).resize(function () {
        var whei = $(window).width();
        $("html").css({fontSize: whei / 24})
      });
    });
  },
  destroyed() {
    window.removeEventListener('popstate', this.doBack, false);
    window.removeEventListener("beforeunload", this.doStorage)

    // this.$destroy(true);
  },
  created() {
    // if (!sessionStorage.getItem("regionMsg")) {
    //   let param = new URLSearchParams();
    //   param.append('region_name', this.$store.state.get_login.grant_data.data.region_tag);
    //   this.$store.commit('get_region/changeParams', {params: param})
    //   //区域名称也需要封装
    //   this.$store.commit('get_region/changeRegionName', {region_name: this.$store.state.get_login.grant_data.data.region_tag})
    //   // this.$store.state.get_region.params = param
    //   // this.$store.dispatch('get_region/getInitRegionProjectNumber')
    //   // this.$store.dispatch('get_region/getInitRegionHighRisk')
    //   // this.$store.dispatch('get_region/getInitRegionMajor')
    //
    //   //显示该区域整体安全指数以及各专业安全指数
    //   this.$store.dispatch('get_region/getRegionInitIndex')
    //   //显示该区域各风险等级对应的隐患数量
    //   this.$store.dispatch('get_region/getInitRegionRiskLevel')
    //   //按照年份显示该区域各等级风险对应的隐患数量
    //   this.$store.dispatch('get_region/getRegionRiskLevelYear')
    //   //显示该区域最新出现的10张未整改高风险隐患图片及该图片对应的检查名称和隐患描述
    //   this.$store.dispatch('get_region/getInitRegionImage')
    //
    //   //筛选，默认发condition: major, top: 5
    //   let param3 = new URLSearchParams();
    //   param3.append('region_name', this.$store.state.get_login.grant_data.data.region_tag);
    //   param3.append('condition', 'major');
    //   param3.append('top', 5);
    //   this.$store.commit('get_region/changeParam3', {params: param3})
    //   //显示在不同筛选条件（专业/系统）下隐患数量排名前top的隐患描述
    //   this.$store.dispatch('get_region/getInitRegionNumberTop')
    //
    //   //筛选，默认发condition: stage,all top: 5
    //   let param4 = new URLSearchParams();
    //   param4.append('region_name', this.$store.state.get_login.grant_data.data.region_tag);
    //   param4.append('flag', 1);
    //   param4.append('top', 5);
    //   param4.append('stage', '施工');
    //   this.$store.commit('get_region/changeParam4', {params: param4})
    //   //显示在不同筛选条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患描述
    //   this.$store.dispatch('get_region/getRegionOtherTop')
    //   //显示按照安全指数排名后的 项目名称
    //   this.$store.dispatch('get_region/getInitRegionSafetyIndex')
    //   //显示按照隐累计高风险患数量排名后的项目名称 (原来的项目累计高风险数量排名)
    //   this.$store.dispatch('get_region/getInitRegionRiskRank')
    //   //基于该区域每个项目的检查次数对项目排名
    //   this.$store.dispatch('get_region/getRegionCheckRank')
    //   //显示该区域各专业隐患占比情况
    //   this.$store.dispatch('get_region/getRegionMajorRatio')
    //
    //   //筛选，默认发major all
    //   let param2 = new URLSearchParams();
    //   param2.append('region_name', this.$store.state.get_login.grant_data.data.region_tag);
    //   param2.append('major', 'all');
    //   this.$store.commit('get_region/changeParam2', {params: param2})
    //   //显示该区域不同专业下各系统隐患占比情况
    //   this.$store.dispatch('get_region/getRegionSystemRatio')
    //   //根据隐患数量显示不同致因阶段的占比情况
    //   this.$store.dispatch('get_region/getRegionStageRatio')
    //   //根据隐患数量显示不同分布区域的占比情况
    //   this.$store.dispatch('get_region/getRegionAreaRatio')
    //   //根据隐患数量显示不同风险等级的占比情况
    //   // this.$store.dispatch('get_region/getRegionLevelRatio')
    //   // 按专业不同风险等级隐患数量
    //   this.$store.dispatch('get_region/getRegionRiskLevelRatio')
    // }
    // //  查看该用户是否有授权图表
    // let param5 = new URLSearchParams();
    // param5.append('user_name', this.$store.state.get_login.user_name);
    // this.$store.commit('get_login/changeNameParam', {params: param5})
    // this.$store.dispatch('get_login/getGrantInfo')

    //在页面加载时读取sessionStorage里的状态信息
    sessionStorage.getItem("regionMsg") && this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("regionMsg"))));
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    this.doStorage = () => {
      sessionStorage.setItem("regionMsg", JSON.stringify(this.$store.state))
    }
    window.addEventListener("beforeunload", this.doStorage)
  }
}
</script>

<style scoped>
/*@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");*/

.region-overview {
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

.i {
  font-style: normal;
}

.part1 {
  /*background-color: #1b1d32;*/
  text-align: left;
  color: #ffffff;
  padding-left: 10px;
  padding-right: 10px;
}

.part2 {
  /*background-color: #242943;*/
  padding-left: 10px;
  padding-right: 10px;
}

</style>
