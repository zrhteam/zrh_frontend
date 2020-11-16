<template>
  <!-- 商业地产事业部2020年巡检项目EHS大数据分析 -->
  <el-container>
    <el-header>
      <el-row>
        <el-col :span = "24">
          <div id="title" class="grid-content bg-purple-dark" style="text-align: left">
            <span>商业地产事业部2020年巡检项目EHS大数据分析</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row style = "margin-bottom: 100px">
        <el-col :span = "6">
          <div class = "grid-content bf-purple">
            <div class = "chart-image-icon"></div>
            <div>
              <div style = "color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: normal; font-size: 21.09px;">
                <span>安全指数</span>
              </div>
              <div style = "color: rgb(59, 162, 255); font-family: Avenir; font-weight: normal; font-style: normal; line-height: 75.945px; font-size: 50.63px; height: 75.945px;">
                <span>45.90</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span = "6">
          <div class = "grid-content bg-purple">
            <el-row>
              <el-col :span ="6">
                <div>
                  <div style = "color: rgb(59, 162, 255); font-family: Avenir; font-weight: normal; font-style: normal; font-size: 21.09px;">
                    <span>28.93</span>
                  </div>
                  <div class = "chart-text-title">
                    <span>消防指数</span>
                  </div>
                </div>

              </el-col>
              <el-col :span = "6">
                <div class = "grid-content bg-purple-light">
                  <div>
                    <div style = "color: rgb(59, 162, 255); font-family: Avenir; font-weight: normal; font-style: normal; font-size: 21.09px;">
                      <span>76.83</span>
                    </div>
                    <div class = "chart-text-title">
                      <span>电梯指数</span>
                    </div>
                  </div>

                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span = "6">
                <div class = "grid-content bg-purple">
                  <div>
                    <div style = "color: rgb(59, 162, 255); font-family: Avenir; font-weight: normal; font-style: normal; font-size: 21.09px;">
                      <span>82.69</span>
                    </div>
                    <div class = "chart-text-title" style = "left: 35%; bottom: 20%;">
                      <span>燃气指数</span>
                    </div>
                  </div>

                </div>
              </el-col>
              <el-col :span = "6">
                <div class = "grid-content bg-purple-light">
                  <div>
                    <div style = "color: rgb(59, 162, 255); font-family: Avenir; font-weight: normal; font-style: normal; font-size: 21.09px;">
                      <span>82.69</span>
                    </div>
                    <div class = "chart-text-title" style = "left: 45%; bottom: 20%;">
                      <span>电气指数</span>
                    </div>
                  </div>

                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span = "6">
          <div class = "grid-content bg-purple">
            <div style= "color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: 16px; font-size: 16px; height: 16px;">
              <span>已检查项目数量</span>
            </div>
            <div style = "color: rgb(247, 10, 10); font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 30px;">
              20
            </div>
          </div>
        </el-col>
        <el-col :span = "6">
          <div class = "grid-content bg-purple-light">
            <div class = "text item">
              <span>所有项目累计发现隐患数量</span>
            </div>
            <el-table
                :data = "tableData_1"
                border
                style = "width: 100%">
              <el-table-column
                prop = "risk_level"
                label = "隐患风险等级"
                width = "292">
              </el-table-column>
              <el-table-column
                prop = "number"
                label="累计发现隐患数量">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span = "6">
          <div class = "grid-content bg-purple-light">
            <div class = "text list">
              <span>项目当前未整改高风险隐患列表</span>
            </div>
          </div>
          <el-table
            :data = "tableData_2"
            style = "width: 100%">
            <el-table-column
              prop = "description"
              label = "隐患描述"
              width = "292">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span = "6">
          <div class = "grid-content bg-purple">
            <div>
              <span>未整改高风险隐患图片</span>
            </div>
          </div>
          <div class = "grid-content bg-purple">
         <!--   隐患图片         -->
          </div>
        </el-col>
        <el-col :span = "12">
          <div class="grid-content bg-purple">
            <div>
              <span>所有项目累计发现隐患专业分布</span>
            </div>
            <div>
              <div id = "mycheckbox" >
                <checkbox></checkbox>
              </div>
<!--              在这里展示三维图-->
              <div>
                <RiskDistribution></RiskDistribution>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span = "12">
          <div class = "grid-content bg-purple-light">
            <div id = "subtitle1">
              <span>项目累计出现隐患前十条</span>
            </div>
            <div>
              <el-table
                :data = "tableData_3"
                stripe
                style = "width: 100%">
                <el-table-column
                  prop = "description"
                  label = "隐患描述">
                </el-table-column>
                <el-table-column
                  prop = "number"
                  label = "出现次数">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span = "6">
          <div class = "grid-content bg-purple">
            <div style = "text-align: left">
              <span>项目安全指数排名</span>
            </div>
            <div>
              <div id = "mydiv3" style = "font-color: black">
<!--                这里是写项目安全指数排名的柱状图-->
                <SafetyIndexHistogram></SafetyIndexHistogram>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span = "6">
          <div class = "grid-content bg-purple">
            <div style = "text-align: left">
              <span>项目累计高风险数量排名</span>
            </div>
            <div id = "mydiv4" >
<!--              这里写累计高风险数量排名的柱状图-->
              <RegionNumberHistogram></RegionNumberHistogram>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import dataService from "@/service/dataService";
import FireHazardIndex from "@/components/FireHazardIndex.vue";
import checkbox from "@/components/checkbox.vue";
import SafetyIndexHistogram from "@/components/SafetyIndexHistogram.vue";
import RegionNumberHistogram from "@/components/RegionNumberHistogram.vue";
import RiskDistribution from "@/components/RiskDistribution.vue";


export default {
name: "RegionDepartment",
  components: {checkbox, RiskDistribution, SafetyIndexHistogram, RegionNumberHistogram},
  data(){
    return {
      tableData_1: [{
        risk_level: '高风险',
        number: '247'
      },
        {
          risk_level: '中风险',
          number: '1905'
        },
        {
          risk_level: '低风险',
          number: '552'
        }],
      tableData_2: [{
        description: '1台排烟机'
      },
        {
          description: '1台正压送风机'
        },
        {
          description: '2台排烟风机'
        }],
      tableData_3: [{
        description: '防火门顺序器故障',
        number: '36'
      },
      {
        description: '防火门顺序器故障',
        number: '26'
      },
      {
        description: '防火门顺序器故障',
        number: '16'
      }]
    }
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/ibdex.css");

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