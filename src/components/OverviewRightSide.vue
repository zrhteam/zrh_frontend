<template>
  <el-aside width="460px" style="background-color: rgb(238, 241, 246)">
    <el-card class="box-card">
      <div id="project_risk_index" class="text item">
        项目危险指数
      </div>
    </el-card>
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card id="fire_index">
          消防指数
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          电梯指数
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          燃气指数
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          电气指数
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <div class="text item">
        当前整改率
      </div>
    </el-card>
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card>
          最近一次检查隐患专业占比
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          历次检查累计隐患专业占比
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card>
          所有隐患子系统占比
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          所有隐患致因阶段占比
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          所有隐患分布区域占比
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <div class="text item">
        历次检查累计发现隐患数量
      </div>
      <el-table
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            prop="date"
            label="隐患风险等级"
            width="230">
        </el-table-column>
        <el-table-column
            prop="name"
            label="累计发现隐患数量"
            width="230">
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div class="text item">
        历次检查隐患数量变化
      </div>
    </el-card>
  </el-aside>
</template>

<script>
import dataService from "@/service/dataService";

export default {
  name: "OverviewRightSide",
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    GetInitData() {
      //页面初始化得到数据时并不向后台传任何参数
      dataService.getInitData(function (records) {
        // alert(records.msg)
      })
    }
  },
  created() {
    //页面生成时得到各项非查询显示的数据
    this.GetInitData();
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
</style>
