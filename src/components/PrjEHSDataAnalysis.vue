<template>
  <!--  项目层级EHS数据大屏-->
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="24">
          <div id="title" class="grid-content bg-purple-dark" style="text-align: left">
            <span>{{ prj_name }}EHS数据大屏</span></div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row style="margin-bottom: 150px">
        <el-col :span="8">
          <!--          安全指数部分-->
          <el-row>
            <el-col :span="24">
              <div class="safety_index" style="height: 100px">
                <div class="grid-content bg-purple-dark"
                     style="color: rgb(126, 210, 250);font-family: ‘Microsoft YaHei’;font-weight: bold;font-style: normal;line-height: normal;float: left;font-size: 28.38px;margin-left: 150px;margin-top: 30px">
                  <span>安全指数 {{ safety_index }}</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple index">
                <div class="index_box">
                  <span>消防指数 {{ fire_index }}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light index">
                <div class="index_box">
                  <span>电梯指数 {{ elevator_index }}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple index">
                <div class="index_box">
                  <span>燃气指数 {{ gas_index }}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light index">
                <div class="index_box">
                  <span>电气指数 {{ electric_index }}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <!--          整改率另起一个页面 有一个仪表盘-->
          <PrjCurrentCorrectionRate></PrjCurrentCorrectionRate>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <div style="display: none">
              {{ getPrjRiskLevelData }}
            </div>
            <div class="text item">
              <span>历次检查累计发现隐患数量</span>
            </div>
            <el-table
                :data="PrjRiskLevelData"
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
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div
                style="color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: 16px; font-size: 16px; height: 16px;">
              <span>历次检查隐患数量变化</span>
            </div>
            <div
                style="color: rgb(247, 10, 10); font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 52px;">
              <!--              柱状图-->
            </div>
          </div>
        </el-col>
      </el-row>
      <PrjEHSDataAnalysis2></PrjEHSDataAnalysis2>
      <PrjEHSDataAnalysis3></PrjEHSDataAnalysis3>
    </el-main>
  </el-container>
</template>

<script>
import PrjEHSDataAnalysis2 from "@/components/PrjEHSDataAnalysis2.vue";
import PrjEHSDataAnalysis3 from "@/components/PrjEHSDataAnalysis3.vue";
import PrjCurrentCorrectionRate from "@/components/PrjCurrentCorrectionRate.vue";

export default {
  name: "PrjEHSDataAnalysis",
  components: {PrjCurrentCorrectionRate, PrjEHSDataAnalysis3, PrjEHSDataAnalysis2},
  data() {
    return {
      prj_name: '',
      safety_index: '',
      elevator_index: '',
      PrjRiskLevelData: []
    }
  },
  computed: {
    //得到累计隐患数量
    getPrjRiskLevelData() {
      let data = this.$store.state.get_project.prj_risk_data;
      console.log(this.$store.state.get_project.prj_risk_data)
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
        // debugger
        console.log(dataArray)
      }
      this.PrjRiskLevelData = dataArray
    }
  },
  created() {
    // debugger
    this.$store.dispatch('get_project/getInitProjectRiskNumber')
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

.index {
  padding: 5px;
  background-color: #F7F7F7;
  width: 80%;
  height: 200px;
}

.index_box {
  padding-top: 50px;
}
</style>