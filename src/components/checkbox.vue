<template>
  <el-checkbox :indeterminate = "isIndeterminate" v-model = "checkAll" @change = "handleCheckALLChange">全选</el-checkbox>
  <div style = "margin: 15px 0;"></div>
  <el-checkbox-group v-model = "checkedRiskLevel" @change = "handleCheckedRiskLevelChange">
    <el-checkbox v-for = "risk in risk_levels" :label = "risk" :key = "risk">
      {{risk}}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
const riskOptions = ['高风险','中风险','低风险'];
export default {
  name: "checkbox",
  data() {
    return {
      checkAll: true,
      checkedRiskLevel: ['高风险','中风险','低风险'],
      risk_levels: riskOptions,
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckAllChange(val){
      this.checkedRiskLevel = val ? riskOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedRiskLevelChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.risk_levels.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.risk_levels.length;
    }
  }
};
</script>

<style scoped>

</style>