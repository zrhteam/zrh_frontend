<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-form ref="form" :model="form" style="margin-top: 100px">
      <el-form-item label="根据项目名称查询">
        <el-button icon="el-icon-search" circle @click="onSubmitByPrj"></el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.project_name"></el-input>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" style="margin-top: 100px">
      <el-form-item label="根据区域名称查询">
        <el-button icon="el-icon-search" circle @click="onSubmitByArea"></el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.area_name"></el-input>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" style="margin-top: 100px">
      <el-form-item label="根据总部名称查询">
        <el-button icon="el-icon-search" circle @click="onSubmitByHeadquarter"></el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.headquarter_name"></el-input>
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
      this.$router.push({path: '/prj_data_analysis'});
      // let params = new URLSearchParams();
      // alert(this.form.project_name)
      // params.append('project_name', this.form.project_name);
      // console.log(params)
      // dataService.getProjectName( params,function (records) {
      //   console.log(records)
      //   // alert(records.msg)
      // })
    },
    onSubmitByArea() {
      this.$router.push({path: '/region_department'});
    },
    onSubmitByHeadquarter() {
      this.$router.push({path: '/land_headquarters'});
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