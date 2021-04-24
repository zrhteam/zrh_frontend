<template>
  <el-row style="height: 100%">
    <el-row class="el-row" :gutter="10" type="flex" style="height: 32%; margin-top: 0.6rem; padding-left: 0.3rem">
      <div style="display: none">
        {{ getName }}
      </div>
      <el-col :span="6" class="">
        <RiskLevelYear :context="{title:'隐患总量', id:'check_level_year'}"></RiskLevelYear>
      </el-col>
      <el-col :span="6" class="">
        <CheckRiskRatio></CheckRiskRatio>
      </el-col>
      <el-col :span="6" class="">
        <PerctangePerc
            :context="{
                  title:'不同分布区域隐患数量'+'-'+filter_major,
                  type:'region',
                  id:'id_check_region',
                 }"></PerctangePerc>
      </el-col>
      <el-col :span="6" class="">
        <CheckHighImage></CheckHighImage>
      </el-col>
    </el-row>
    <el-row class="el-row" :gutter="10" type="flex" style="height: 32%; margin-top: 0.1rem; padding-left: 0.3rem">
      <el-col :span="8" class="">
        <StackedHorizontalBar
            :context="{
              title:'不同致因阶段隐患数量',
              type:'reason',
              id:'id_check_reason',
            }"></StackedHorizontalBar>
      </el-col>
      <el-col :span="8" class="">
        <BarRank
            :context="{
              title:'不同子系统隐患数量'+'-'+filter_major,
              id: 'id_check_system'
          }"></BarRank>
      </el-col>
      <el-col :span="8" class="">
        <StackedHorizontalBar
            :context="{
              title:'不同风险等级隐患数量',
              id: 'id_check_risk'
          }"></StackedHorizontalBar>
      </el-col>
    </el-row>
    <el-row class="el-row" :gutter="10" type="flex" style="height: 32%; margin-top: 0.1rem; padding-left: 0.3rem">
      <el-col :span="10" class="">
        <TopRisk
            :context="{
          title:'重复出现隐患',
          label1:'隐患描述',
          label2:'出现频率',
          sign:'check_other'}"
            :top_data="this.$store.state.get_check.check_risk_top"
        ></TopRisk>
      </el-col>
      <el-col :span="7" class="">
        <TopName
            :context="{title:'最容易出现隐患的设备', top_data:this.device_name, label1:'设备名称', label2:'出现频率'}"></TopName>
      </el-col>
      <el-col :span="7" class="">
        <TopName
            :context="{title:'最容易出现隐患的组件', top_data:this.unit_name, label1:'组件名称', label2:'出现频率'}"></TopName>
      </el-col>
    </el-row>
  </el-row>
  <!--  <el-col :span="19" style="height: 100%">-->
  <!--    <el-col :span="12" style="height: 100%; flex-direction: row; overflow-x: scroll">-->
  <!--      <el-row style="height: 30%">-->
  <!--        <el-col :span="22" style="height: 100%; margin-left: 2%; margin-bottom: 2%; width: 100%">-->
  <!--&lt;!&ndash;          <RiskLevelYear :context="{title:'项目风险等级隐患数量(按年份)', id:'check_level_year'}"></RiskLevelYear>&ndash;&gt;-->
  <!--        </el-col>-->
  <!--      </el-row>-->
  <!--      <el-row style="height: 30%">-->
  <!--        <el-col :span="22" style="height: 100%; margin-left: 4%; width: 100%">-->

  <!--          <TopName-->
  <!--              :context="{title:'最容易出现隐患的系统',-->
  <!--            top_data:this.sys_name,-->
  <!--            label1:'系统名称',-->
  <!--            label2:'出现频率',-->
  <!--        }"></TopName>-->
  <!--        </el-col>-->
  <!--      </el-row>-->
  <!--    </el-col>-->
  <!--    <el-col :span="12" style="height: 100%">-->
  <!--      <el-row style="height: 30%; margin-bottom: 2%">-->
  <!--        <el-col style="height: 100%">-->
  <!--          <CheckRiskLevel :context="{title:'隐患数量', id:'check_risk_level'}"></CheckRiskLevel>-->
  <!--        </el-col>-->
  <!--      </el-row>-->
  <!--      <el-row style="height: 30%">-->
  <!--        <el-col style="height: 100%">-->
  <!--          <TopRisk-->
  <!--              :context="{-->
  <!--                  title:'重复出现隐患',-->
  <!--                  label1:'隐患描述',-->
  <!--                  label2:'出现频率',-->
  <!--                  sign:'check_other',-->
  <!--                  option:this.other_option}"-->
  <!--              :top_data="this.$store.state.get_check.check_other_top"-->
  <!--          ></TopRisk>-->
  <!--        </el-col>-->
  <!--      </el-row>-->
  <!--    </el-col>-->
  <!--  </el-col>-->
</template>

<script>
import CheckRiskRatio from "@/components/views/Check/CheckRiskRatio.vue";
import CheckHighRisk from "@/components/views/Check/CheckHighRisk.vue";
import CheckRectification from "@/components/views/Check/CheckRectification.vue";
import PerctangePerc from '@/components/views/Project/PerctangePerc.vue'
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
import TopName from "@/components/views/functions/TopName.vue";
import CheckRiskLevel from "@/components/views/Check/CheckRiskLevel.vue";
import TopRisk from "@/components/views/functions/TopRisk.vue";
import StackedHorizontalBar from "@/components/views/functions/StackedHorizontalBar.vue";
import BarRank from "@/components/views/functions/BarRank.vue";
import CheckHighImage from "@/components/views/Check/CheckHighImage.vue";

export default {
  name: "CheckOverview",
  components: {
    CheckHighImage,
    BarRank,
    StackedHorizontalBar,
    TopRisk,
    CheckRiskLevel, TopName, RiskLevelYear, CheckRectification, CheckHighRisk, CheckRiskRatio, PerctangePerc
  },
  data() {
    return {
      sys_name: [],
      device_name: [],
      unit_name: [],
      other_option: [{
        value: '高风险',
        key: 3
      }, {
        value: '中风险',
        key: 2
      }, {
        value: '低风险',
        key: 1
      }, {
        value: '风险',
        key: 'all'
      }, {
        value: '致因阶段',
        key: 'stage'
      }, {
        value: '分布区域',
        key: 'area'
      }],
      filter_major: ''
    }
  },
  computed: {
    getName() {
      let data = this.$store.state.get_check.check_sys_name
      this.sys_name = []
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.sys_name.push(obj)
      }

      data = this.$store.state.get_check.check_device_name
      this.device_name = []
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.device_name.push(obj)
      }
      console.log("log1", this.device_name)
      data = this.$store.state.get_check.check_unit_name
      this.unit_name = []
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.unit_name.push(obj)
      }

    }
  },
  updated() {
    this.filter_major = this.$store.state.get_check.filter_major
  },
}
</script>

<style scoped>

</style>