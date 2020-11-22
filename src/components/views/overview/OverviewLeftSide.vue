<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-form ref="form" :model="form" style="margin-top: 100px">
      <el-form-item label="根据总部名称查询">
        <el-button icon="el-icon-search" circle @click="onSubmitByHeadquarter"></el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.cust_name"></el-input>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" style="margin-top: 100px">
      <el-form-item label="根据区域名称查询">
        <el-button icon="el-icon-search" circle @click="onSubmitByArea"></el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.ctr_name"></el-input>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" style="margin-top: 100px">
      <el-form-item label="根据项目名称查询">
        <el-button icon="el-icon-search" circle @click="onSubmitByPrj"></el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.project_name"></el-input>
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
        cust_name: '宋城壹号',
        ctr_name: '宋城壹号',
        project_name: '宋城壹号01',
      }
    }
  },
  methods: {
    //提交按置地查询的函数
    onSubmitByHeadquarter() {
      let params = new URLSearchParams();
      params.append('cust_name', this.form.cust_name)
      this.$store.state.get_headquarter.params = params
      this.$router.push({path: '/land_headquarters'});
    },
    //按部门名称查询的函数
    onSubmitByArea() {
      let param = new URLSearchParams();
      param.append('ctr_name', this.form.ctr_name)
      this.$store.state.get_region.params = param
      this.$router.push({path: '/region_department'});
    },
    //提交按项目名称查询的函数
    onSubmitByPrj() {
      let params = new URLSearchParams();
      // params.append('cust_name', this.form.cust_name)
      // params.append('ctr_name', this.form.ctr_name)
      params.append('project_name', this.form.project_name)
      this.$store.state.get_project.params = params
      this.$router.push({path: '/prj_data_analysis'});
    }

  },
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

.el-aside {
  color: #333;
  text-align: left;
}
</style>