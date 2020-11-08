<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="项目名称">
        <el-input v-model="form.project_name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitByPrj">查询</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="区域名称">
        <el-input v-model="form.area_name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitByArea">查询</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="总部名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </el-aside>
</template>

<script>
import dataService from "@/service/dataService";

export default {
  name: "OverviewLeftSide",
  data() {
    return {
      form: {
        project_name: '',
        area_name: '',
        name: '',
      }
    }
  },
  methods: {
    //提交按项目名称查询的函数
    onSubmitByPrj() {
      console.log('submit!');
      let params = new URLSearchParams();
      alert(this.form.project_name)
      params.append('project_name', this.form.project_name);
      console.log(params)
      dataService.getProjectName( params,function (records) {
        alert(records.msg)
      })
    },
    onSubmitByArea() {
      console.log('submit!');
    },
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

.el-aside {
  color: #333;
  text-align: left;
}
</style>