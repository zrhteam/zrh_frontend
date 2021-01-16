<template>
  <el-col :span="16" style="height: 100%">
    <el-card class="title-box-card " shadow="never"
             style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px; top: 1%">
      <label style="color: #c4bcbc; font-family:宋体; height: 95% ">数据大屏</label>
    </el-card>
    <el-col :span="8" style="height: 83%">
      <!--本次检查累计发现隐患数量-->
      <CheckRiskLevel></CheckRiskLevel>
      <CheckPertangePerc :context="{title:'所有致因阶段占比（可筛选专业）', type:'reason'}"> </CheckPertangePerc>
    </el-col>
    <el-col :span="8" style="height: 83%">
      <!--          当前未整改高风险隐患图片-->
      <CheckHighImage></CheckHighImage>
      <CheckPertangePerc :context="{title:'所有隐患分布区域占比（可筛选专业）', type:'region'}"></CheckPertangePerc>
    </el-col>
    <el-col :span="8" style="height: 83%">
      <CheckPertangePerc :context="{title:'所有隐患子系统占比（可筛选专业）', type:'system'}"></CheckPertangePerc>
      <!--        <HistoryTopRisk class=""></HistoryTopRisk>-->
      <CheckRiskTop></CheckRiskTop>
    </el-col>
    <el-card class="box-card " shadow="never"
             style="background-color: transparent; height: 6%; margin: 0px 5px 5px 5px">
      <label>...</label>
    </el-card>
  </el-col>
</template>

<script>
import CheckRiskLevel from "@/components/views/Check/CheckRiskLevel.vue";
import CheckPertangePerc from "@/components/views/Check/CheckPertangePerc.vue";
import CheckHighImage from "@/components/views/Check/CheckHighImage.vue";
import CheckRiskTop from "@/components/views/Check/CheckRiskTop.vue";

export default {
  name: "CheckDataScreen",
  components: {CheckRiskTop, CheckHighImage, CheckPertangePerc, CheckRiskLevel}
}
</script>

<style scoped>

</style>