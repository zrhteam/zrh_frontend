<template>
  <el-col :span="19" style="height: 100%">
    <el-card class="box-card " shadow="never"
             style="background-color: transparent; height: 98%; margin: 0px 2px 2px 2px">
      <el-col :span="12" style="height: 100%">
        <el-row style="height: 30%">
          <!--            第一列-->
          <el-col :span="11" style="height: 100%; margin-left: 4.5%">
            <CheckRiskRatio></CheckRiskRatio>
          </el-col>
          <!--            第2列-->
          <el-col :span="11" style="height: 100%;width:46%">
            <PerctangePerc
                :context="{
              title:'不同致因阶段隐患数量',
              type:'reason',
              id:'id_check_reason',
            }"></PerctangePerc>
          </el-col>
        </el-row>
        <el-row style="height: 30%">
          <el-col :span="22" style="height: 100%; margin-left: 2%; margin-bottom: 2%; width: 100%">
            <RiskLevelYear :context="{title:'项目风险等级隐患数量(按年份)', id:'check_level_year'}"></RiskLevelYear>
          </el-col>
        </el-row>
        <el-row style="height: 30%">
          <el-col :span="22" style="height: 100%; margin-left: 4%; width: 100%">
            <div style="display: none">
              {{ getName }}
            </div>
            <TopName
            :context="{title:'最容易出现隐患的系统',
            top_data:this.sys_name,
            label1:'系统名称',
            label2:'出现频率',
        }"></TopName>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" style="height: 100%">
        <el-row style="height: 30%">
          <!--            第3列-->
          <el-col :span="11" style="height: 100%; width:46%">
            <PerctangePerc
                :context="{
                  title:'不同分布区域隐患数量',
                  type:'region',
                  id:'id_check_region',
                 }"></PerctangePerc>
          </el-col>

          <!--            第4列-->
          <el-col :span="11" style="height: 100%;width:46.5%">
            <PerctangePerc
                :context="{
                  title:'不同子系统隐患数量',
                  type:'system',
                  id:'id_check_system',
                }"></PerctangePerc>
          </el-col>
        </el-row>
        <el-row style="height: 30%; margin-bottom: 2%">
          <el-col style="height: 100%">
            <CheckRiskLevel :context="{title:'隐患数量', id:'check_risk_level'}"></CheckRiskLevel>
          </el-col>
        </el-row>
        <el-row style="height: 30%">
          <el-col style="height: 100%">
            <TopRisk
            :context="{
                  title:'重复出现隐患',
                  label1:'隐患描述',
                  label2:'出现频率',
                  sign:'check_other',
                  option:this.other_option}"
            :top_data="this.$store.state.get_check.check_other_top"
        ></TopRisk>
          </el-col>
        </el-row>
      </el-col>
    </el-card>
  </el-col>
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

export default {
  name: "CheckOverview",
  components: {
    TopRisk,
    CheckRiskLevel, TopName, RiskLevelYear, CheckRectification, CheckHighRisk, CheckRiskRatio, PerctangePerc},
  data(){
    return {
      sys_name: [],
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
    }
  },
  computed: {
    getName() {
      let data = this.$store.state.get_check.check_sys_name
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.sys_name.push(obj)
      }
    }
  }
}
</script>

<style scoped>

</style>