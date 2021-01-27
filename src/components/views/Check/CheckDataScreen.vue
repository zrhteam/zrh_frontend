<template>
  <el-col :span="16" style="height: 100%">
    <el-card class="title-box-card " shadow="never"
             style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px; top: 1%">
<!--      <label style="color: #c4bcbc; font-family:宋体; height: 95% ">数据大屏</label>-->
      <label class="check_title1" style="color: #c4bcbc; font-family:宋体; font-size: 1em; height: 80% ">{{ title1 }}</label>
      <label class="check_title2" style="color: #c4bcbc; font-family:宋体; font-size: 1em; height: 80% ">{{ title2 }}</label>
      <label class="check_title3" style="color: #c4bcbc; font-family:宋体; font-size: 0.5em; height: 40% ">{{ title3 }}</label>
    </el-card>
    <el-col :span="8" style="height: 83%">
      <!--本次检查累计发现隐患数量-->
<!--      <div style="display: none">-->
<!--      {{getOption}}-->
<!--    </div>-->
      <CheckRiskLevel></CheckRiskLevel>
      <PerctangePerc
          :context="{
        title:'所有致因阶段占比（可筛选专业）',
        type:'reason',
        id:'id_check_reason',
        option:this.reason_option}"></PerctangePerc>
    </el-col>
    <el-col :span="8" style="height: 83%">
      <!--          当前未整改高风险隐患图片-->
      <CheckHighImage></CheckHighImage>
      <PerctangePerc
          :context="{
        title:'所有隐患分布区域占比（可筛选专业）',
        type:'region',
        id:'id_check_region',
        option:this.region_option}"></PerctangePerc>
    </el-col>
    <el-col :span="8" style="height: 83%">
      <PerctangePerc
          :context="{
        title:'所有隐患子系统占比（可筛选专业）',
        type:'system',
        id:'id_check_system',
        option:this.system_option}"></PerctangePerc>
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
import PerctangePerc from "@/components/views/Project/PerctangePerc.vue";
import CheckHighImage from "@/components/views/Check/CheckHighImage.vue";
import CheckRiskTop from "@/components/views/Check/CheckRiskTop.vue";

export default {
  name: "CheckDataScreen",
  components: {CheckRiskTop, CheckHighImage, PerctangePerc, CheckRiskLevel},
  data() {
    return {
      title1: this.$store.state.get_login.grant_data.data.headquarter_tag,
      title2: this.$store.state.get_login.grant_data.data.region_tag,
      title3: this.$store.state.get_login.grant_data.data.project_tag,
      reason_option: [],
      region_option: [],
      system_option: []
    }
  },
  methods: {
    getOption() {
      let data = this.$store.state.get_check.check_reason
      let count = 0
      let filter = []
      this.reason_option = []
      for (let i in data) {
        if (filter.indexOf(i) === -1) {
          filter.push(i)
          let obj = {
            value: '',
            label: ''
          }
          obj['value'] = count++;
          obj['label'] = i
          this.reason_option.push(obj)
        }
      }

      data = this.$store.state.get_check.check_region
      count = 0
      filter = []
      this.region_option = []
      for (let i in data) {
        if (filter.indexOf(i) === -1) {
          filter.push(i)
          let obj = {
            value: '',
            label: ''
          }
          obj['value'] = count++;
          obj['label'] = i
          this.region_option.push(obj)
        }
      }

      data = this.$store.state.get_check.check_system
      count = 0
      filter = []
      this.system_option = []
      for (let i in data) {
        if (filter.indexOf(i) === -1) {
          filter.push(i)
          let obj = {
            value: '',
            label: ''
          }
          obj['value'] = count++;
          obj['label'] = i
          this.system_option.push(obj)
        }
      }
    }
  },created() {
    this.getOption()
  }
}
</script>

<style scoped>

</style>