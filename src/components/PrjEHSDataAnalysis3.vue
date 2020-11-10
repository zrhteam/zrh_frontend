<template>
  <el-row style="margin-bottom: 100px">
    <el-col :span="4">
      <div>
        <span>所有隐患子系统占比（可筛选专业）</span>
      </div>
      <div>
        <!--        所有隐患子系统占比（可筛选专业）饼图-->
      </div>
    </el-col>
    <el-col :span="4">
      <div>
        <span>所有致因阶段占比（可筛选专业）</span>
      </div>
      <div>
        <!--        所有致因阶段占比（可筛选专业）饼图-->
      </div>
    </el-col>
    <el-col :span="4">
      <div>
        <span>所有隐患分布区域占比（可筛选专业）</span>
      </div>
      <div>
        <!--        所有隐患分布区域占比（可筛选专业）饼图-->
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <div
            class="text item"
            style="color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: 16px; font-size: 16px; height: 16px;">
          <span>历史重复出现隐患前五名</span>
        </div>
        <div>
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                property="date"
                label="隐患描述"
                width="292">
            </el-table-column>
            <el-table-column
                prop="name"
                label="所属专业">
            </el-table-column>
            <el-table-column
                prop="name"
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
  name: "PrjEHSDataAnalysis3"
}
</script>

<style scoped>

</style>