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
import dataService from "@/service/dataService";
import FireHazardIndex from "@/components/views/functions/FireHazardIndex.vue";

import IndexView from "@/components/views/HeadQuarters/IndexView.vue";
import Rectification from "@/components/views/HeadQuarters/Rectification.vue";
import AccumRisk from "@/components/views/HeadQuarters/AccumRisk.vue";

import ProjectIndex from "@/components/views/HeadQuarters/ProjectIndex.vue";
import HighProjectRisk from "@/components/views/HeadQuarters/HighProjectRisk.vue";

import HighRiskImages from "@/components/views/HeadQuarters/HighRiskImages.vue";
import TopAccumRisk from "@/components/views/HeadQuarters/TopAccumRisk.vue";
import UnsolvedList from "@/components/views/HeadQuarters/UnsolvedList.vue";
import headquarterOverview from "@/components/views/HeadQuarters/headquarterOverview.vue";

export default {
  name: "LandHeadquartersEHSDataScreen",
  components: {
    AccumRisk,
    Rectification,
    FireHazardIndex,
    IndexView,

    ProjectIndex,
    HighProjectRisk,

    HighRiskImages,
    TopAccumRisk,
    UnsolvedList,
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
    this.$store.dispatch('get_headquarter/getInitRectification')
    this.$store.dispatch('get_headquarter/getInitRiskLevelData')
    this.$store.dispatch('get_headquarter/getInitRiskNumberRank')
    this.$store.dispatch('get_headquarter/getInitImage')
    this.$store.dispatch('get_headquarter/getInitNumberTop')
    this.$store.dispatch('get_headquarter/getInitRiskList')
    this.$store.dispatch('get_headquarter/getInitRiskIndexData')

    //
    // // this.$store.dispatch('get_headquarter/getInitRiskIndexData')

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
