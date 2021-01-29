<template>
  <!--  置地总部EHS数据大屏-->
<!--  <el-container>-->
<!--    <el-header>-->
<!--      <el-row>-->
<!--        <el-col :span="24">-->
<!--          <div id="title" class="grid-content bg-purple-dark level1" style="text-align: left; padding-top: 20px"><span>置地总部EHS数据大屏</span>-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </el-header>-->
<!--    <el-main>-->
<!--      <el-col :span="6" class="part1 margin">-->
<!--        <el-card shadow="never" style="background-color: transparent; height: 430px">-->
<!--          <Rectification></Rectification>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      &lt;!&ndash;总部4 隐患数量&ndash;&gt;-->
<!--      <el-col :span="6" class="part1 margin">-->
<!--        <el-card shadow="never" style="background-color: transparent; height: 430px">-->
<!--          <AccumRisk></AccumRisk>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      &lt;!&ndash;      </el-row>&ndash;&gt;-->

<!--      &lt;!&ndash;      <el-row class="boundary-B" type="flex">&ndash;&gt;-->
<!--      &lt;!&ndash;&lt;!&ndash;        <el-row>&ndash;&gt;&ndash;&gt;-->
<!--      &lt;!&ndash;          &lt;!&ndash;总部5 项目安全指数排名&ndash;&gt;&ndash;&gt;-->
<!--      <el-col :span="12" class="part2 margin">-->
<!--        &lt;!&ndash;            <el-card shadow="never" style="background-color: transparent; height: 480px">&ndash;&gt;-->
<!--        &lt;!&ndash;              <ProjectIndex></ProjectIndex>&ndash;&gt;-->
<!--        &lt;!&ndash;            </el-card>&ndash;&gt;-->
<!--        &lt;!&ndash;          当前未整改高风险隐患列表&ndash;&gt;-->
<!--        <el-card shadow="never" style="background-color: transparent; height: 450px">-->
<!--          <UnsolvedList></UnsolvedList>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      &lt;!&ndash;总部6 项目累计高风险数量排名&ndash;&gt;-->
<!--      <el-col :span="12" class="part2 margin">-->
<!--        <el-card shadow="never" style="background-color: transparent; height: 480px">-->
<!--          <HighProjectRisk></HighProjectRisk>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      &lt;!&ndash;&lt;!&ndash;        </el-row>&ndash;&gt;&ndash;&gt;-->
<!--      &lt;!&ndash;      </el-row>&ndash;&gt;-->
<!--      <el-row class="boundary-B" type="flex">-->
<!--        &lt;!&ndash;总部7 未整改高风险图片&ndash;&gt;-->
<!--        <el-col :span="12" class="part2 margin">-->
<!--          <el-card shadow="never" style="background-color: transparent; height: 460px">-->
<!--            <HighRiskImages class="boundary-C"></HighRiskImages>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--        &lt;!&ndash;总部8 项目累计风险数量前10&ndash;&gt;-->
<!--        <el-col :span="12" class="part2 margin">-->
<!--          <el-card shadow="never" style="background-color: transparent; height: 460px">-->
<!--            <TopAccumRisk class="boundary-C"></TopAccumRisk>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </el-main>-->
<!--  </el-container>-->
  <headquarterOverview></headquarterOverview>

</template>

<script>
import * as d3 from "d3";
// import dataService from "@/service/dataService";
// import FireHazardIndex from "@/components/views/functions/FireHazardIndex.vue";
//
// import IndexView from "@/components/views/HeadQuarters/IndexView.vue";
// import Rectification from "@/components/views/HeadQuarters/Rectification.vue";
// import AccumRisk from "@/components/views/HeadQuarters/AccumRisk.vue";
//
// import ProjectIndex from "@/components/views/HeadQuarters/ProjectIndex.vue";
// import HighProjectRisk from "@/components/views/HeadQuarters/HighProjectRisk.vue";
//
// import HighRiskImages from "@/components/views/HeadQuarters/HighRiskImages.vue";
// import TopAccumRisk from "@/components/views/HeadQuarters/TopAccumRisk.vue";
// import UnsolvedList from "@/components/views/HeadQuarters/UnsolvedList.vue";
import headquarterOverview from "@/components/views/HeadQuarters/HeadquarterOverview.vue";

export default {
  name: "LandHeadquartersEHSDataScreen",
  components: {
    // AccumRisk,
    // Rectification,
    // FireHazardIndex,
    // IndexView,
    //
    // ProjectIndex,
    // HighProjectRisk,
    //
    // HighRiskImages,
    // TopAccumRisk,
    // UnsolvedList,
    headquarterOverview
  },

  data(){
    return{
      head_name: '',
    }
  },
  computed: {

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
  mounted() {
    this.selfAdaption();
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false
  },
  created() {
    let param = new URLSearchParams();
    param.append('headquarter_name', this.$store.state.get_login.grant_data.data.headquarter_tag);
    this.$store.commit('get_headquarter/changeParams', {params: param})
    //总部名称也需要封装
    this.$store.commit('get_headquarter/changeHeadName', {head_name: this.$store.state.get_login.grant_data.data.headquarter_tag})
    // this.$store.dispatch('get_headquarter/getInitRectification')
    // this.$store.dispatch('get_headquarter/getInitRiskNumberRank')
    // this.$store.dispatch('get_headquarter/getInitImage')
    // this.$store.dispatch('get_headquarter/getInitNumberTop')
    // this.$store.dispatch('get_headquarter/getInitRiskList')
    // this.$store.dispatch('get_headquarter/getInitRiskIndexData')

    //显示整个总部检查后的总体危险指数以及各专业对应的危险指数
    this.$store.dispatch('get_headquarter/getInitRiskIndexData')
    //展示总部各风险等级及其对应的隐患数量
    this.$store.dispatch('get_headquarter/getInitRiskLevelData')
    //根据风险指数对区域进行排序
    this.$store.dispatch('get_headquarter/getInitRiskIndexData')
    //显示每个区域的高风险数量
    this.$store.dispatch('get_headquarter/getInitRiskNumberRank')

    //筛选，默认发condition: major, top: 5
    let param3 = new URLSearchParams();
    param3.append('headquarter_name', this.$store.state.get_login.grant_data.data.headquarter_tag);
    param3.append('condition', 'major');
    param3.append('top', 5);
    this.$store.commit('get_headquarter/changeParam3', {params: param3})
    //显示在不同条件(专业/系统)下隐患数量排名前top的隐患
    this.$store.dispatch('get_headquarter/getInitNumberTop')
    //按年份显示总部的高中低风险等级对应的隐患数量
    this.$store.dispatch('get_headquarter/getHeadRiskLevelYear')

    //筛选，默认发condition: stage,all top: 5
    let param4 = new URLSearchParams();
    param4.append('headquarter_name', this.$store.state.get_login.grant_data.data.headquarter_tag);
    param4.append('condition', 'risk_level');
    param4.append('level', 'all');
    param4.append('top', 5);
    this.$store.commit('get_headquarter/changeParam4', {params: param4})
    //显示在不同条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患
    this.$store.dispatch('get_headquarter/getHeadOtherNumberTop')
    //按照检查次数对区域排名
    this.$store.dispatch('get_headquarter/getHeadCheckRank')
    //各专业隐患数量占比
    this.$store.dispatch('get_headquarter/getHeadMajorRatio')
    // 各致因阶段的隐患数量占比情况
    this.$store.dispatch('get_headquarter/getHeadStageRatio')
    // 各分布区域的隐患数量占比情况
    this.$store.dispatch('get_headquarter/getHeadAreaRatio')
    // 展示按照项目数量对区域排名
    this.$store.dispatch('get_headquarter/getHeadProjectRank')
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

.part1 {
  /*background-color: #1b1d32;*/
  padding-right: 10px;
  padding-left: 10px;
}

.part2 {
  /*background-color: #21253c;*/
  padding-right: 10px;
  padding-left: 10px;
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
  background-image: url('svg/card-skin-1.svg');
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
