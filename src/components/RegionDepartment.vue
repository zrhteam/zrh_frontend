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
  <RegionOverview></RegionOverview>
</template>

<script>
import SafetyIndexHistogram from "@/components/views/functions/SafetyIndexHistogram.vue";
import RegionNumberHistogram from "@/components/views/functions/RegionNumberHistogram.vue";
import checkbox from "@/components/views/functions/checkbox.vue";
import ProjectIndexView from "@/components/views/Region/ProjectIndexView.vue";
import Region1_4 from "@/components/views/Region/Region1_4.vue";
import Region2_1 from "@/components/views/Region/Region2_1.vue";
import Region2_2 from "@/components/views/Region/Region2_2.vue";
import Region2_3 from "@/components/views/Region/Region2_3.vue";
import Region3_1 from "@/components/views/Region/Region3_1.vue";
import Region3_2 from "@/components/views/Region/Region3_2.vue";
import Region3_3 from "@/components/views/Region/Region3_3.vue";
import RegionOverview from "@/components/views/Region/RegionOverview.vue";

export default {
  name: "RegionDepartment",
  components: {
    RegionOverview,
    Region3_3,
    Region3_2,
    Region3_1,
    Region2_3,
    Region2_2,
    Region2_1,
    Region1_4,
    ProjectIndexView,
    checkbox
  },
  data(){
    return {
      region_name: '',
    }
  },

  computed: {
    //得到已检查项目数量


    //得到各等级风险对应的隐患数量


    //得到未整改高风险隐患列表


    //得到未整改高风险隐患图片


    //得到排名前十的隐患描述


  },
  mounted() {
    this.selfAdaption();
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false
  },
  methods: {
    selfAdaption(){
      let _this = this;
      setTimeout(() =>{
        window.addEventListener('resize', function () {
          _this.$refs.echarts.resize();
        })
      }, 10)
    }
  },

  created() {
    if (!sessionStorage.getItem("regionMsg")) {
      let param = new URLSearchParams();
      param.append('region_name', this.$store.state.get_login.grant_data.data.region_tag);
      this.$store.commit('get_region/changeParams', {params: param})
      //区域名称也需要封装
      this.$store.commit('get_region/changeRegionName', {region_name: this.$store.state.get_login.grant_data.data.region_tag})
      // this.$store.state.get_region.params = param
      // this.$store.dispatch('get_region/getInitRegionProjectNumber')
      // this.$store.dispatch('get_region/getInitRegionHighRisk')
      // this.$store.dispatch('get_region/getInitRegionMajor')

      //显示该区域整体安全指数以及各专业安全指数
      this.$store.dispatch('get_region/getRegionInitIndex')
      //显示该区域各风险等级对应的隐患数量
      this.$store.dispatch('get_region/getInitRegionRiskLevel')
      //按照年份显示该区域各等级风险对应的隐患数量
      this.$store.dispatch('get_region/getRegionRiskLevelYear')
      //显示该区域最新出现的10张未整改高风险隐患图片及该图片对应的检查名称和隐患描述
      this.$store.dispatch('get_region/getInitRegionImage')

      //筛选，默认发condition: major, top: 5
      let param3 = new URLSearchParams();
      param3.append('region_name', this.$store.state.get_login.grant_data.data.region_tag);
      param3.append('condition', 'major');
      param3.append('top', 5);
      this.$store.commit('get_region/changeParam3', {params: param3})
      //显示在不同筛选条件（专业/系统）下隐患数量排名前top的隐患描述
      this.$store.dispatch('get_region/getInitRegionNumberTop')

      //筛选，默认发condition: stage,all top: 5
      let param4 = new URLSearchParams();
      param4.append('region_name', this.$store.state.get_login.grant_data.data.region_tag);
      param4.append('condition', 'risk_level');
      param4.append('level', 'all');
      param4.append('top', 5);
      this.$store.commit('get_region/changeParam4', {params: param4})
      //显示在不同筛选条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患描述
      this.$store.dispatch('get_region/getRegionOtherTop')
      //显示按照安全指数排名后的 项目名称
      this.$store.dispatch('get_region/getInitRegionSafetyIndex')
      //显示按照隐累计高风险患数量排名后的项目名称 (原来的项目累计高风险数量排名)
      this.$store.dispatch('get_region/getInitRegionRiskRank')
      //基于该区域每个项目的检查次数对项目排名
      this.$store.dispatch('get_region/getRegionCheckRank')
      //显示该区域各专业隐患占比情况
      this.$store.dispatch('get_region/getRegionMajorRatio')

      //筛选，默认发major all
      let param2 = new URLSearchParams();
      param2.append('region_name', this.$store.state.get_login.grant_data.data.region_tag);
      param2.append('major', 'all');
      this.$store.commit('get_region/changeParam2', {params: param2})
      //显示该区域不同专业下各系统隐患占比情况
      this.$store.dispatch('get_region/getRegionSystemRatio')
      //根据隐患数量显示不同致因阶段的占比情况
      this.$store.dispatch('get_region/getRegionStageRatio')
      //根据隐患数量显示不同分布区域的占比情况
      this.$store.dispatch('get_region/getRegionAreaRatio')
      //根据隐患数量显示不同风险等级的占比情况
      // this.$store.dispatch('get_region/getRegionLevelRatio')
    }
    //  查看该用户是否有授权图表
    let param5 = new URLSearchParams();
    param5.append('user_name', this.$store.state.get_login.user_name);
    this.$store.commit('get_login/changeNameParam', {params: param5})
    this.$store.dispatch('get_login/getGrantInfo')

    //在页面加载时读取sessionStorage里的状态信息
    sessionStorage.getItem("regionMsg") && this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("regionMsg"))));
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("regionMsg", JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

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
