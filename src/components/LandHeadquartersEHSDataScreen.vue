<template>
  <!--  置地总部EHS数据大屏-->
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="24">
          <div id="title" class="grid-content bg-purple-dark" style="text-align: left"><span>置地总部EHS数据大屏</span></div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row style="margin-bottom: 100px">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="chart-image-icon"></div>
            <div>
              <div
                  style="color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: normal; font-size: 21.09px;">
                <span>总部危险指数</span>
              </div>
              <div
                  style="color: rgb(59, 162, 255); font-family: Avenir; font-weight: normal; font-style: normal; line-height: 75.945px; font-size: 50.63px; height: 75.945px;">
                <span>23,185</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div id="fire_pie">
                    <!--                    <FireHazardIndex></FireHazardIndex>-->
                  </div>
                  <div class="chart-text-title">
                    <span>消防危险指数</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div></div>
                  <div class="chart-text-title">
                    <span>电梯危险指数</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div></div>
                  <div class="chart-text-title" style="left: 35%; bottom: 20%;">
                    <span>电气危险指数</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div></div>
                  <div class="chart-text-title" style="left: 45%; bottom: 20%;">
                    <span>燃气危险指数</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div
                style="color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: 16px; font-size: 16px; height: 16px;">
              <span>总部整改率</span>
            </div>
            <div
                style="color: rgb(247, 10, 10); font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 30px;">
              {{ getRectificationRate }}
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div style="display: none">
            {{ getRiskLevelData }}
          </div>
          <div class="grid-content bg-purple-light">
            <div class="text item">
              <span>所有项目累计发现隐患数量</span>
            </div>
            <el-table
                :data="riskLevelData"
                border
                style="width: 100%">
              <el-table-column
                  prop="risk"
                  label="隐患风险等级"
                  width="292">
              </el-table-column>
              <el-table-column
                  prop="num"
                  label="累计发现隐患数量">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
      <LandHeadquarter2></LandHeadquarter2>
      <LandHeadquarter3></LandHeadquarter3>
    </el-main>
  </el-container>
</template>

<script>
import dataService from "@/service/dataService";
import FireHazardIndex from "@/components/FireHazardIndex.vue";
import LandHeadquarter3 from "@/components/LandHeadquarter3.vue";
import LandHeadquarter2 from "@/components/LandHeadquarter2.vue";
import * as d3 from "d3";

export default {
  name: "LandHeadquartersEHSDataScreen",
  components: {LandHeadquarter3, LandHeadquarter2, FireHazardIndex},
  data() {
    return {
      riskLevelData: []
    }
  },
  computed: {
    //页面初始化时得到总部整改率
    getRectificationRate() {
      return this.$store.state.get_headquarter.rectification;
    },
    //得到累计隐患数量
    getRiskLevelData() {
      let data = this.$store.state.get_headquarter.risk_level_data.risk_level;
      console.log(this.$store.state.get_headquarter.risk_level_data.risk_level)
      console.log(data)
      //  风险等级对应情况
      //  1：低风险； 2：中风险； 3：高风险
      let dataArray = []
      for (let i in data) {
        let obj = {
          risk: '风险',
          num: 0
        }
        if (i == 1) {
          obj.risk = '低风险'
          obj.num = data[i]
        }
        if (i == 2) {
          obj.risk = '中风险'
          obj.num = data[i]
        }
        if (i == 3) {
          obj.risk = '高风险'
          obj.num = data[i]
        }
        dataArray.push(obj)
        console.log(dataArray)
      }
      let obj = {
        risk: '风险',
        num: 0
      }
      if(dataArray.length == 3) {
        obj.risk = '列总计'
        obj.num = dataArray[0].num + dataArray[1].num + dataArray[2].num
        dataArray.push(obj)
        console.log(dataArray)
      }
      // obj.risk = '列总计'
      // obj.num = dataArray[0].num + dataArray[1].num + dataArray[2].num
      // dataArray.push(obj)
      // console.log(dataArray)
      this.riskLevelData = dataArray
    }
  },
  methods: {
    //提交按项目名称查询的函数
    // GetInitPage() {
    //   dataService.getRectificationRate(function (records) {
    //     alert(records.msg)
    //   })
    // }
  },
  created() {
    this.$store.dispatch('get_headquarter/getInitRectification')
    this.$store.dispatch('get_headquarter/getInitRiskLevelData')
    this.$store.dispatch('get_headquarter/getInitNumberTop')
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

i {
  font-style: normal;
}

.chart-image-icon {
  position: absolute;
  left: 0;
  top: 0;
  width: 25%;
  height: 100%;
  background-size: 100% 100%;
}

.chart-image-icon {
  background-image: url('../components/svg/card-skin-1.svg');
  font-family: 'microsoft YaHei';

}

.chart-text-title {
  color: #000000;
  font-weight: bold;
  font-style: normal;
  line-height: normal;
  font-size: 12px;
}
</style>
