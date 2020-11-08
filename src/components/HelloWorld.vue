<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <OverviewLeftSide></OverviewLeftSide>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>overview</span>
      </el-header>

      <el-main>

      </el-main>
    </el-container>
    <OverviewRightSide></OverviewRightSide>

  </el-container>
</template>

<script>
import OverviewRightSide from "../components/OverviewRightSide.vue";
import OverviewLeftSide from "../components/OverviewLeftSide.vue";
export default {
  components: {OverviewLeftSide, OverviewRightSide},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: left;
}
</style>
