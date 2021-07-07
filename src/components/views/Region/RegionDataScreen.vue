<template>
  <el-row class="region_data_screen" style="height: 100%;">
    <el-row style="height: 10%">
      <el-card class="title-box-card " shadow="never"
               style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px; top: 1%">
        <h4>
          <span id="region_title1_1"
                style="color: #c4bcbc; font-family:'Microsoft YaHei'; font-size: 0.5em; vertical-align: 65%; height: 100%">{{
              title1
            }}</span>
          <span id="region_title2_1"
                style="color: #c4bcbc; font-family:'Microsoft YaHei'; font-size: 0.5em; vertical-align: 65%; height: 100%">{{
              title2
            }}</span>
        </h4>
      </el-card>
    </el-row>
    <el-row style="height: 100px;">
      <el-col :span="4" style="height: 100%">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="数据大屏" name="first" :key=" 'first' " lazy>
          </el-tab-pane>

          <el-tab-pane label="授权页面" name="second" :key=" 'second' " lazy>
          </el-tab-pane>

          <!--         <el-tab-pane label="授权页面" name="second" :key=" 'second' " lazy>-->
          <!--         </el-tab-pane>-->
        </el-tabs>
      </el-col>
      <el-col :span="20" style="height: 100%; padding-top: 3%">
        <el-button size="mini" round
                   style="background-color: transparent; color: #ffffff; float: right;"
                   @click="outRegionDataScreen">返回
        </el-button>
      </el-col>
    </el-row>
    <div style="display: none"> {{ getName }} </div>
    <!--    <el-row style="height: 4%;">-->
    <!--      <el-button size="mini" round-->
    <!--                   style="background-color: transparent; color: #ffffff; float: right"-->
    <!--                   @click="outRegionDataScreen">返回-->
    <!--        </el-button>-->
    <!--    </el-row>-->
    <!--    <el-col :span="20" style="height: 100%">-->
    <el-row v-if="isFirst" style="height: 80%">
      <el-col :span='12' style="height: 100%">
        <el-row style="height: 30%;">
          <BarRank
              :context="{
              title:'各项目检查次数',
              id: 'id_region_rank2'}"
          ></BarRank>
        </el-row>
        <el-row style="height: 30%; margin:2% 0% 0 0">
<!--          <BarRank-->
<!--              :context="{-->
<!--              title:'不同子系统隐患数量',-->
<!--              id: 'id_region_system'-->
<!--          }"></BarRank>-->
        </el-row>
        <el-row style="height: 30%;margin:3.2% 0% 0 0">
          <el-col :span="11" style="height: 100%;margin-left:1%">
<!--            <StackedHorizontalBar-->
<!--                :context="{-->
<!--                title:'不同致因阶段隐患数量',-->
<!--                id: 'id_region_reason'}"-->
<!--            ></StackedHorizontalBar>-->
          </el-col>
          <el-col :span="11" style="height: 100%;margin-left:6%">
<!--            <Ratio-->
<!--                :context="{-->
<!--                title:'不同分布区域隐患数量',-->
<!--                id: 'id_region_region'-->
<!--            }"></Ratio>-->
          </el-col>
        </el-row>
      </el-col>
      <el-col :span='12' style="height: 100%">
        <el-row style="height: 30%">
          <RiskLevelYear :context="{title:'年度隐患数量', id:'region_level_year'}"></RiskLevelYear>
        </el-row>
        <el-row style="height: 30%;margin:2% 0% 0 0">
          <el-col :span="11" style="height: 100%;margin-left:1%">
<!--            <Ratio-->
<!--              :context="{-->
<!--              title:'不同专业隐患数量',-->
<!--              id: 'id_region_major'-->
<!--          }"></Ratio>-->
          </el-col>
          <el-col :span="11" style="height: 100%;margin-left:6%">
<!--            <StackedHorizontalBar-->
<!--              :context="{-->
<!--              title:'不同风险等级隐患数量',-->
<!--              id: 'id_region_risk'-->
<!--          }"></StackedHorizontalBar>-->
          </el-col>
        </el-row>
        <el-row style="height: 30%;margin:2% 0% 0 0">
          <Region2_2></Region2_2>
        </el-row>
      </el-col>
    </el-row>
    <el-row v-if="isSecond" style="height: 80%;">
      <el-col :span="24" style="height: 100%; flex-direction: row; overflow-x: scroll">
        <el-col :span="24" class="level4" style="min-height: 30px" v-if="isShow">
          <!--        <div class="level4" style="; padding-left: 10px">-->
          <el-popover
              placement="top-start"
              title="粒度"
              width="400"
              trigger="hover">
            <span style="color: #ffffff">{{ level }}</span>
            <el-button slot="reference" size="mini" round style="background-color: transparent; color: #ffffff">粒度
            </el-button>
          </el-popover>
          <el-popover
              placement="top-start"
              title="object1"
              width="400"
              trigger="hover">
            <span style="color: #ffffff">{{ obj1 }}</span>
            <el-button slot="reference" size="mini" round style="background-color: transparent; color: #ffffff">object1
            </el-button>
          </el-popover>
          <el-popover
              placement="top-start"
              title="object2"
              width="400"
              trigger="hover"
              style="color: #ffffff">
            <span style="color: #ffffff">{{ obj2 }}</span>
            <el-button slot="reference" size="mini" round style="background-color: transparent; color: #ffffff">object2
            </el-button>
          </el-popover>

          <!--        </div>-->
        </el-col>
        <el-col :span="8" style="height: 25%">
          <DoughnutChart
              v-if="isShows[0]"
              :context="{
                    title:this.titles[0],
                    id:'id_by_check',
                    level: this.level,
                    flag: 'grant'}"
          ></DoughnutChart>
        </el-col>
        <el-col :span="8" style="height: 25%">
          <DoughnutChart
              v-if="isShows[1]"
              :context="{
                    title:this.titles[1],
                    id:'id_by_prj',
                    level: this.level,
                    flag: 'grant'}"
          ></DoughnutChart>
        </el-col>
        <el-col :span="8" style="height: 25%">
          <RiskLevelYear
              v-if="isShows[2]"
              :context="{
                    title:this.titles[2],
                    id:'id_risk_level',
                    level: this.level,
                    flag: 'grant'}"></RiskLevelYear>
        </el-col>
        <el-col :span="8" style="height: 50%">
          <TopCompare
              v-if="isShows[3]"
              :context="{
                    title:this.titles[3],
                    id1:'id_area_o1',
                    id2:'id_area_o2',
                    level: this.level,
                    flag: 'grant'}"
          ></TopCompare>
        </el-col>
        <el-col :span="8" style="height: 50%">
          <TopCompare
              v-if="isShows[4]"
              :context="{
                    title:this.titles[4],
                    id1:'id_stage_o1',
                    id2:'id_stage_o2',
                    level: this.level,
                    flag: 'grant'}"
          ></TopCompare>
        </el-col>
        <el-col :span="8" style="height: 50%">
          <TopCompare
              v-if="isShows[5]"
              :context="{
                    title:this.titles[5],
                    id1:'id_risk_o1',
                    id2:'id_risk_o2',
                    level: this.level,
                    flag: 'grant'}"
          ></TopCompare>
        </el-col>
        <el-col :span="8" style="height: 50%">
          <TopCompare
              v-if="isShows[6]"
              :context="{
                    title:this.titles[6],
                    id1:'id_module_top1',
                    id2:'id_module_top2',
                    level: this.level,
                    flag: 'grant'}"
          ></TopCompare>
        </el-col>
        <el-col :span="8" style="height: 50%">
          <TopCompare
              v-if="isShows[7]"
              :context="{
                    title:this.titles[7],
                    id1:'id_equip_top1',
                    id2:'id_equip_top2',
                    level: this.level,
                    flag: 'grant'}"
          ></TopCompare>
        </el-col>
        <el-col :span="8" style="height: 50%">
          <TopCompare
              v-if="isShows[8]"
              :context="{
                    title:this.titles[8],
                    id1:'id_system_top1',
                    id2:'id_system_top2',
                    level: this.level,
                    flag: 'grant'}"
          ></TopCompare>
        </el-col>
        <el-col :span="24" style="height: 50%">
          <DrillDown
              v-if="isShows[9]"
              :context="{
                    title:this.titles[9],
                    id1:'id_major_o1',
                    id2:'id_major_o2',
                    level: this.level,
                    flag: 'grant'}"
          ></DrillDown>
        </el-col>
      </el-col>
    </el-row>
    <!--    </el-col>-->
  </el-row>

</template>

<script>

import Region2_2 from "@/components/views/Region/Region2_2.vue";
import Region3_1 from "@/components/views/Region/Region3_1.vue";
import Tree from "@/components/views/functions/Tree.vue"
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
import TopRisk from "@/components/views/functions/TopRisk.vue";
import TopName from "@/components/views/functions/TopName.vue";
import Ratio from "@/components/views/functions/Ratio.vue";
import BarRank from "@/components/views/functions/BarRank.vue";
import DoughnutChart from "@/components/views/functions/DoughnutChart.vue";
import TopCompare from "@/components/views/functions/TopCompare.vue";
import DrillDown from "@/components/views/functions/DrillDown.vue";
import StackedHorizontalBar from "@/components/views/functions/StackedHorizontalBar.vue";

export default {
  name: "RegionDataScreen",
  components: {
    StackedHorizontalBar,
    BarRank,
    TopName,
    TopRisk,
    RiskLevelYear,
    Tree,
    Region3_1,
    Region2_2,
    Ratio,
    DoughnutChart,
    TopCompare,
    DrillDown
  },
  methods: {
    outRegionDataScreen() {
      // let large1 = document.getElementById('region_large1');
      // large1.style.display = 'block'
      // large1.style.width = "500px"
      // large1.style.width = "99%"
      // let large2 = document.getElementById('region_large2');
      // large2.style.display = 'block'
      // large2.style.width = "500px"
      // large2.style.width = "99%"
      // let prj_small = document.getElementById('region_small');
      // prj_small.style.display = 'none'
      this.$emit('outRegionDataScreen')
    },
    handleClick(tab, event) {
      // console.log(tab, event)
      if (tab.name === 'first') {
        this.isFirst = true
        this.isSecond = false
      } else if (tab.name === 'second') {
        this.isFirst = false
        this.isSecond = true
      }
      let timer = setTimeout(function () {
        document.getElementById('region_small').style.display = 'block'
      }, 100);
      clearTimeout(timer)
    },
    addScreen() {
      // let node2 = document.getElementById('test1')
      // node2.appendChild(node)
      // this.arr.push(this.num)
      // this.num = this.num + 1
      // node2.appendChild(node)
      // this.arr.push(this.num)
      // this.num = this.num + 1
      // this.in = (this.in + 1) % this.arr.length;
      // this.com = this.arr[this.in]
      this.arr.push(this.add_arr[this.add_in])
      this.add++
    },
    lastScreen() {

      this.in = (this.in + this.in - 1) % this.arr.length;
      this.com = this.arr[this.in]
      this.$nextTick(() => {
        document.getElementById('region_small').style.display = 'block'
      });
    },
    nextScreen() {
      this.in = (this.in + 1) % this.arr.length;
      this.com = this.arr[this.in]
      this.$nextTick(() => {
        document.getElementById('region_small').style.display = 'block'
      });
    }
  },
  computed: {
    getName() {
      // let data = this.$store.state.get_region.high_risk_rank
      // // console.log("检查", data)
      // for (let i in data) {
      //   let obj = {
      //     name: '',
      //     appear_time: 0
      //   }
      //   obj['name'] = i
      //   obj['appear_time'] = data[i].count
      //   this.high_risk_rank.push(obj)
      // }
      let data = this.$store.state.get_login.grant_info.data
      for (let i in data) {
        for (let j in this.titles) {
          if (data[i].title === this.titles[j]) {
            this.isShow = true
            this.isShows[j] = true
            this.level = data[i].level
            this.obj1 = data[i].object1
            this.obj2 = data[i].object2
            let param = new URLSearchParams();
            param.append('level', data[i].level);
            param.append('object1', data[i].object1);
            param.append('object2', data[i].object2);
            this.$store.commit('get_comparison/changeParams', {params: param})
            this.$store.commit('get_comparison/changeObject1', {object1: data[i].object1})
            this.$store.commit('get_comparison/changeObject2', {object2: data[i].object2})
          }
        }
      }
      if (this.isShows[0] == true) {
        this.$store.dispatch('get_comparison/getCheckNumber')
      }
      if (this.isShows[1] == true) {
        this.$store.dispatch('get_comparison/getProjectNumber')
      }
      if (this.isShows[2] == true) {
        this.$store.dispatch('get_comparison/getRiskLevel')
      }
      if (this.isShows[3] == true) {
        this.$store.dispatch('get_comparison/getAreaRisk')
      }
      if (this.isShows[4] == true) {
        this.$store.dispatch('get_comparison/getStageRisk')
      }
      if (this.isShows[5] == true) {
        this.$store.dispatch('get_comparison/getTopNumber')
      }
      if (this.isShows[6] == true) {
        this.$store.dispatch('get_comparison/getUnitNumberTop')
      }
      if (this.isShows[7] == true) {
        this.$store.dispatch('get_comparison/getDeviceNumberTop')
      }
      if (this.isShows[8] == true) {
        this.$store.dispatch('get_comparison/getSystemNumberTop')
      }
      if (this.isShows[9] == true) {
        this.$store.dispatch('get_comparison/getMajorRiskNumber')
      }
      data = this.$store.state.get_region.rank_by_check
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].count
        this.rank_by_check.push(obj)
      }
    }
  },
  data() {
    return {
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      fit: 'fill',
      url: 'http://www.zhongrh.com/Upfiles/Base/2020111937459.png',
      filterText: '',
      treeObj: {},
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      title1: this.$store.state.get_login.grant_data.data.headquarter_tag,
      title2: this.$store.state.get_login.grant_data.data.region_tag,
      in: 0,
      arr: ['Region2_2', 'Region3_1', 'Region2_2', 'Region3_1'],
      com: '',
      add_arr: ['Region2_2', 'Region3_1', 'Region2_2', 'Region3_1'],
      add_in: 0,
      risk_option: [{
        value: '专业',
        key: 'major'
      }, {
        value: '系统',
        key: 'system'
      }],
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
      high_risk_rank: [],
      rank_by_check: [],
      activeName: 'first',
      isFirst: true,
      isSecond: false,
      level: '',
      obj1: '',
      obj2: '',
      titles: ['检查次数对比', "项目数量对比", '各风险等级隐患数量对比', '前top分布区域隐患数量对比', '前top致因阶段隐患数量对比', '前top隐患数量对比', '隐患数量前top组件对比', '隐患数量前top设备对比', '隐患数量前top系统对比', '前top专业隐患数量对比'],
      isShow: false,
      isShows: [false, false, false, false, false, false, false, false, false, false]
    };
  },
  created() {
    //得到树形控件的内容
    this.treeObj = this.$store.state.get_login.grant_data.data.value
  }
}
</script>

<style scoped>

</style>
