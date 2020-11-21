<template>
  <el-row style="margin-bottom: 100px">
    <el-col :span="4">
      <div>
        <span>所有隐患子系统占比（可筛选专业）</span>
      </div>
      <div>
        <!--        所有隐患子系统占比（可筛选专业）柱状图-->
      </div>
    </el-col>
    <el-col :span="4">
      <div>
        <span>所有致因阶段占比（可筛选专业）</span>
      </div>
      <div>
        <!--        所有致因阶段占比（可筛选专业）柱状图-->
      </div>
    </el-col>
    <el-col :span="4">
      <div>
        <span>所有隐患分布区域占比（可筛选专业）</span>
      </div>
      <div>
        <!--        所有隐患分布区域占比（可筛选专业）柱状图-->
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <div style="display: none">
              {{ getPrjRiskTop }}
            </div>
        <div
            class="text item"
            style="color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: 16px; font-size: 16px; height: 16px;">
          <span>历史重复出现隐患前五名</span>
        </div>
        <div>
          <el-table
              :data="riskTop"
              style="width: 100%">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                property="description"
                label="隐患描述"
                width="292">
            </el-table-column>
            <el-table-column
                prop="major"
                label="所属专业">
            </el-table-column>
            <el-table-column
                prop="frequency"
                label="出现频率">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "PrjEHSDataAnalysis3",
  data() {
    return {
      riskTop: []
    }
  },
  computed: {
    //得到累计隐患数量
    getPrjRiskTop() {
      let data = this.$store.state.get_project.prj_risk_top;
      console.log(this.$store.state.get_project.prj_risk_top)
      console.log(data)
      let dataArray = []
      for (let i in data) {
        let obj = {
          description: '隐患描述',
          major: '所属专业',
          frequency: 0
        }
        obj.description = i
        obj.major = data[i].major_name
        obj.frequency = data[i].appear_time
        dataArray.push(obj)
        console.log(dataArray)
      }
      this.riskTop = dataArray
    }
  },
  created() {
    this.$store.dispatch('get_project/getInitProjectRiskTop')
    this.$store.dispatch('get_project/getInitProjectSystem')
  }
}
</script>

<style scoped>

</style>