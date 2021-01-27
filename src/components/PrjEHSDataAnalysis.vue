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
  <!--  -->

</template>

<script>
import PrjOverview from '@/components/views/Project/PrjOverview.vue'
import PrjDataScreen from "@/components/views/Project/PrjDataScreen.vue";

export default {
  name: "PrjEHSDataAnalysis",
  components: {
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
    // 得到累计隐患数量
    getNumberChange() {
      let data = this.$store.state.get_project.prj_number_change;
      // console.log(data)
    },
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
  created() {
    let param = new URLSearchParams();
    param.append('project_name', this.$store.state.get_login.grant_data.data.project_tag);
    this.$store.commit('get_project/changeParams', {params: param})
    //项目名称也需要封装
    this.$store.commit('get_project/changePrjName', {prj_name: this.$store.state.get_login.grant_data.data.project_tag})
    // this.$store.commit('get_login/changeParams',{params: params})
    // this.$store.state.get_project.params = param

    // // this.$store.dispatch('get_project/getInitProjectRectification')
    // this.$store.dispatch('get_project/getInitProjectNumberChange')
    // // 当前未整改高风险隐患列表
    // this.$store.dispatch('get_project/getInitPrjRisk')


    //显示项目的整体危险指数以及各专业的危险指数
    // this.$store.dispatch('get_project/getInitProjectIndex')
    //显示项目中各风险等级及其对应的隐患数量
    this.$store.dispatch('get_project/getInitProjectRiskLevel')
    //显示项目中各风险等级及其对应的隐患数量,按年份
    this.$store.dispatch('get_project/getProjectRiskLevelYear')
    //基于项目级展示不同专业隐患占比情况
    this.$store.dispatch('get_project/getInitProjectHistoryPerception')
    //基于项目级展示当前项目中最近一次检查top张高风险隐患图片
    this.$store.dispatch('get_project/getInitProjectImage')

    //以下三项筛选专业，默认发全部传all
    let param2 = new URLSearchParams();
    param2.append('project_name', this.$store.state.get_login.grant_data.data.project_tag);
    param2.append('major', 'all');
    this.$store.commit('get_project/changeParam2', {params: param2})
    //基于项目级展示在不同专业下属于不同隐患子系统的隐患数量
    this.$store.dispatch('get_project/getInitProjectSystem')
    //基于项目级显示在不同专业情况下在不同致因阶段的隐患数量
    this.$store.dispatch('get_project/getInitProjectReason')
    //基于项目级显示在不同专业情况下，隐患区域分布的情况
    this.$store.dispatch('get_project/getInitProjectRegionDistribution')
    //基于项目级显示在不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述
    this.$store.dispatch('get_project/getInitProjectRiskTop')
    //基于项目级显示在不同筛选条件（风险等级/致因阶段/分布区域）下，出现次数排名前top的隐患描述
    this.$store.dispatch('get_project/getProjectOtherTop')
    //基于项目级隐患次数排名前10的系统名称
    this.$store.dispatch('get_project/getProjectSystemNumber')
    //基于项目级隐患次数排名前10的设备名称
    this.$store.dispatch('get_project/getProjectDeviceNumber')
    //基于项目级隐患次数排名前10的组件名称
    this.$store.dispatch('get_project/getProjectUnitNumber')
    // 基于项目级显示违反次数排名前10的法规、违反次数及其相关条款号和内容
    this.$store.dispatch('get_project/getProjectRules')

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