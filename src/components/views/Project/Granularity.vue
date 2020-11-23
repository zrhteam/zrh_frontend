<template>
  <div>
    <el-form ref="form" :model="form" :label-position="labelPosition">
      <el-form-item label="根据总部名称查询">
        <el-input v-model="form.cust_name" class="prj_input"></el-input>
        <el-button icon="el-icon-search" circle @click="onSubmitByHeadquarter"></el-button>
      </el-form-item>
      <el-form-item label="根据区域名称查询">
        <el-input v-model="form.ctr_name" class="prj_input"></el-input>
        <el-button icon="el-icon-search" circle @click="onSubmitByArea"></el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: "Granularity",
  data() {
    return {
      labelPosition: 'left',
      form: {
        cust_name: '宋城壹号',
        ctr_name: '宋城壹号',
        query_level: 'cust'
      }
    }
  },
  methods: {
    //提交按置地查询的函数
    onSubmitByHeadquarter() {
      let g_params = new URLSearchParams();
      this.form.query_level = 'cust'
      g_params.append('query_level', this.form.query_level)
      g_params.append('cust_name', this.form.cust_name)
      this.$store.state.get_project.g_params = g_params
      this.$store.dispatch('get_project/getInitProjectNumberChange')
      this.$store.dispatch('get_project/getInitProjectHistoryPerception')
    },
    //按部门名称查询的函数
    onSubmitByArea() {
      let g_params = new URLSearchParams();
      this.form.query_level = 'ctr'
      g_params.append('query_level', this.form.query_level)
      g_params.append('ctr_name', this.form.ctr_name)
      this.$store.state.get_project.g_params = g_params
      this.$store.dispatch('get_project/getInitProjectNumberChange')
      this.$store.dispatch('get_project/getInitProjectHistoryPerception')
    }
  }
}
</script>

<style scoped>
.prj_input {
  width: 30%;
}
</style>