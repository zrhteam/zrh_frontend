<template>
  <el-row style="height: 100%;">
    <el-row style="height: 10%">
      <el-card class="title-box-card" shadow="never"
               style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px;">
        <!--        <label style="color: #c4bcbc; font-family:宋体; height: 95%">中瑞恒可视化系统</label>-->
        <h4>
            <span id="prj_title1_1"
                  style="color: #c4bcbc; font-family:Noto Sans SC; font-size: 0.4em; vertical-align: 65%; height: 100%">{{
                title1
              }}</span>
          <span id="prj_title2_1"
                style="color: #c4bcbc; font-family:Noto Sans SC; font-size: 0.4em; vertical-align: 65%; height: 100%">{{
              title2
            }}</span>
          <span id="prj_title3_1"
                style="color: #c4bcbc; font-family:Noto Sans SC; font-size: 0.4em; vertical-align: 65%; height: 100%">{{
              title3
            }}</span>
        </h4>
      </el-card>
    </el-row>
    <el-row id="prj_charts" style="height: 89%">
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
                     @click="outPrjDataScreen">返回
          </el-button>
        </el-col>
      </el-row>
      <div style="display: none">
        {{ getName }}
      </div>
                  <el-col :span="24" style="height: 70%;">
      <el-row v-if="isFirst" style="height: 80%; flex-direction: row; overflow-x: scroll">
        <el-col v-if="isFirst" style="height: 86%;">
<!--          <el-col :span="2" style="height: 100%; padding-top: 12%">-->
<!--            <el-button size="mini" circle icon="el-icon-arrow-left"-->
<!--                       style="background-color: transparent; color: #ffffff; float: left;"-->
<!--                       @click="preFirst">-->
<!--            </el-button>-->
<!--          </el-col>-->
<!--          <el-col :span="20" id="aa1" style="height: 100%;">-->
<!--            <el-col :span="12" style="height: 100%;">-->
<!--              <el-row style="height: 32%; margin-bottom: 1%">-->
<!--                &lt;!&ndash;            <BarRank&ndash;&gt;-->
<!--                &lt;!&ndash;                :context="{&ndash;&gt;-->
<!--                &lt;!&ndash;              title:'不同子系统隐患数量',&ndash;&gt;-->
<!--                &lt;!&ndash;              id: 'id_project_system'&ndash;&gt;-->
<!--                &lt;!&ndash;          }"></BarRank>&ndash;&gt;-->
<!--              </el-row>-->
<!--              <el-row style="height: 32%; margin-bottom: 1%">-->
<!--                <TopRisk-->
<!--                    :context="{-->
<!--                          title:'重复出现隐患列表',-->
<!--                          label1:'隐患描述',-->
<!--                          label2:'出现频率',-->
<!--                          sign:'prj_other'}"-->
<!--                    :top_data="this.$store.state.get_project.prj_other_top"-->
<!--                ></TopRisk>-->
<!--              </el-row>-->
<!--              <el-row style="height: 32%; margin-bottom: 1%">-->
<!--                <Rules-->
<!--                    :context="{title:'最容易违反的法规标准',-->
<!--            top_data:this.prj_rule_name,-->
<!--            label1:'违反次数',-->
<!--            label2:'法规名称',-->
<!--            label3:'条款号',-->
<!--        }"></Rules>-->
<!--              </el-row>-->
<!--            </el-col>-->
<!--            <el-col :span="12" style="height: 100%;">-->
<!--              <el-row style="height: 32%; margin-bottom: 1%">-->
<!--                <el-col :span="11" style="height: 100%;margin-left:1%">-->
<!--                  <TopName-->
<!--                      :context="{title:'最容易出现隐患的设备',-->
<!--            top_data:this.prj_device_name,-->
<!--            label1:'设备名称',-->
<!--            label2:'出现频率',-->
<!--        }"></TopName>-->
<!--                </el-col>-->
<!--                <el-col :span="11" style="height: 100%;margin-left:6%">-->
<!--                  <TopName-->
<!--                      :context="{title:'最容易出现隐患的组件',-->
<!--            top_data:this.prj_unit_name,-->
<!--            label1:'组件名称',-->
<!--            label2:'出现频率',-->
<!--        }"></TopName>-->
<!--                </el-col>-->
<!--              </el-row>-->
<!--              <el-row style="height: 32%; margin-bottom: 1%">-->
<!--                &lt;!&ndash;            <StackedHorizontalBar&ndash;&gt;-->
<!--                &lt;!&ndash;                :context="{&ndash;&gt;-->
<!--                &lt;!&ndash;              title:'不同致因阶段隐患数量',&ndash;&gt;-->
<!--                &lt;!&ndash;              type:'reason',&ndash;&gt;-->
<!--                &lt;!&ndash;              id:'id_project_reason',&ndash;&gt;-->
<!--                &lt;!&ndash;            }"></StackedHorizontalBar>&ndash;&gt;-->
<!--              </el-row>-->
<!--              <el-row style="height: 32%; margin-bottom: 1%">-->
<!--                <el-col :span="11" style="height: 100%;margin-left:1%">-->
<!--                  &lt;!&ndash;            不同专业隐患数量&ndash;&gt;-->
<!--                  &lt;!&ndash;              <CheckHistoryPerc></CheckHistoryPerc>&ndash;&gt;-->
<!--                </el-col>-->
<!--                <el-col :span="11" style="height: 100%;margin-left:6%">-->
<!--                  <UnsolvedImageList></UnsolvedImageList>-->
<!--                </el-col>-->
<!--              </el-row>-->
<!--              <el-row style="height: 32%; margin-bottom: 1%">-->
<!--                <el-col :span="11" style="height: 100%;margin-left:1%">-->
<!--                  &lt;!&ndash;            不同专业隐患数量&ndash;&gt;-->
<!--                  &lt;!&ndash;              <PerctangePerc&ndash;&gt;-->
<!--                  &lt;!&ndash;                  :context="{&ndash;&gt;-->
<!--                  &lt;!&ndash;                  title:'不同分布区域隐患数量',&ndash;&gt;-->
<!--                  &lt;!&ndash;                  type:'region',&ndash;&gt;-->
<!--                  &lt;!&ndash;                  id:'id_region',&ndash;&gt;-->
<!--                  &lt;!&ndash;                 }"></PerctangePerc>&ndash;&gt;-->
<!--                </el-col>-->
<!--                <el-col :span="11" style="height: 100%;margin-left:6%">-->
<!--                  &lt;!&ndash;              <StackedHorizontalBar&ndash;&gt;-->
<!--                  &lt;!&ndash;                  :context="{&ndash;&gt;-->
<!--                  &lt;!&ndash;              title:'不同风险等级隐患数量',&ndash;&gt;-->
<!--                  &lt;!&ndash;              id: 'id_project_risk'&ndash;&gt;-->
<!--                  &lt;!&ndash;          }"></StackedHorizontalBar>&ndash;&gt;-->
<!--                </el-col>-->
<!--              </el-row>-->
            </el-col>
      </el-row>
      <el-row v-if="isSecond" style="height: 88%;">
<!--        <el-col :span="24" style="height: 100%; flex-direction: row; overflow-x: scroll">-->
<!--          <el-col :span="24" class="level4" style="min-height: 30px" v-if="isShow">-->
<!--            &lt;!&ndash;        <div class="level4" style="; padding-left: 10px">&ndash;&gt;-->
<!--            <el-popover-->
<!--                placement="top-start"-->
<!--                title="粒度"-->
<!--                width="400"-->
<!--                trigger="hover">-->
<!--              <span style="color: #ffffff">{{ level }}</span>-->
<!--              <el-button slot="reference" size="mini" round style="background-color: transparent; color: #ffffff">粒度-->
<!--              </el-button>-->
<!--            </el-popover>-->
<!--            <el-popover-->
<!--                placement="top-start"-->
<!--                title="object1"-->
<!--                width="400"-->
<!--                trigger="hover">-->
<!--              <span style="color: #ffffff">{{ obj1 }}</span>-->
<!--              <el-button slot="reference" size="mini" round style="background-color: transparent; color: #ffffff">-->
<!--                object1-->
<!--              </el-button>-->
<!--            </el-popover>-->
<!--            <el-popover-->
<!--                placement="top-start"-->
<!--                title="object2"-->
<!--                width="400"-->
<!--                trigger="hover"-->
<!--                style="color: #ffffff">-->
<!--              <span style="color: #ffffff">{{ obj2 }}</span>-->
<!--              <el-button slot="reference" size="mini" round style="background-color: transparent; color: #ffffff">-->
<!--                object2-->
<!--              </el-button>-->
<!--            </el-popover>-->

<!--            &lt;!&ndash;        </div>&ndash;&gt;-->
<!--          </el-col>-->
<!--          <el-col :span="8" style="height: 25%">-->
<!--            <DoughnutChart-->
<!--                v-if="isShows[0]"-->
<!--                :context="{-->
<!--                    title:this.titles[0],-->
<!--                    id:'id_by_check',-->
<!--                    level: this.level,-->
<!--                    flag: 'grant'}"-->
<!--            ></DoughnutChart>-->
<!--          </el-col>-->
<!--          <el-col :span="8" style="height: 25%">-->
<!--            <DoughnutChart-->
<!--                v-if="isShows[1]"-->
<!--                :context="{-->
<!--                    title:this.titles[1],-->
<!--                    id:'id_by_prj',-->
<!--                    level: this.level,-->
<!--                    flag: 'grant'}"-->
<!--            ></DoughnutChart>-->
<!--          </el-col>-->
<!--          <el-col :span="8" style="height: 25%">-->
<!--            <RiskLevelYear-->
<!--                v-if="isShows[2]"-->
<!--                :context="{-->
<!--                    title:this.titles[2],-->
<!--                    id:'id_risk_level',-->
<!--                    level: this.level,-->
<!--                    flag: 'grant'}"></RiskLevelYear>-->
<!--          </el-col>-->
<!--          <el-col :span="8" style="height: 50%">-->
<!--            <TopCompare-->
<!--                v-if="isShows[3]"-->
<!--                :context="{-->
<!--                    title:this.titles[3],-->
<!--                    id1:'id_area_o1',-->
<!--                    id2:'id_area_o2',-->
<!--                    level: this.level,-->
<!--                    flag: 'grant'}"-->
<!--            ></TopCompare>-->
<!--          </el-col>-->
<!--          <el-col :span="8" style="height: 50%">-->
<!--            <TopCompare-->
<!--                v-if="isShows[4]"-->
<!--                :context="{-->
<!--                    title:this.titles[4],-->
<!--                    id1:'id_stage_o1',-->
<!--                    id2:'id_stage_o2',-->
<!--                    level: this.level,-->
<!--                    flag: 'grant'}"-->
<!--            ></TopCompare>-->
<!--          </el-col>-->
<!--          <el-col :span="8" style="height: 50%">-->
<!--            <TopCompare-->
<!--                v-if="isShows[5]"-->
<!--                :context="{-->
<!--                    title:this.titles[5],-->
<!--                    id1:'id_risk_o1',-->
<!--                    id2:'id_risk_o2',-->
<!--                    level: this.level,-->
<!--                    flag: 'grant'}"-->
<!--            ></TopCompare>-->
<!--          </el-col>-->
<!--          <el-col :span="8" style="height: 50%">-->
<!--            <TopCompare-->
<!--                v-if="isShows[6]"-->
<!--                :context="{-->
<!--                    title:this.titles[6],-->
<!--                    id1:'id_module_top1',-->
<!--                    id2:'id_module_top2',-->
<!--                    level: this.level,-->
<!--                    flag: 'grant'}"-->
<!--            ></TopCompare>-->
<!--          </el-col>-->
<!--          <el-col :span="8" style="height: 50%">-->
<!--            <TopCompare-->
<!--                v-if="isShows[7]"-->
<!--                :context="{-->
<!--                    title:this.titles[7],-->
<!--                    id1:'id_equip_top1',-->
<!--                    id2:'id_equip_top2',-->
<!--                    level: this.level,-->
<!--                    flag: 'grant'}"-->
<!--            ></TopCompare>-->
<!--          </el-col>-->
<!--          <el-col :span="8" style="height: 50%">-->
<!--            <TopCompare-->
<!--                v-if="isShows[8]"-->
<!--                :context="{-->
<!--                    title:this.titles[8],-->
<!--                    id1:'id_system_top1',-->
<!--                    id2:'id_system_top2',-->
<!--                    level: this.level,-->
<!--                    flag: 'grant'}"-->
<!--            ></TopCompare>-->
<!--          </el-col>-->
<!--          <el-col :span="24" style="height: 50%">-->
<!--            <DrillDown-->
<!--                v-if="isShows[9]"-->
<!--                :context="{-->
<!--                    title:this.titles[9],-->
<!--                    id1:'id_major_o1',-->
<!--                    id2:'id_major_o2',-->
<!--                    level: this.level,-->
<!--                    flag: 'grant'}"-->
<!--            ></DrillDown>-->
<!--          </el-col>-->
<!--        </el-col>-->
      </el-row>
      </el-col>
    </el-row>
    <div id="check_charts" style="display: none"></div>
  </el-row>
</template>

<script>
// import PerctangePerc from "@/components/views/Project/PerctangePerc.vue";
// import CheckHistoryPerc from "@/components/views/Project/CheckHistoryPerc.vue";
// import UnsolvedImageList from "@/components/views/Project/UnsolvedImageList.vue";
// import PrjIndex from "@/components/views/Project/PrjIndex.vue";
// import Tree from "@/components/views/functions/Tree.vue";
// import TopName from "@/components/views/functions/TopName.vue";
// import TopRisk from "@/components/views/functions/TopRisk.vue";
// import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
// import Rules from "@/components/views/functions/Rules.vue";
// import DoughnutChart from "@/components/views/functions/DoughnutChart.vue";
// import TopCompare from "@/components/views/functions/TopCompare.vue";
// import DrillDown from "@/components/views/functions/DrillDown.vue";
// import BarRank from "@/components/views/functions/BarRank.vue";
// import StackedHorizontalBar from "@/components/views/functions/StackedHorizontalBar.vue";

export default {
  name: "PrjDataScreen",
  components: {
    // StackedHorizontalBar,
    // BarRank,
    // Rules,
    // RiskLevelYear,
    // TopRisk,
    // TopName,
    // PerctangePerc,
    // CheckHistoryPerc,
    // UnsolvedImageList,
    // // PrjEHSDataAnalysis3,
    // PrjIndex,
    // Tree,
    // DoughnutChart,
    // TopCompare,
    // DrillDown
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }, //对于总部
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
        document.getElementById('prj_small').style.display = 'block'
      }, 100);
      clearTimeout(timer)
    },
    // preFirst() {
    //   for(let i=0; i<this.firstArr.length; i++) {
    //     if(this.firstArr[i] == true) {
    //       this.firstArr[i] = false
    //       this.firstArr[(i + this.firstArr.length - 1) % this.firstArr.length] = true
    //       break
    //     }
    //   }
    // },
    // nextFirst() {
    //   for(let i=0; i<this.firstArr.length; i++) {
    //     if(this.firstArr[i] == true) {
    //       this.firstArr[i] = false
    //       this.firstArr[(i + 1) % this.firstArr.length] = true
    //       break
    //     }
    //   }
    // }
  },
  data() {
    return {
      filterText: '',
      data: [],
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      fit: 'fill',
      url: 'http://www.zhongrh.com/Upfiles/Base/2020111937459.png',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeObj: {},
      title1: this.$store.state.get_login.grant_data.data.headquarter_tag,
      title2: this.$store.state.get_login.grant_data.data.region_tag,
      title3: this.$store.state.get_login.grant_data.data.project_tag,
      sys_name: [],
      device_name: [],
      unit_name: [],
      rule_name: [],
      prj_sys_name: [],
      prj_device_name: [],
      prj_unit_name: [],
      prj_rule_name: [],
      activeName: 'first',
      isFirst: true,
      isSecond: false,
      level: '',
      obj1: '',
      obj2: '',
      titles: ['检查次数对比', "项目数量对比", '各风险等级隐患数量对比', '前top分布区域隐患数量对比', '前top致因阶段隐患数量对比', '前top隐患数量对比', '隐患数量前top组件对比', '隐患数量前top设备对比', '隐患数量前top系统对比', '前top专业隐患数量对比'],
      isShow: false,
      isShows: [false, false, false, false, false, false, false, false, false, false],
      firstArr: [true, false]
    };
  },
  computed: {
    getName() {
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
      data = this.$store.state.get_check.check_sys_name
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


      data = this.$store.state.get_project.prj_sys_name
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.prj_sys_name.push(obj)
      }

      data = this.$store.state.get_project.prj_device_name
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.prj_device_name.push(obj)
      }

      data = this.$store.state.get_project.prj_unit_name
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i].appear_time
        this.prj_unit_name.push(obj)
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

      data = this.$store.state.get_project.prj_rule
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
        this.prj_rule_name.push(obj)
      }
    }
  },
  created() {
    //得到树形控件的内容
    this.treeObj = this.$store.state.get_login.grant_data.data.value
  }
}
</script>

<style scoped>
.filter-tree {
  max-width: 500px;
  max-height: 2000px;
  overflow: scroll;
  background-color: transparent;
}

.el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}

.span-ellipsis {
  font-size: 0.1em;
  text-align: left;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
</style>