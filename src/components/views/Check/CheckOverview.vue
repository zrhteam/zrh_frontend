<template>
  <el-col :span="10" class="" style="height: 100%">
    <!--      <el-card class="boundary-B" shadow="never" style="background-color: transparent; height: 100%">-->
    <el-row style="height: 100%">
      <el-card class="statistics-box-card " shadow="never"
               style="background-color: transparent; height: 5%; margin: 0px 5px 5px 5px">
        <label>chart</label>
      </el-card>
      <!--          <el-row style="height: 42%">-->
      <el-col :span="12" style="height: 42%">
        <CheckRiskRatio></CheckRiskRatio>
      </el-col>
      <el-col :span="12" style="height: 42%">
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 80%; left: 10%; top: 10%">
          <!--          当前未整改高风险隐患列表-->
<!--          <UnsolvedList></UnsolvedList>-->
        </el-card>
      </el-col>
      <!--          </el-row>-->
      <!--          <el-row style="height: 42%">-->
      <el-col :span="12" style="height: 42%">
        <!--当前整改率-->
<!--        <PrjCurrentCorrectionRate></PrjCurrentCorrectionRate>-->
      </el-col>
      <el-col :span="12" style="height: 42%">
<!--        <CheckedHistory></CheckedHistory>-->
        <!--历次检查隐患数量变化-->
      </el-col>
      <!--          </el-row>-->
      <el-col :span="24" style="height: 9%">
        <el-card class="statistics-box-card" shadow="never"
                 style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px">
          <label>more</label>
        </el-card>
      </el-col>
    </el-row>
    <!--      </el-card>-->
  </el-col>
</template>

<script>
import CheckRiskRatio from "@/components/views/Check/CheckRiskRatio.vue";
export default {
  name: "CheckOverview",
  components: {CheckRiskRatio}
}
</script>

<style scoped>

</style>