<template>
  <el-row style="height: 100%;">
    <el-row style="height: 100%;" id="head_quarter">
      <headquarterDataScreen id="head_small" style="display: none"></headquarterDataScreen>
      <el-row id="head_large1" class="" style="height: 10%;">
        <!--        <el-col :span="4" style="height: 100%">-->
        <!--          <el-card class="title-box-card" shadow="never"-->
        <!--                   style="background-color: transparent; height: 99%; margin: 0px 5px 5px 5px">-->
        <!--            <el-image-->
        <!--                style="width: 90%; height: 90%"-->
        <!--                :src="url"-->
        <!--                :fit="fit"></el-image>-->
        <!--          </el-card>-->
        <!--        </el-col>-->
        <el-col :span="24" style="height: 100%">
          <div class="title-box-card " shadow="never"
               style="background-color: transparent; height: 99%; width: 99%; margin: 0px 5px 0 5px">
            <h4>
              <span id="head_title1"
                    style="color: #c4bcbc; font-family:Microsoft YaHei; font-size: 0.6em; font-weight: bold;vertical-align: 45%; height: 100%">{{
                  title1
                }}</span>
            </h4>
          </div>
        </el-col>
      </el-row>
      <el-row id="head_large2" class="" style="height: 90%;">
        <el-col :span="5" class="" style="height: 100%; padding-left: 2%; padding-top: 1.5%">
          <Tree
              :treeObj="treeObj"
              @handleNodeClick="handleTrNodeClick"
          ></Tree>
          <el-card class="box-card " shadow="never"
                   style="background-color: transparent; height: 10%; margin: 0px 5px 5px 5px">
            <el-button size="mini" round
                       style="z-index: 9; left: 12%; background-color: transparent; color: #ffffff; float: left"
                       @click="intoHeadDataScreen">展开
            </el-button>
<!--            <headquarterDataScreen id="head_small1"></headquarterDataScreen>-->

            <!--          <label>数据大屏缩略图</label>-->
          </el-card>
        </el-col>
        <!--地图+高风险隐患数量排名-->
        <HighProjectRisk></HighProjectRisk>
        <!--      </el-col>-->
        <!--        <el-col :span="10" id="head_part" style="height: 100%">-->
        <el-col :span="9" style="height: 100%; padding-right: 2.5%">
          <el-row style="height: 100%">
            <!--            <label>chart</label>-->
            <!--          <el-row style="height: 42%">-->
            <!--          <el-col :span="12" style="height: 42%">-->
            <!--            &lt;!&ndash;            已整改项目数量&ndash;&gt;-->
            <!--          </el-col>-->
            <!--          <el-col :span="12" style="height: 42%">-->
            <!--            <el-card class="box-card " shadow="never"-->
            <!--                     style="background-color: transparent; height: 90%; left: 10%; top: 10%">-->
            <!--              &lt;!&ndash;          当前未整改高风险隐患列表&ndash;&gt;-->
            <!--              <Region2_1></Region2_1>-->
            <!--            </el-card>-->
            <!--          </el-col>-->
            <!--          </el-row>-->
            <!--                    <el-row style="height: 42%">-->
            <el-col :span="24" style="height: 29%; margin: 2% 0 2% 2%">
              <!--3维信息-->
              <!--            <Region2_3></Region2_3>-->
<!--              <TopRisk-->
<!--                  :context="{-->
<!--          title:'重复出现隐患列表',-->
<!--          label1:'隐患描述',-->
<!--          label2:'出现频率',-->
<!--          sign:'head_risk',-->
<!--          option:this.risk_option}"-->
<!--                  :top_data="this.$store.state.get_headquarter.risk_number_top"-->
<!--              ></TopRisk>-->
            </el-col>
            <el-col :span="24" style="height: 29%;margin: 2%">
              <TopRisk
                  :context="{
                  title:'重复出现隐患列表',
                  label1:'隐患描述',
                  label2:'出现频率',
                  sign:'head_other',
                  option:this.other_option}"
                  :top_data="this.$store.state.get_headquarter.other_number_top"
              ></TopRisk>
              <!--各等级隐患数量变化-->
            </el-col>
            <el-col :span="24" style="height: 29%;margin: 2% 2% 2% 0%">
              <RiskLevelYear :context="{title:'年度隐患数量', id:'head_level_year'}"></RiskLevelYear>
              <!--各等级隐患数量变化-->
            </el-col>
            <!--                    </el-row>-->
          </el-row>
        </el-col>
      </el-row>

    </el-row>
    <RegionOverview id="region_part" style=""></RegionOverview>
  </el-row>
</template>

<script>
import HighProjectRisk from "@/components/views/HeadQuarters/HighProjectRisk.vue";
import AccumRisk from "@/components/views/HeadQuarters/AccumRisk.vue";
import headquarterDataScreen from "@/components/views/HeadQuarters/headquarterDataScreen.vue";
import CheckOverview from "@/components/views/Check/CheckOverview.vue";
import RegionOverview from "@/components/views/Region/RegionOverview.vue";
import Tree from "@/components/views/functions/Tree.vue";
import TopRisk from "@/components/views/functions/TopRisk.vue";
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";

export default {
  name: "HeadquarterOverview",
  components: {
    RiskLevelYear,
    TopRisk,
    RegionOverview,
    CheckOverview,
    AccumRisk,
    HighProjectRisk,
    headquarterDataScreen,
    Tree
  },
  methods: {
    intoHeadDataScreen() {
      let head_large1 = document.getElementById('head_large1');
      head_large1.style.display = 'none'
      let head_large2 = document.getElementById('head_large2');
      head_large2.style.display = 'none'
      let head_small = document.getElementById('head_small');
      head_small.style.display = 'block'
      head_small.style.width = "500px"
      head_small.style.width = "99%"
      document.getElementById('region_part').style.display = 'none'
    },
    intoDataAnalysis() {
      var href = 'http://10.20.39.102:12001/test#/'
      window.open(href, '_blank')
      // window.location.href = 'http://10.20.39.102:12001/test#/';
    },
    handleTrNodeClick(data, node) {
      this.handleTreeNodeClick(data, node)
    },
    back() {
      window.history.back()
    }
  },
  data() {
    return {
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      fit: 'fill',
      url: 'http://www.zhongrh.com/Upfiles/Base/2020111937459.png',
      filterText: '',
      treeObj: {},
      p_data: [],
      map: "",
      mapInfo: {},
      dataset: {},
      form: {
        name: '',
      },
      map_width: 0,
      map_height: 0,
      timer: '',
      input: 'test',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      title1: this.$store.state.get_login.grant_data.data.headquarter_tag,
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
    }
  },
  created() {
    this.treeObj = this.$store.state.get_login.grant_data.data.value
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: calc(100vh);
}
</style>