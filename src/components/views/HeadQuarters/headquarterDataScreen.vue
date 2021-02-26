<template>
  <el-row class="region_data_screen" style="height: 100%;">
    <el-row style="height: 10%">
      <el-card class="title-box-card" shadow="never"
               style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px;">
        <h4>
          <span id="head_title1"
                style="color: #ffffff; font-family:Microsoft YaHei; font-size: 0.6em; font-weight: bold; vertical-align: 45%; height: 100%">{{title1}}</span>
        </h4>
      </el-card>
    </el-row>
    <el-row style="height: 4%;">
      <el-button size="mini" round
                   style="background-color: transparent; color: #ffffff; float: right"
                 @click="outHeadDataScreen">返回
      </el-button>
    </el-row>

<!--    <el-col :span="24" style="height: 95%;">-->
      <!--      <el-row style="height: 10%;">-->
      <!--        <el-col :span="4" style="height: 100%">-->
      <!--          <el-card class="box-card " shadow="never"-->
      <!--                   style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px">-->
      <!--            <el-image-->
      <!--                style="width: 90%; height: 90%"-->
      <!--                :src="url"-->
      <!--                :fit="fit"></el-image>-->
      <!--          </el-card>-->
      <!--        </el-col>-->
      <!--        <el-col :span="18" style="height: 100%;">-->
      <!--          <el-card class="title-box-card" shadow="never"-->
      <!--                   style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px;">-->
      <!--            &lt;!&ndash;        <label style="color: #c4bcbc; font-family:宋体; height: 95%">中瑞恒可视化系统</label>&ndash;&gt;-->
      <!--            &lt;!&ndash;            <label&ndash;&gt;-->
      <!--            &lt;!&ndash;                style="color: #c4bcbc; font-family:Noto Sans SC; font-size: 1em; height: 80% ">{{ title1 }}</label>&ndash;&gt;-->
      <!--          </el-card>-->
      <!--        </el-col>-->
      <!--        <el-col :span="2" style="height: 100%;">-->
      <!--          <el-card class="box-card " shadow="never"-->
      <!--                   style="background-color: transparent; height: 100%; margin: 0px 5px 5px 5px;">-->
<!--                  <el-button size="mini" round-->
<!--                             style="background-color: transparent; color: #ffffff"-->
<!--                             @click="outHeadDataScreen">返回-->
<!--                  </el-button>-->
      <!--          </el-card>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <el-row style="height: 80%;">
        <el-col :span="8" style="height: 45%; margin-left:0.5%">
          <Ratio
              :context="{
          title:'不同专业隐患数量',
          id: 'id_head_major'
        }"></Ratio>
        </el-col>
        <el-col :span="8" style="height: 45%; ">
          <Ratio
              :context="{
          title:'不同致因阶段隐患数量',
          id: 'id_head_reason'
        }"></Ratio>
        </el-col>
        <el-col :span="8" style="height: 45%; width: 31.5%">
          <Ratio
              :context="{
          title:'不同分布区域隐患数量',
          id: 'id_head_region'
        }"></Ratio>
        </el-col>
        <el-col :span="12" style="height: 45%; margin-top: 4%">
          <BarRank
              :context="{
          title:'各区域检查次数',
          id: 'id_head_rank1'}"
          ></BarRank>
        </el-col>
        <el-col :span="12" style="height: 45%; margin-top: 4%">
          <BarRank
              :context="{
          title:'各区域在管项目数量',
          id: 'id_head_rank2'}"
          ></BarRank>
        </el-col>
      </el-row>
<!--    </el-col>-->
<!--    <el-col :span="4" style="height: 89%; overflow: scroll">-->
<!--      <el-card class="box-card " shadow="never"-->
<!--               style="background-color: transparent; height: 6%; margin: 0; text-align: right">-->
<!--        <el-button size="mini" round-->
<!--                   style="background-color: transparent; color: #ffffff; vertical-align: top; text-align: right"-->
<!--                   @click="outHeadDataScreen">返回-->
<!--        </el-button>-->
<!--      </el-card>-->
<!--      <el-card class="box-card " shadow="never"-->
<!--               style="background-color: transparent; height: 9%; margin: 0px 5px 5px 5px">-->
<!--        <h6 style="color: #ffffff; font-family: Noto Sans SC; font-size: 0.6em;">可选择</h6>-->
<!--      </el-card>-->
<!--      <el-card class="box-card " shadow="never"-->
<!--               style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">-->

<!--      </el-card>-->
<!--      <el-card class="box-card " shadow="never"-->
<!--               style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">-->

<!--      </el-card>-->
<!--      <el-card class="box-card " shadow="never"-->
<!--               style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">-->

<!--      </el-card>-->
<!--      <el-card class="box-card " shadow="never"-->
<!--               style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">-->
        <div style="display: none">
          {{ getName }}
        </div>
        <!--        <TopName-->
        <!--            :context="{title:'根据检查次数的区域排名（8）',-->
        <!--            top_data:this.rank_by_check,-->
        <!--            label1:'项目名称',-->
        <!--            label2:'检查次数',-->
        <!--        }"></TopName>-->

<!--      </el-card>-->
<!--      <el-card class="box-card " shadow="never"-->
<!--               style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">-->

<!--      </el-card>-->
<!--      <el-card class="box-card " shadow="never"-->
<!--               style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">-->

<!--      </el-card>-->
<!--      <el-card class="box-card " shadow="never"-->
<!--               style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">-->

<!--      </el-card>-->
<!--      <el-card class="box-card " shadow="never"-->
<!--               style="background-color: transparent; height: 300px; margin: 0px 5px 5px 5px">-->
<!--        &lt;!&ndash;        <TopName&ndash;&gt;-->
<!--        &lt;!&ndash;            :context="{title:'根据项目数量的区域排名（12）',&ndash;&gt;-->
<!--        &lt;!&ndash;            top_data:this.rank_by_prj,&ndash;&gt;-->
<!--        &lt;!&ndash;            label1:'项目名称',&ndash;&gt;-->
<!--        &lt;!&ndash;            label2:'检查次数',&ndash;&gt;-->
<!--        &lt;!&ndash;        }"></TopName>&ndash;&gt;-->

<!--      </el-card>-->
<!--    </el-col>-->
  </el-row>
</template>

<script>
import HighRiskImages from "@/components/views/HeadQuarters/HighRiskImages.vue";
import ProjectIndex from "@/components/views/HeadQuarters/ProjectIndex.vue";
import Tree from "@/components/views/functions/Tree.vue";
import TopRisk from "@/components/views/functions/TopRisk.vue";
import RiskLevelYear from "@/components/views/functions/RiskLevelYear.vue";
import TopName from "@/components/views/functions/TopName.vue";
import Ratio from "@/components/views/functions/Ratio.vue";
import BarRank from "@/components/views/functions/BarRank.vue";

export default {
  name: "headquarterOverview",
  components: {
    BarRank,
    Ratio,
    RiskLevelYear,
    ProjectIndex,
    HighRiskImages,
    Tree,
    TopRisk,
    TopName
  },
  methods: {
    outHeadDataScreen() {
      let large1 = document.getElementById('head_large1');
      large1.style.display = 'block'
      large1.style.width = "500px"
      large1.style.width = "99%"
      let large2 = document.getElementById('head_large2');
      large2.style.display = 'block'
      large2.style.width = "500px"
      large2.style.width = "99%"
      let prj_small = document.getElementById('head_small');
      prj_small.style.display = 'none'
    },
  },
  computed: {
    getName() {
      let data = this.$store.state.get_headquarter.rank_by_check
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i]
        this.rank_by_check.push(obj)
      }
      data = this.$store.state.get_headquarter.rank_by_prj
      for (let i in data) {
        let obj = {
          name: '',
          appear_time: 0
        }
        obj['name'] = i
        obj['appear_time'] = data[i]
        this.rank_by_prj.push(obj)
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
      rank_by_check: [],
      rank_by_prj: []
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