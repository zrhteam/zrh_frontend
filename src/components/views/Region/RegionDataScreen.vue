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
    <el-row style="height: 4%;">
      <el-button size="mini" round
                   style="background-color: transparent; color: #ffffff; float: right"
                   @click="outRegionDataScreen">返回
        </el-button>
    </el-row>
<!--    <el-col :span="20" style="height: 100%">-->
      <el-row style="height: 80%">
        <el-col :span='12' style="height: 100%">
          <el-row style="height: 30%;">
            <BarRank
                :context="{
              title:'根据检查次数的项目排名（9）',
              id: 'id_region_rank2'}"
            ></BarRank>
          </el-row>
          <el-row style="height: 30%; margin:2% 0% 0 0">
            <Ratio
                :context="{
              title:'隐患子系统隐患占比（12）',
              id: 'id_region_system'
          }"></Ratio>
          </el-row>
          <el-row style="height: 30%;margin:3.2% 0% 0 0">
            <el-col :span="11" style="height: 100%;margin-left:1%">
              <Ratio
                  :context="{
                title:'致因阶段隐患占比（12）',
                id: 'id_region_reason'
            }"></Ratio>
            </el-col>
            <el-col :span="11" style="height: 100%;margin-left:6%">
              <Ratio
                  :context="{
                title:'分布区域隐患占比（13）',
                id: 'id_region_region'
            }"></Ratio>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span='12' style="height: 100%">
          <el-row style="height: 30%">
            <RiskLevelYear :context="{title:'区域累计年隐患数量（3）', id:'region_level_year'}"></RiskLevelYear>
          </el-row>
          <el-row style="height: 30%;margin:2% 0% 0 0">
            <Ratio
                :context="{
              title:'各专业隐患数量占比（10）',
              id: 'id_region_major'
          }"></Ratio>
          </el-row>
          <el-row style="height: 30%;margin:2% 0% 0 0">
            <Region2_2></Region2_2>
          </el-row>
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

export default {
  name: "RegionDataScreen",
  components: {
    BarRank,
    TopName,
    TopRisk,
    RiskLevelYear,
    Tree,
    Region3_1,
    Region2_2,
    Ratio
  },
  methods: {
    outRegionDataScreen() {
      let large1 = document.getElementById('region_large1');
      large1.style.display = 'block'
      large1.style.width = "500px"
      large1.style.width = "99%"
      let large2 = document.getElementById('region_large2');
      large2.style.display = 'block'
      large2.style.width = "500px"
      large2.style.width = "99%"
      let prj_small = document.getElementById('region_small');
      prj_small.style.display = 'none'
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
      let data = this.$store.state.get_region.rank_by_check
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
      rank_by_check: []
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