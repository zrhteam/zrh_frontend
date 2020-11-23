<template>
  <el-card class="box-card box">
      <el-form style="margin-left:20px; margin-right: 20px" ref="form" :model="form">
        <el-form-item label="输入层级">
          <el-radio-group v-model="level">
            <el-radio label="项目层级"></el-radio>
            <el-radio label="区域层级"></el-radio>
            <el-radio label="总部层级"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="mini" label="输入查询内容"></el-form-item>
        <el-form-item size="mini" prop="name">
          <div style="width: 200px; margin-left: 20px">
            <el-input maxlength="100px" size="mini" v-model="form.search_name"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button round size="mini" @click="onSubmitQuery">确认</el-button>
        </el-form-item>
      </el-form>
<!--    </div>-->
  </el-card>
</template>

<script>

export default {
  name: "OverviewLeftSide",
  data() {
    return {
      form: {
        cust_name: '宋城壹号',
        ctr_name: '宋城壹号',
        project_name: '宋城壹号01',
        search_name: '宋城壹号'

      },
      level: '项目层级',
    }
  },
  watch: {
    level(val) {

    }
  },
  methods: {
    onSubmitQuery() {
      if (this.level == '总部层级') {
        this.form.cust_name = this.form.search_name;
        this.onSubmitByHeadquarter();
      } else if (this.level == '区域层级') {
        this.form.ctr_name = this.form.search_name;
        this.onSubmitByArea();
      } else if (this.level == '项目层级') {
        this.form.project_name = this.form.search_name;
        this.onSubmitByPrj()
      }
    },

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
.box{
  box-shadow: 0 2px 4px rgba(80, 30, 30, 0.12), 0 0 6px rgba(123, 31, 31, 0.04);

}
</style>