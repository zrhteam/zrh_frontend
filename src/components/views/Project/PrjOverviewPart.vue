<template>
  <el-col :span="10" id="prj_subpart" style="height: 100%">
    <!--      <el-card class="boundary-B" shadow="never" style="background-color: transparent; height: 100%">-->
    <el-row style="height: 100%">
      <el-card class="statistics-box-card " shadow="never"
               style="background-color: transparent; height: 5%; margin: 0px 5px 5px 5px">
<!--        <label>chart</label>-->
      </el-card>
      <!--          <el-row style="height: 42%">-->
      <el-col :span="12" style="height: 42%">
        <CheckHistoryPerc></CheckHistoryPerc>
      </el-col>
      <el-col :span="12" style="height: 42%">
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 80%; left: 10%; top: 10%">
          <!--          当前未整改高风险隐患列表-->
          <UnsolvedList></UnsolvedList>
        </el-card>
      </el-col>
      <!--          </el-row>-->
      <!--          <el-row style="height: 42%">-->
      <el-col :span="12" style="height: 42%">
      </el-col>
      <el-col :span="12" style="height: 42%">
        <CheckedHistory></CheckedHistory>
        <!--历次检查隐患数量变化-->
      </el-col>
      <!--          </el-row>-->
      <el-col :span="24" style="height: 9%">
        <el-card class="statistics-box-card" shadow="never"
                 style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px">
          <el-button size="mini" round
                       style="z-index: 9; right: 12%; background-color: transparent; color: #fff; position: absolute">more</el-button>
        </el-card>
      </el-col>
    </el-row>
    <!--      </el-card>-->
  </el-col>
</template>

<script>
import CheckedHistory from "@/components/views/Project/CheckedHistory.vue";
import CheckHistoryPerc from "@/components/views/Project/CheckHistoryPerc.vue";
import UnsolvedList from "@/components/views/Project/UnsolvedList.vue";

export default {
  name: "PrjOverviewPart",
  components: {
    CheckHistoryPerc,
    CheckedHistory,
    UnsolvedList,

  },
}
</script>

<style scoped>

</style>