<template>
<div style="height: 100%">
    <div>{{ getData }}</div>
    <el-row style="height: 10%" class="boundary-A">
      <div class="absolute-layer" style="width: 544px; height: 56px; left: 0px; top: 0px;">
        <div class="title" style="width: 544px; height: 56px; font-size: 39px;">
          区域隐患大屏
        </div>
      </div>
    </el-row>
    <el-col :span="5" class="boundary-A" style="height: 90%">
      <el-row style="height: 40%" class="boundary-A">
        <DangerNumber></DangerNumber>
      </el-row>
      <el-row style="height: 30%" class="boundary-A"></el-row>
      <el-row style="height: 30%" class="boundary-A"></el-row>
    </el-col>
    <el-col :span="14" class="boundary-A" style="height: 90%">
      <el-row style="height: 75%" class="boundary-A">
        <HeadMap></HeadMap>
      </el-row>
      <el-row style="height: 25%" class="boundary-A"></el-row>
    </el-col>
    <el-col :span="5" class="boundary-A" style="height: 90%">
      <el-row style="height: 35%" class="boundary-A"></el-row>
      <el-row style="height: 35%" class="boundary-A"></el-row>
      <el-row style="height: 30%" class="boundary-A"></el-row>
    </el-col>
  </div>
</template>

<script>
import HeadMap from "@/components/views/BigScreen/HeadMap.vue";
import DangerNumber from "@/components/views/BigScreen/DangerNumber.vue";

export default {
name: "NewRegionScreen",
  components: {DangerNumber, HeadMap},
  computed: {
    getData() {

      let data = this.$store.state.get_screen.heads_risk_num
      console.log(data)


      data = this.$store.state.get_screen.heads_risk_num_rank
      console.log(data)


      data = this.$store.state.get_screen.heads_major_num
      console.log(data)
    }
  },
  mounted() {
    $(document).ready(function () {
      var whei = $(window).width()
      $("html").css({fontSize: whei / 24});
      $(window).resize(function () {
        var whei = $(window).width();
        $("html").css({fontSize: whei / 24})
      });
    });
  },
  created() {
    let param = new URLSearchParams();
    // param.append('region_name', this.$store.state.get_login.grant_data.data.region_tag);
    param.append('region_name', '华北区域');
    this.$store.commit('get_screen/changeParams', {params: param})
    this.$store.dispatch('get_screen/getRegionScreenRiskNumber')
    this.$store.dispatch('get_screen/getRegionScreenRNRank')
    this.$store.dispatch('get_screen/getRegionScreenMajorNumber')
    this.$store.dispatch('get_screen/getRegionScreenCNRank')
    this.$store.dispatch('get_screen/getRegionScreenMajorStageInfo')
    this.$store.dispatch('get_screen/getRegionScreenAreaNumber')
    this.$store.dispatch('get_screen/getRegionScreenTable')
  }
}
</script>

<style scoped>

</style>