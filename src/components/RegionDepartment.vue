<template>
  <!-- 商业地产事业部2020年巡检项目EHS大数据分析 -->
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="24">
          <div id="title" class="grid-content bg-purple-dark level1">
            <span>商业地产事业部2020年巡检项目EHS大数据分析</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
<!--      安全指数-->
      <el-row class="boundary">
        <el-col :span="6" class="boundary-B">
          <Region1_1></Region1_1>
        </el-col>
        <el-col :span="6" class="boundary-B">
          <div class="grid-content bg-purple">
<!--            各专业安全指数-->
            <el-row>
              <el-col :span="6">
                <ProjectIndexView :context="{title:'消防指数', val:28.93}"></ProjectIndexView>
              </el-col>
              <el-col :span="6">
                <ProjectIndexView :context="{title:'电梯指数', val:76.83}"></ProjectIndexView>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <ProjectIndexView :context="{title:'燃气指数', val:82.69}"></ProjectIndexView>
              </el-col>
              <el-col :span="6">
                <ProjectIndexView :context="{title:'电气指数', val:82.69}"></ProjectIndexView>
              </el-col>
            </el-row>
          </div>
        </el-col>
<!--        已检查的项目数量-->
        <el-col :span="6">
          <Region1_3 class="boundary-B"></Region1_3>
        </el-col>
<!--        各风险等级对应的隐患数量-->
        <el-col :span="6">
          <Region1_4 class="boundary-B"></Region1_4>
        </el-col>
      </el-row>

      <el-row style="margin-top: 10px" class="boundary">
<!--        项目当前未整改高风险隐患列表-->
        <el-col :span="6">
          <Region2_1></Region2_1>
        </el-col>
<!--        未整改高风险隐患图片-->
        <el-col :span="6">
          <Region2_2></Region2_2>
        </el-col>
<!--各项目累计发现的隐患在各专业的分布-->
        <el-col :span="12">
          <Region2_3></Region2_3>
        </el-col>
      </el-row>

      <el-row class="boundary">
<!--项目累计出现次数前10的隐患及其对应数量-->
        <el-col :span="12">
          <Region3_1></Region3_1>
        </el-col>
<!--项目安全指数排名-->
        <el-col :span="6">
          <Region3_2></Region3_2>
        </el-col>
<!--项目累计高风险数量排名-->
        <el-col :span="6">
          <Region3_3></Region3_3>
        </el-col>

      </el-row>
    </el-main>
  </el-container>
</template>

<script>


import SafetyIndexHistogram from "@/components/views/functions/SafetyIndexHistogram.vue";
import RegionNumberHistogram from "@/components/views/functions/RegionNumberHistogram.vue";
import checkbox from "@/components/views/functions/checkbox.vue";
import RiskDistribution from "@/components/views/functions/RiskDistribution.vue";
import Region1_1 from "@/components/views/Region/Region1_1.vue";
import ProjectIndexView from "@/components/views/Region/ProjectIndexView.vue";
import Region1_3 from "@/components/views/Region/Region1_3.vue";
import Region1_4 from "@/components/views/Region/Region1_4.vue";
import Region2_1 from "@/components/views/Region/Region2_1.vue";
import Region2_2 from "@/components/views/Region/Region2_2.vue";
import Region2_3 from "@/components/views/Region/Region2_3.vue";
import Region3_1 from "@/components/views/Region/Region3_1.vue";
import Region3_2 from "@/components/views/Region/Region3_2.vue";
import Region3_3 from "@/components/views/Region/Region3_3.vue";



export default {
  name: "RegionDepartment",
  components: {
    Region3_3,
    Region3_2,
    Region3_1,
    Region2_3,
    Region2_2,
    Region2_1,
    Region1_4,
    ProjectIndexView, Region1_1, RiskDistribution, SafetyIndexHistogram, RegionNumberHistogram,
    Region1_3, checkbox
  },
  // data() {
  //   return {
  //     riskLevelData: [],
  //     // riskLevelData: {
  //     //   risk: " ",
  //     //   num: " "
  //     // },
  //
  //
  //     images: '',
  //     timer: ''
  //
  //   }
  // },

  computed: {
    //得到已检查项目数量


    //得到各等级风险对应的隐患数量


    //得到未整改高风险隐患列表


    //得到未整改高风险隐患图片


    //得到排名前十的隐患描述


  },

  methods: {
    // updateTable() {
    //   let first = this.noRectificationNumber[0];
    //   this.noRectificationNumber.shift();
    //   this.noRectificationNumber.push(first);
    // },
  },

  created() {
    this.$store.dispatch('get_region/getInitRegionProjectNumber')
    this.$store.dispatch('get_region/getInitRegionRiskLevel')
    this.$store.dispatch('get_region/getInitRegionHighRisk')
    this.$store.dispatch('get_region/getInitRegionNumberTop')
    this.$store.dispatch('get_region/getInitRegionImage')
    this.$store.dispatch('get_region/getInitRegionSafetyIndex')
    this.$store.dispatch('get_region/getInitRegionRiskRank')
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/ibdex.css");

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
  width: 25%;
  height: 100%;
  background-size: 100% 100%;
}

.chart-image-icon {
  background-image: url('../components/svg/card-skin-1.svg');
  font-family: 'microsoft YaHei';
}


</style>