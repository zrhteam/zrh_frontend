<template>
  <!--  项目层级EHS数据大屏-->
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="24">
          <div id="title" class="grid-content bg-purple-dark" style="text-align: left">
            <span>{{ prj_name }}EHS数据大屏</span></div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row class="boundary">
        <el-col class="boundary-B" :span="8">
          <!-- 安全指数部分-->
          <el-row>
            <el-col :span="24">
              <div class="safety_index" style="height: 100px">
                <div class="grid-content bg-purple-dark"
                     style="color: rgb(126, 210, 250);font-family: ‘Microsoft YaHei’;font-weight: bold;font-style: normal;line-height: normal;float: left;font-size: 28.38px;margin-left: 150px;margin-top: 30px">
                  <span>安全指数 {{ safety_index }}</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
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
        <el-col class="boundary-B" :span="4">
          <!--当前整改率-->
          <PrjCurrentCorrectionRate></PrjCurrentCorrectionRate>
        </el-col>
        <el-col class="boundary-B" :span="6">
          <!--历次检查累计发现隐患数量-->
          <CheckedProject></CheckedProject>
        </el-col>
        <el-col class="boundary-B" :span="6">
          <!--历次检查隐患数量变化-->
          <CheckedHistory></CheckedHistory>
        </el-col>
      </el-row>

      <el-row class="boundary" style="margin-top:10px">
        <el-col class="boundary-C" :span="6">
          <LastCheckPerc></LastCheckPerc>
        </el-col>
        <el-col class="boundary-C" :span="6">
          <CheckHistoryPerc></CheckHistoryPerc>
        </el-col>
        <el-col class="boundary-C" :span="6">
          <UnsolvedList></UnsolvedList>
        </el-col>
        <el-col class="boundary-C" :span="6">
          <UnsolvedImageList></UnsolvedImageList>
        </el-col>
      </el-row>

      <el-row class="boundary" style="margin-top:10px">
        <el-col :span="4">
          <PerctangePerc :context="{title:'所有隐患子系统占比（可筛选专业）'}"></PerctangePerc>
        </el-col>
        <el-col :span="4">
          <PerctangePerc :context="{title:'所有致因阶段占比（可筛选专业）'}"></PerctangePerc>
        </el-col>
        <el-col :span="4">
          <PerctangePerc :context="{title:'所有隐患分布区域占比（可筛选专业）'}"></PerctangePerc>
        </el-col>

        <el-col :span="12" class="boundary-B">
          <HistoryTopRisk class="boundary-B"></HistoryTopRisk>
        </el-col>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>


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
      debugger
      console.log(this.$store.state.get_project.prj_number_change)
      console.log(data)
    }
  },
  created() {
    // debugger
    this.$store.dispatch('get_project/getInitProjectRiskNumber')
    this.$store.dispatch('get_project/getInitProjectNumberChange')
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

.index {
  padding: 5px;
  background-color: #F7F7F7;
  width: 80%;
  height: 200px;
}

.index_box {
  padding-top: 50px;
}
</style>