<template>
  <!--  项目层级EHS数据大屏-->
<!--  <el-container>-->
<!--    <el-header>-->
<!--      <el-row>-->
<!--        <el-col :span="6">-->
<!--          <div id="title" class="grid-content bg-purple-dark level1"-->
<!--               style="text-align: left; padding-top: 20px; padding-bottom: 20px">-->
<!--            <span>{{ prj_name }}EHS数据大屏</span>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <Granularity></Granularity>-->
<!--        &lt;!&ndash;        <li @click="goBack" class="level4">< 返回</li>&ndash;&gt;-->
<!--        &lt;!&ndash;          <router-link :to="{path:'/'}" class="level4" />&ndash;&gt;-->
<!--        &lt;!&ndash;        <el-page-header @click="goBack" class="level4">&ndash;&gt;-->
<!--        &lt;!&ndash;        </el-page-header>&ndash;&gt;-->
<!--        &lt;!&ndash;        <el-button plain size="mini" icon="el-icon-arrow-left" @click="goBack">上一页</el-button>&ndash;&gt;-->
<!--      </el-row>-->
<!--    </el-header>-->
<!--    <el-main>-->
<!--      <el-row class="boundary" type="flex">-->
<!--        <el-col class="boundary-B margin" :span="8">-->
<!--          &lt;!&ndash; 指数部分&ndash;&gt;-->
<!--          &lt;!&ndash;          <el-card shadow="never" style="background-color: transparent; height: 400px">&ndash;&gt;-->
<!--          <el-card shadow="never"-->
<!--                   style="background-color: transparent; height: 400px; box-shadow: rgb(119, 186, 230) 0px 0px 10px 3px inset; background-size: 100% 100%; background-repeat: no-repeat; background-position: center center;background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAABdJREFUGBlj5DcIn8mABzDhkQNLDQ8FAD33AT8cpehwAAAAAElFTkSuQmCC');">-->
<!--            <el-row class="margin">-->
<!--              <el-col :span="24">-->
<!--                <div class="safety_index" style="height: 100px">-->
<!--                  <div-->
<!--                      style="color: rgb(126, 210, 250);font-family: ‘Microsoft YaHei’;font-weight: bold;font-style: normal;line-height: normal;float: left;font-size: 28.38px;margin-left: 150px;margin-top: 20px">-->
<!--                    <span style="display: block">项目危险指数</span>-->
<!--                    <span class="level10">81.50{{ safety_index }}</span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row class="margin">-->
<!--              <el-col :span="6">-->
<!--                <IndexView :context="{title:'消防指数'}"></IndexView>-->
<!--              </el-col>-->
<!--              <el-col :span="6">-->
<!--                <IndexView :context="{title:'电梯指数'}"></IndexView>-->
<!--              </el-col>-->
<!--              <el-col :span="6">-->
<!--                <IndexView :context="{title:'燃气指数'}"></IndexView>-->
<!--              </el-col>-->
<!--              <el-col :span="6">-->
<!--                <IndexView :context="{title:'电梯指数'}"></IndexView>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </el-card>-->
<!--        </el-col>-->

<!--        <el-col class="boundary-B part1 margin" :span="4">-->
<!--          <el-card shadow="never" style="background-color: transparent; height: 400px">-->
<!--            &lt;!&ndash;当前整改率&ndash;&gt;-->
<!--            <PrjCurrentCorrectionRate></PrjCurrentCorrectionRate>-->
<!--          </el-card>-->

<!--        </el-col>-->
<!--        <el-col class="boundary-B part1 margin" :span="6">-->
<!--          &lt;!&ndash;历次检查累计发现隐患数量&ndash;&gt;-->
<!--          <el-card shadow="never" style="background-color: transparent; height: 400px">-->
<!--            <CheckedProject></CheckedProject>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--        <el-col class="boundary-B part2 margin" :span="6">-->
<!--          &lt;!&ndash;历次检查隐患数量变化&ndash;&gt;-->
<!--          <el-card shadow="never" style="background-color: transparent; height: 400px">-->
<!--            <CheckedHistory></CheckedHistory>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--      </el-row>-->

<!--      <el-row class="boundary" type="flex">-->
<!--        <el-col class="boundary-C part2 margin" :span="6">-->
<!--          &lt;!&ndash;          最近一次检查隐患专业占比&ndash;&gt;-->
<!--          <el-card shadow="never" style="background-color: transparent; height: 450px">-->
<!--            <LastCheckPerc></LastCheckPerc>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--        <el-col class="boundary-C part2 margin" :span="6">-->
<!--          &lt;!&ndash;          历次检查累计隐患专业占比&ndash;&gt;-->
<!--          <el-card shadow="never" style="background-color: transparent; height: 450px">-->
<!--            <CheckHistoryPerc></CheckHistoryPerc>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--        <el-col class="boundary-C part2 margin" :span="6">-->
<!--          &lt;!&ndash;          当前未整改高风险隐患列表&ndash;&gt;-->
<!--          <el-card shadow="never" style="background-color: transparent; height: 450px">-->
<!--            <UnsolvedList></UnsolvedList>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--        <el-col class="boundary-C margin" :span="6">-->
<!--          &lt;!&ndash;          当前未整改高风险隐患图片&ndash;&gt;-->
<!--          <el-card shadow="never" style="background-color: transparent; height: 450px">-->
<!--            <UnsolvedImageList></UnsolvedImageList>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      &lt;!&ndash;占比&ndash;&gt;-->
<!--      <div style="display: none">-->
<!--        {{ getData }}-->
<!--      </div>-->
<!--      <el-row class="boundary level4" type="flex">-->
<!--        <el-col :span="4" class="boundary-C part2 margin">-->
<!--          <el-card shadow="never" style="background-color: transparent; height: 470px">-->
<!--            <PerctangePerc :context="{title:'所有隐患子系统占比（可筛选专业）', type:'system'}"></PerctangePerc>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--        <el-col :span="4" class="boundary-C part2 margin">-->
<!--          <el-card shadow="never" style="background-color: transparent; height: 470px">-->
<!--            <PerctangePerc :context="{title:'所有致因阶段占比（可筛选专业）', type:'reason'}"></PerctangePerc>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--        <el-col :span="4" class="boundary-C part2 margin">-->
<!--          <el-card shadow="never" style="background-color: transparent; height: 470px">-->
<!--            <PerctangePerc :context="{title:'所有隐患分布区域占比（可筛选专业）', type:'region'}"></PerctangePerc>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--        &lt;!&ndash;历次重复出现隐患前五名&ndash;&gt;-->
<!--        <el-col :span="12" class="boundary-B part2 margin">-->
<!--          <el-card shadow="never" style="background-color: transparent; height: 470px">-->
<!--            <HistoryTopRisk class="boundary-B"></HistoryTopRisk>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--      </el-row>-->

<!--    </el-main>-->
<!--  </el-container>-->
  <PrjOverview></PrjOverview>
<!--<PrjDataScreen></PrjDataScreen>-->

</template>

<script>

import Granularity from "@/components/views/Project/Granularity.vue";

import PrjCurrentCorrectionRate from "@/components/views/Project/PrjCurrentCorrectionRate.vue";
import IndexView from "@/components/views/HeadQuarters/IndexView.vue";
import CheckedProject from "@/components/views/Project/CheckedProject.vue";
import CheckedHistory from "@/components/views/Project/CheckedHistory.vue";

import LastCheckPerc from "@/components/views/Project/LastCheckPerc.vue";
import CheckHistoryPerc from "@/components/views/Project/CheckHistoryPerc.vue";
import UnsolvedList from "@/components/views/Project/UnsolvedList.vue";
import UnsolvedImageList from "@/components/views/Project/UnsolvedImageList.vue";

import HistoryTopRisk from "@/components/views/Project/HistoryTopRisk.vue";
import PerctangePerc from "@/components/views/Project/PerctangePerc.vue";

import PrjOverview from '@/components/views/Project/PrjOverview.vue'
import PrjDataScreen from "@/components/views/Project/PrjDataScreen.vue";

export default {
  name: "PrjEHSDataAnalysis",
  components: {
    Granularity,
    HistoryTopRisk,
    PerctangePerc,
    LastCheckPerc,
    CheckHistoryPerc,
    UnsolvedList,
    UnsolvedImageList,
    CheckedHistory,
    CheckedProject,
    IndexView,
    PrjCurrentCorrectionRate,
    // PrjEHSDataAnalysis3,
    PrjOverview,
    PrjDataScreen,

  },
  data() {
    return {
      prj_name: '',
      safety_index: '',
      elevator_index: ''
    }
  },
  computed: {
    //得到累计隐患数量
    getNumberChange() {
      let data = this.$store.state.get_project.prj_number_change;
      // console.log(data)
    },
    getData() {
      let data;
      let arr = [];
      data = this.$store.state.get_project.prj_system
      for (let i in data) {
          for (let j in data[i]) {
            let obj = {
              name: '',
              count: 0
            }
            obj.name = j;
            obj.count = data[i][j];
            arr.push(obj)
          }
      }
      this.system_data = arr;
      // console.log("system_data", arr)

      arr = [];
      data = this.$store.state.get_project.prj_reason
        let obj1 = {
          name: '(空白)',
          count: 0
        }
        let obj2 = {
          name: '施工',
          count: 0
        }
        let obj3 = {
          name: '运营',
          count: 0
        }
        for (let i in data) {
          for (let j in data[i]) {
            if (j == '施工') {
              obj2.count += data[i][j];
            } else if (j == '运营') {
              obj3.count += data[i][j];
            } else {
              obj1.count += data[i][j]
            }
          }
        }
        arr.push(obj1)
        arr.push(obj2)
        arr.push(obj3)
      this.reason_data = arr;
      // console.log("reason_data", arr)


      let data1;
      let arr1 = [];
      data1 = this.$store.state.get_project.prj_region
        obj1 = {
          name: '(空白)',
          count: 0
        }
        obj2 = {
          name: '公共区域',
          count: 0
        }
        obj3 = {
          name: '租户区域',
          count: 0
        }
        for (let i in data1) {
          for (let j in data1[i]) {
            if (j == '公共区域') {
              obj2.count += data1[i][j];
            } else if (j == '租户区域') {
              obj3.count += data1[i][j];
            } else {
              obj1.count += data1[i][j]
            }
          }
        }
        arr1.push(obj1)
        arr1.push(obj2)
        arr1.push(obj3)
      this.region_data = arr1;
      // console.log("region_data", arr1)
      // return arr;
    }
  },
  methods: {
    goBack() {
      this.$router.push({path: '/'});
    }
  },
  mounted() {
    window.onresize = () => {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('id_system'));
      myChart.resize();
      myChart = this.$echarts.init(document.getElementById('id_reason'));
      myChart.resize();
      myChart = this.$echarts.init(document.getElementById('id_region'));
      myChart.resize();
      myChart = this.$echarts.init(document.getElementById('history_chart'));
      myChart.resize();
      myChart = this.$echarts.init(document.getElementById('pie'));
      myChart.resize();
      myChart = this.$echarts.init(document.getElementById('pie2'));
      myChart.resize();
    };
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false
  },
  created() {alert(1)
    let param = new URLSearchParams();
    param.append('project_name', this.$store.state.get_login.grant_data.data.project_tag);
    this.$store.state.get_project.params = param

    this.$store.dispatch('get_project/getInitProjectRectification')
    this.$store.dispatch('get_project/getInitProjectRiskLevel')
    this.$store.dispatch('get_project/getInitProjectHistoryPerception')
    this.$store.dispatch('get_project/getInitProjectNumberChange')
    // // 当前未整改高风险隐患列表
    this.$store.dispatch('get_project/getInitPrjRisk')
    // // 当前未整改高风险隐患图片
    this.$store.dispatch('get_project/getInitProjectImage')
    //
    // //占比
    this.$store.dispatch('get_project/getInitProjectSystem')
    this.$store.dispatch('get_project/getInitProjectRegionDistribution')
    this.$store.dispatch('get_project/getInitProjectReason')

    //  历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
    this.$store.dispatch('get_project/getInitProjectRiskTop')
    //历次检查指数
    this.$store.dispatch('get_project/getInitProjectIndex')


    let param1 = new URLSearchParams();
    param1.append('check_code', 'ZRH(ZB)-2007-L01-A04-000-15');
    this.$store.state.get_check.params = param1
    this.$store.dispatch('get_check/getCheckRectification')
    this.$store.dispatch('get_check/getCheckRiskLevel')
    this.$store.dispatch('get_check/getCheckRiskRatio')
    this.$store.dispatch('get_check/getCheckHighRisk')
    this.$store.dispatch('get_check/getCheckHighImage')
    this.$store.dispatch('get_check/getCheckMajorSystem')
    this.$store.dispatch('get_check/getCheckMajorArea')
    this.$store.dispatch('get_check/getCheckMajorStage')
    this.$store.dispatch('get_check/getCheckRiskTop')
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

#title {
  text-align: left;
  font-size: 28px;
  font-weight: 700;
}

.safety_index {
  background-image: url('../components/svg/card-skin-2.svg');
  font-family: 'microsoft YaHei';
  height: 70px;
}

.level10 {
  font-size: 39px;
  font-family: Avenir;
  font-weight: normal;
  color: #ffffff;
  margin-left: 15px;
}

.part1 {
  /*background-color: #1b1d32;*/
  text-align: left;
  color: #ffffff;
  padding-left: 10px;
  padding-right: 10px;
}

.part2 {
  /*background-color: #242943;*/
  padding-left: 10px;
  padding-right: 10px;
}

.el-card {
  transition: all .5s;
}

.el-card:hover {
  /*  鼠标效果*/
}
</style>