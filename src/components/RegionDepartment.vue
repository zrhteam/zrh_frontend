<template>
  <!-- 商业地产事业部2020年巡检项目EHS大数据分析 -->
  <el-container>
    <el-header>
      <el-row>
        <el-col :span = "24">
          <div id="title" class="grid-content bg-purple-dark" style="...">
            <span>商业地产事业部2020年巡检项目EHS大数据分析</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span = "6">
          <div class = "grid-content bf-purple">
            <div class = "chart-image-icon"></div>
            <div>
              <div style = "...">
                <span>安全指数</span>
              </div>
              <div style = "...">
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
                  <FireHazardIndex></FireHazardIndex>
                </div>
                <div class = "chart-text-title">
                  <span>消防指数</span>
                </div>
              </el-col>
              <el-col :span = "6">
                <div class = "grid-content bg-purple-light">
                  <div></div>
                  <div class = "chart-text-title">
                    <span>电梯指数</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span = "6">
                <div class = "grid-content bg-purple">
                  <div></div>
                  <div class = "chart-text-title" style = "...">
                    <span>燃气指数</span>
                  </div>
                </div>
              </el-col>
              <el-col :span = "6">
                <div class = "grid-content bg-purple-light">
                  <div></div>
                  <div class = "chart-text-title" style = "...">
                    <span>电气指数</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span = "6">
          <div class = "grid-content bg-purple">
            <div style= "...">
              <span>已检查项目数量</span>
            </div>
            <div style = "...">
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
                style = "...">
              <ell-table-colum
                prop = "data"
                label = "隐患风险等级"
                width = "292">
              </ell-table-colum>
              <el-table-column
                prop = "name"
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
            style = "...">
            <el-table-column
              prop = "data"
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
              <div id = "mycheckbox" style = "">
                <checkbox></checkbox>
              </div>
<!--              在这里展示三维图-->

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
                style = "...">
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
            <div style = "...">
              <span>项目安全指数排名</span>
            </div>
            <div>
              <div id = "mydiv3" style = "...">
<!--                这里是写项目安全指数排名的柱状图-->
                <SafetyIndexHistogram></SafetyIndexHistogram>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span = "6">
          <div class = "grid-content bg-purple">
            <div>
              <span>项目累计高风险数量排名</span>
            </div>
            <div id = "mydiv4" style = "...">
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
export default {
name: "RegionDepartment",
  components: {SafetyIndexHistogram, FireHazardIndex, RegionNumberHistogram},
  data(){
    return {
      tableData_1: [],
      tableData_2: [],
      tableData_3: []
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