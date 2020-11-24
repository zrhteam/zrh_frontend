<template>
  <!--  置地总部EHS数据大屏-->
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="24">
          <div id="title" class="grid-content bg-purple-dark level1" style="text-align: left"><span>置地总部EHS数据大屏</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row class="boundary-B part1" type="flex">
        <!--总部1 总部安全指数一-->
        <el-col :span="6" class="margin">
          <div class="grid-content bg-purple boundary">
            <div class="chart-image-icon">
              <div class="plus_top">
                <div class="level7">
                  <span>总部危险指数</span>
                </div>
                <div class="level8">
                  <span>23,185</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <!--总部2 专业指数-->
        <el-col :span="6" class="boundary part1 margin">
          <el-row>
            <el-col :span="12">
              <IndexView :context="{title:'消防危险指数'}"></IndexView>
            </el-col>
            <el-col :span="12">
              <IndexView :context="{title:'电梯危险指数'}"></IndexView>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <IndexView :context="{title:'电气危险指数'}"></IndexView>
            </el-col>
            <el-colx :span="12">
              <IndexView :context="{title:'燃气危险指数'}"></IndexView>
            </el-colx>
          </el-row>
        </el-col>
        <!--总部3 整改率-->
        <el-col :span="6" class="part1 margin">
          <Rectification></Rectification>
        </el-col>
        <!--总部4 隐患数量-->
        <el-col :span="6" class="part1 margin">
          <AccumRisk></AccumRisk>
        </el-col>
      </el-row>

      <el-row type="flex">
<!--        <el-row>-->
          <!--总部5 项目安全指数排名-->
          <el-col :span="12" class="part2 margin">
            <ProjectIndex></ProjectIndex>
          </el-col>
          <!--总部6 项目累计好风险数量排名-->
          <el-col :span="12" class="part2 margin">
            <HighProjectRisk></HighProjectRisk>
          </el-col>
<!--        </el-row>-->
      </el-row>
      <el-row type="flex">
        <!--总部7 未整改高风险图片-->
        <el-col :span="12" class="part2 margin">
          <HighRiskImages class="boundary-C"></HighRiskImages>
        </el-col>
        <!--总部8 项目累计好风险数量排名-->
        <el-col :span="12" class="part2 margin">
          <TopAccumRisk class="boundary-C"></TopAccumRisk>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
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
    TopAccumRisk
  },

  computed: {
    //页面初始化时得到总部整改率
    //得到累计隐患数量

  },
  methods: {
    //提交按项目名称查询的函数
    // GetInitPage() {
    //   dataService.getRectificationRate(function (records) {
    //     alert(records.msg)
    //   })
    // }
  },
  created() {
    this.$store.dispatch('get_headquarter/getInitRectification')
    this.$store.dispatch('get_headquarter/getInitRiskLevelData')
    this.$store.dispatch('get_headquarter/getInitNumberTop')

    this.$store.dispatch('get_headquarter/getInitRiskIndexData')
    this.$store.dispatch('get_headquarter/getInitRiskNumberRank')
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

.part1 {
  background-color: #1b1d32;
  padding-right: 10px;
  padding-left: 10px;
}

.part2 {
  background-color: #21253c;
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
  left: 0;
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
  margin-top: 100px;
}


</style>
