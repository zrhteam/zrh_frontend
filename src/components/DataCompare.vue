<template>
  <el-row style="height: 100%">
    <el-col :span="8" style="height: 100%">
      <el-row style="height: 15%">
        <!--        <div class="grid-content bg-purple">-->
        <el-col :span="6" style="height: 100%">
          <label style="font-size: 0.2em; vertical-align: middle; display: inline-block">请先选择粒度</label>
        </el-col>
        <el-col :span="12" style="height: 100%">
          <el-radio-group v-model="radio" @change="ClickRadio">
            <el-radio v-model="radio" label="1">总部</el-radio>
            <el-radio v-model="radio" label="2">区域</el-radio>
            <el-radio v-model="radio" label="3">项目</el-radio>
            <el-radio v-model="radio" label="4">检查</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="6" style="height: 100%">
          <el-button size="mini" round
                     style="z-index: 9; right: 10%; top: 33%; background-color: transparent; color: #ffffff; position: absolute"
                     @click="submit">提交
          </el-button>
        </el-col>
        <!--        </div>-->
      </el-row>
      <el-row style="height: 85%">
        <el-col :span="12" style="height: 100%">
          <el-row style="height: 100%">
            <Tree
                :treeObj="treeObj"
                :show-checkbox="true"
                @handleNodeClick="handleTrNodeClick"
                @handleCheck="handleTrCheck1"
                style="height: 100%"></Tree>
          </el-row>
        </el-col>
        <el-col :span="12" style="height: 100%">
          <el-row style="height: 100%">
            <Tree
                ref="tree2"
                :treeObj="treeObj"
                :show-checkbox="true"
                @handleNodeClick="handleTrNodeClick"
                @handleCheck="handleTrCheck2"
                style="height: 100%"></Tree>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="16" style="height: 100%; flex-direction: row; overflow-x: scroll">
      <el-col :span="24" class="level4" style="height: 15%; vertical-align: middle; padding-top: %" v-if="isShow">
        <!--        <div class="level4" style="; padding-left: 10px">-->
        <p>object1:{{ this.obj1 }}</p>
        <p>object2:{{ this.obj2 }}</p>
        <!--        </div>-->
      </el-col>
      <el-col :span="8" style="height: 25%">
        <DoughnutChart
            v-if="isShow"
            :context="{
                    title:'检查次数对比',
                    id:'id_by_check'}"
        ></DoughnutChart>
      </el-col>
      <el-col :span="8" style="height: 25%">
        <DoughnutChart
            v-if="isShow"
            :context="{
                    title:'项目数量对比',
                    id:'id_by_prj'}"
        ></DoughnutChart>
      </el-col>
      <el-col :span="8" style="height: 25%">
        <RiskLevelYear
            v-if="isShow"
            :context="{
                    title:'各风险等级隐患数量对比',
                    id:'id_risk_level'}"></RiskLevelYear>
      </el-col>
      <el-col :span="8" style="height: 50%">
        <TopCompare
            v-if="isShow"
            :context="{
                    title:'前top分布区域隐患数量对比',
                    id1:'id_area_o1',
                    id2:'id_area_o2'}"
        ></TopCompare>
      </el-col>
      <el-col :span="8" style="height: 50%">
        <TopCompare
            v-if="isShow"
            :context="{
                    title:'前top致因阶段隐患数量对比',
                    id1:'id_stage_o1',
                    id2:'id_stage_o2'}"
        ></TopCompare>
      </el-col>
      <el-col :span="8" style="height: 50%">
        <TopCompare
            v-if="isShow"
            :context="{
                    title:'前top隐患数量对比',
                    id1:'id_risk_o1',
                    id2:'id_risk_o2'}"
        ></TopCompare>
      </el-col>
      <el-col :span="8" style="height: 50%">
        <TopCompare
            v-if="isShow"
            :context="{
                    title:'隐患数量前top组件对比',
                    id1:'id_module_top1',
                    id2:'id_module_top2'}"
        ></TopCompare>
      </el-col>
      <el-col :span="8" style="height: 50%">
        <TopCompare
            v-if="isShow"
            :context="{
                    title:'隐患数量前top设备对比',
                    id1:'id_equip_top1',
                    id2:'id_equip_top2'}"
        ></TopCompare>
      </el-col>
      <el-col :span="8" style="height: 50%">
        <TopCompare
            v-if="isShow"
            :context="{
                    title:'隐患数量前top系统对比',
                    id1:'id_system_top1',
                    id2:'id_system_top2'}"
        ></TopCompare>
      </el-col>
      <el-col :span="24" style="height: 25%">
        <DrillDown
            v-if="isShow"
            :context="{
                    title:'前top专业隐患数量对比',
                    id1:'id_major_o1',
                    id2:'id_major_o2'}"
        ></DrillDown>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import Tree from "@/components/views/functions/Tree.vue";
import DoughnutChart from "@/components/views/functions/DoughnutChart.vue";
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
import TopCompare from "@/components/views/functions/TopCompare.vue";
import DrillDown from "@/components/views/functions/DrillDown.vue";

export default {
  name: "DataCompare",
  components: {DrillDown, TopCompare, RiskLevelYear, DoughnutChart, Tree},
  data() {
    return {
      treeObj: this.$store.state.get_login.grant_data.data.value,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      radio: '3',
      obj1: this.$store.state.get_comparison.object1,
      obj2: this.$store.state.get_comparison.object2,
      isShow: false
    }
  },
  methods: {
    ClickRadio(radio) {
      this.radio = radio
    },
    handleTrNodeClick(data, node) {
    },
    handleTrCheck1(a, b, level) {
      if (level > this.radio) {
        this.$message.error('您当前选择的层级与粒度不对应！');
      } else {
        this.obj1 = ''
        for (let i in b.checkedNodes) {
          if (b.checkedNodes[i].level === parseInt(this.radio)) {
            this.obj1 = this.obj1 + b.checkedNodes[i].label + ','
          }
        }
      }
    },
    handleTrCheck2(c, d, level) {
      if (level > this.radio) {
        this.$message.error('您当前选择的层级与粒度不对应！');
      } else {
        console.log('c', c)
        console.log('d', d)
        this.obj2 = ''
        for (let i in d.checkedNodes) {
          if (d.checkedNodes[i].level === parseInt(this.radio)) {
            this.obj2 = this.obj2 + d.checkedNodes[i].label + ','
          }
        }
      }
    },
    submit() {
      let level = '';
      if (this.radio === '1') {
        level = 'headquarter'
      } else if (this.radio === '2') {
        level = 'region'
      } else if (this.radio === '3') {
        level = 'project'
      } else if (this.radio === '4') {
        level = 'check'
      }
      if(this.obj1[this.obj1.length - 1] === ',') {
        this.obj1 = this.obj1.substr(0, this.obj1.length - 1)
      }
      if(this.obj2[this.obj2.length - 1] === ',') {
        this.obj2 = this.obj2.substr(0, this.obj2.length - 1)
      }
      let param = new URLSearchParams();
      param.append('level', level);
      param.append('object1', this.obj1);
      param.append('object2', this.obj2);
      this.$store.commit('get_comparison/changeParams', {params: param})
      this.$store.commit('get_comparison/changeObject1', {object1: this.obj1})
      this.$store.commit('get_comparison/changeObject2', {object2: this.obj2})
      this.$store.dispatch('get_comparison/getCheckNumber')
      this.$store.dispatch('get_comparison/getProjectNumber')
      this.$store.dispatch('get_comparison/getMajorRiskNumber')
      this.$store.dispatch('get_comparison/getRiskLevel')
      this.$store.dispatch('get_comparison/getAreaRisk')
      this.$store.dispatch('get_comparison/getStageRisk')
      this.$store.dispatch('get_comparison/getTopNumber')
      this.$store.dispatch('get_comparison/getLawTop')
      this.$store.dispatch('get_comparison/getUnitNumberTop')
      this.$store.dispatch('get_comparison/getDeviceNumberTop')
      this.$store.dispatch('get_comparison/getSystemNumberTop')
      this.$nextTick(() => {
        this.isShow = true
        // let data = this.$store.state.get_comparison.by_check

        // data = this.$store.state.get_comparison.by_prj
        // console.log('data2', data)
        // data = this.$store.state.get_comparison.by_major
        // console.log('data3', data)
        //
        //
        // // 两个对象之间各风险等级隐患数量的对比
        // data = this.$store.state.get_comparison.by_risk_level
        // console.log('data7', data)
        // // 两个对象之间不同分布区域隐患数量的对比
        // data = this.$store.state.get_comparison.by_area
        // console.log('data8', data)
        // // 两个对象之间不同致因阶段隐患数量的对比
        // data = this.$store.state.get_comparison.by_stage
        // console.log('data9', data)
        // // 两个对象之间出现次数前top的隐患的对比
        // data = this.$store.state.get_comparison.by_risk_top
        // console.log('data10', data)
        // // 两个对象之间违反次数最多的法规标准的对比
        // data = this.$store.state.get_comparison.by_law
        // console.log('data11', data)
        // // 两个对象之间出现隐患次数前top的组件的对比
        // data = this.$store.state.get_comparison.by_unit_top
        // console.log('data12', data)
        // // 两个对象之间出现隐患次数前top的设备的对比
        // data = this.$store.state.get_comparison.by_device_top
        // console.log('data13', data)
        // // 两个对象之间出现隐患次数前top的系统的对比
        // data = this.$store.state.get_comparison.by_sys_top
        // console.log('data14', data)
      })
    }
  },
  created() {
    //得到树形控件的内容 还负责封装了地理位置信息
    this.treeObj = this.$store.state.get_login.grant_data.data.value
  }
}
</script>

<style scoped>

</style>