<template>
  <!--  项目层级EHS数据大屏-->
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="24">
          <div id="title" class="grid-content bg-purple-dark" style="text-align: left">
            <span>{{ prj_name }}EHS数据大屏</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row class="boundary margin">
        <!--            历次粒度-->
        <Granularity></Granularity>
      </el-row>
      <el-row class="boundary" type="flex">
        <el-col class="boundary-B margin" :span="8">
          <!-- 指数部分-->
          <el-row class="margin">
            <el-col :span="24">
              <div class="safety_index" style="height: 100px">
                <div
                    style="color: rgb(126, 210, 250);font-family: ‘Microsoft YaHei’;font-weight: bold;font-style: normal;line-height: normal;float: left;font-size: 28.38px;margin-left: 150px;margin-top: 20px">
                  <span>项目危险指数</span>
                  <span class="level10">81.50{{ safety_index }}</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row class="margin">
            <el-col :span="6">
              <IndexView :context="{title:'消防指数'}"></IndexView>
            </el-col>
            <el-col :span="6">
              <IndexView :context="{title:'电梯指数'}"></IndexView>
            </el-col>
            <el-col :span="6">
              <IndexView :context="{title:'燃气指数'}"></IndexView>
            </el-col>
            <el-col :span="6">
              <IndexView :context="{title:'电梯指数'}"></IndexView>
            </el-col>
          </el-row>
        </el-col>

        <el-col class="boundary-B part1 margin" :span="4">
          <!--当前整改率-->
          <PrjCurrentCorrectionRate></PrjCurrentCorrectionRate>
        </el-col>
        <el-col class="boundary-B part1 margin" :span="6">
          <!--历次检查累计发现隐患数量-->
          <CheckedProject></CheckedProject>
        </el-col>
        <el-col class="boundary-B part2 margin" :span="6">
          <!--历次检查隐患数量变化-->
          <CheckedHistory></CheckedHistory>
        </el-col>
      </el-row>

      <el-row class="boundary" type="flex">
        <el-col class="boundary-C part2 margin" :span="6">
          <!--          最近一次检查隐患专业占比-->
          <LastCheckPerc></LastCheckPerc>
        </el-col>
        <el-col class="boundary-C part2 margin" :span="6">
          <!--          历次检查累计隐患专业占比-->
          <CheckHistoryPerc></CheckHistoryPerc>
        </el-col>
        <el-col class="boundary-C part2 margin" :span="6">
          <!--          当前未整改高风险隐患列表-->
          <UnsolvedList></UnsolvedList>
        </el-col>
        <el-col class="boundary-C margin" :span="6">
          <!--          当前未整改高风险隐患图片-->
          <UnsolvedImageList></UnsolvedImageList>
        </el-col>
      </el-row>
      <!--占比-->
      <el-row class="boundary level4" type="flex">
        <el-col :span="4" class="part2 margin">
          <PerctangePerc :context="{title:'所有隐患子系统占比（可筛选专业）', type:'system'}"></PerctangePerc>
        </el-col>
        <el-col :span="4" class="part2 margin">
          <PerctangePerc :context="{title:'所有致因阶段占比（可筛选专业）', type:'reason'}"></PerctangePerc>
        </el-col>
        <el-col :span="4" class="part2 margin">
          <PerctangePerc :context="{title:'所有隐患分布区域占比（可筛选专业）', type:'region'}"></PerctangePerc>
        </el-col>
        <!--历次重复出现隐患前五名-->
        <el-col :span="12" class="boundary-B part2 margin">
          <HistoryTopRisk class="boundary-B"></HistoryTopRisk>
        </el-col>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>

import Granularity from "@/components/views/Project/Granularity.vue";

import PrjCurrentCorrectionRate from "@/components/views/Project/PrjCurrentCorrectionRate.vue";
import IndexView from "@/components/views/HeadQuarters/IndexView.vue";
import CheckedProject from "@/components/views/Project/CheckedProject.vue";
import CheckedHistory from "@/components/views/Project/CheckedHistory.vue";

import LastCheckPerc from "@/components/views/Project/LastCheckPerc.vue";
import CheckHistoryPerc from "@/components/views/Project/CheckHistoryPerc.vue";
import UnsolvedList from "@/components/views/Project/UnsolvedList.vue";
import UnsolvedImageList from "@/components/views/Project/UnsolvedImageList.vue";

import HistoryTopRisk from "@/components/views/Project/HistoryTopRisk.vue";
import PerctangePerc from "@/components/views/Project/PerctangePerc.vue";

export default {
  name: "PrjEHSDataAnalysis",
  components: {
    Granularity,
    HistoryTopRisk,
    PerctangePerc,
    LastCheckPerc,
    CheckHistoryPerc,
    UnsolvedList,
    UnsolvedImageList,
    CheckedHistory,
    CheckedProject,
    IndexView,
    PrjCurrentCorrectionRate,
    // PrjEHSDataAnalysis3,

  },
  data() {
    return {
      prj_name: '',
      safety_index: '',
      elevator_index: '',
    }
  },
  computed: {
    //得到累计隐患数量
    getNumberChange() {
      let data = this.$store.state.get_project.prj_number_change;
      console.log(this.$store.state.get_project.prj_number_change)
      console.log(data)
    }
  },
  created() {
    // this.$store.dispatch('get_project/getInitProjectNumberChange')
    // 当前未整改高风险隐患列表
    this.$store.dispatch('get_project/getInitPrjRisk')
    // 当前未整改高风险隐患图片
    this.$store.dispatch('get_project/getInitProjectImage')

    //占比
    this.$store.dispatch('get_project/getInitProjectSystem')
    this.$store.dispatch('get_project/getInitProjectRegionDistribution')
    this.$store.dispatch('get_project/getInitProjectReason')

    //  历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
    // this.$store.dispatch('get_project/getInitProjectRiskTop')
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

.safety_index {
  background-image: url('../components/svg/card-skin-2.svg');
  font-family: 'microsoft YaHei';
  height: 70px;
}

.level10 {
  font-size: 39px;
  font-family: Avenir;
  font-weight: normal;
  color: #ffffff;
  margin-left: 15px;
}

.part1 {
  background-color: #1b1d32;
  text-align: left;
  color: #ffffff;
  padding-left: 10px;
  padding-right: 10px;
}

.part2 {
  background-color: #242943;
  padding-left: 10px;
  padding-right: 10px;
}
</style>