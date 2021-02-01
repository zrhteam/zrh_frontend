<template>
  <el-col id="check_charts" :span="20" style="height: 100%;">
    <el-row style="height: 10%;">
      <el-col :span="4" style="height: 100%">
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px">
          <el-image
              style="width: 90%; height: 90%"
              :src="url"
              :fit="fit"></el-image>
        </el-card>
      </el-col>
      <el-col :span="18" style="height: 100%;">
        <el-card class="title-box-card " shadow="never"
                 style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px; top: 1%">
          <!--      <label style="color: #c4bcbc; font-family:宋体; height: 95% ">数据大屏</label>-->
          <label class="check_title1"
                 style="color: #c4bcbc; font-family:宋体; font-size: 1em; height: 80% ">{{ title1 }}</label>
          <label class="check_title2"
                 style="color: #c4bcbc; font-family:宋体; font-size: 1em; height: 80% ">{{ title2 }}</label>
          <label class="check_title3"
                 style="color: #c4bcbc; font-family:宋体; font-size: 0.5em; height: 40% ">{{ title3 }}</label>
        </el-card>
      </el-col>
      <el-col :span="2" style="height: 100%;">
        <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px;">
          <el-button size="mini" round
                     style="background-color: transparent; color: #ffffff"
                     @click="outPrjDataScreen">返回
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="height: 85%;">
      <el-col :span="12" style="height: 100%; margin-left: 6%">
        <el-row style="height: 32%; margin-bottom: 1%">
          <TopRisk
              :context="{
          title:'历史重复出现隐患排名（8）',
          label1:'隐患描述',
          label2:'出现频率',
          sign:'check_risk',
          option:this.risk_option}"
              :top_data="this.$store.state.get_check.check_risk_top"
          ></TopRisk>
        </el-row>
        <el-row style="height: 32%; margin-bottom: 1%">
         <Rules
            :context="{title:'违反法规次数排名（10）',
            top_data:this.rule_name,
            label1:'违反次数',
            label2:'法规名称',
            label3:'条款号',
        }"></Rules>
        </el-row>
        <el-row style="height: 32%; margin-bottom: 1%">
          <Rules
              :context="{title:'违反法规次数排名（prj14）',
            top_data:this.rule_name,
            label1:'违反次数',
            label2:'法规名称',
            label3:'条款号',
        }"></Rules>
        </el-row>
      </el-col>
      <el-col :span="10" style="height: 100%;">
         <div style="display: none">
          {{ getName }}
        </div>
        <el-row style="height: 32%; margin-bottom: 1%">
          <TopName
              :context="{title:'隐患次数累计设备名称排名（12）', top_data:this.device_name, label1:'设备名称', label2:'出现频率'}"></TopName>
        </el-row>
        <el-row style="height: 32%; margin-bottom: 1%">
          <TopName
              :context="{title:'隐患次数累计组件名称排名（13）', top_data:this.unit_name, label1:'组件名称', label2:'出现频率'}"></TopName>
        </el-row>
        <el-row style="height: 32%; margin-bottom: 1%">
          <CheckHighImage></CheckHighImage>
        </el-row>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import CheckRiskLevel from "@/components/views/Check/CheckRiskLevel.vue";
import PerctangePerc from "@/components/views/Project/PerctangePerc.vue";
import CheckHighImage from "@/components/views/Check/CheckHighImage.vue";
import CheckRiskTop from "@/components/views/Check/CheckRiskTop.vue";
import TopRisk from "@/components/views/functions/TopRisk.vue";
import TopName from "@/components/views/functions/TopName.vue";
import Rules from "@/components/views/functions/Rules.vue";

export default {
  name: "CheckDataScreen",
  components: {Rules, TopName, TopRisk, CheckRiskTop, CheckHighImage, PerctangePerc, CheckRiskLevel},
  data() {
    return {
      title1: this.$store.state.get_login.grant_data.data.headquarter_tag,
      title2: this.$store.state.get_login.grant_data.data.region_tag,
      title3: this.$store.state.get_login.grant_data.data.project_tag,
      fit: 'fill',
      url: 'http://www.zhongrh.com/Upfiles/Base/2020111937459.png',
      risk_option: [{
        value: '专业',
        key: 'major'
      }, {
        value: '系统',
        key: 'system'
      }, {
        value: '设备',
        key: 'equipment'
      }, {
        value: '组件',
        key: 'module'
      }],
      sys_name: [],
      device_name: [],
      unit_name: [],
      rule_name: [],
    }
  },
  methods: {
    outPrjDataScreen() {
      var large1 = document.getElementById('large1');
      large1.style.display = 'block'
      large1.style.width = "500px"
      large1.style.width = "99%"
      var large2 = document.getElementById('large2');
      large2.style.display = 'block'
      large2.style.width = "500px"
      large2.style.width = "99%"
      var prj_small = document.getElementById('prj_small');
      prj_small.style.display = 'none'
      // document.getElementById('prj_charts').style.width = "500px"
      // document.getElementById('prj_charts').style.width = "99%"
      // document.getElementById('check_charts').style.width = "500px"
      // document.getElementById('check_charts').style.width = "99%"
    },
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

      data = this.$store.state.get_check.check_device_name
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.device_name.push(obj)
      }

      data = this.$store.state.get_check.check_unit_name
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.unit_name.push(obj)
      }

      data = this.$store.state.get_check.check_rule
      for (let i in data) {
        let obj = {
          appear_time: 0,
          rule_name: '',
          clause: '',
          clause_contact: ''
        }
        obj['appear_time'] = data[i].appear_time
        obj['rule_name'] = i
        obj['clause'] = data[i].clause
        obj['clause_contact'] = data[i].clause_contact
        this.rule_name.push(obj)
      }

    }
  },
}
</script>

<style scoped>

</style>