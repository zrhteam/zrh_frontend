<template>
  <el-container>
    <el-header>
      <div>
        <span>当前整改率</span>
      </div>
      <div id="current_correction_rate">
        <span>{{current_correction_rate}}</span>
      </div>
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</template>

<script>
export default {
  name: "PrjCurrentCorrectionRate",
  data() {
    return {
    }
  },
  computed: {
    current_correction_rate (){
      return this.$store.state.get_project.prj_rectification;
    }
  },
  created() {
    this.$store.dispatch('get_project/getInitProjectRectification')
  }
}
</script>

<style scoped>
</style>