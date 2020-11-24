<template>
  <div>
    <el-form ref="form" :model="form" :label-position="labelPosition" class="gran">
      <el-form-item size="mini">
        <span class="level4"> 根据总部名称查询 </span>
        <el-input size="mini" v-model="form.cust_name" class="prj_input"></el-input>
        <el-button icon="el-icon-search" circle @click="onSubmitByHeadquarter"></el-button>
      </el-form-item>
      <el-form-item size="mini">
        <span class="level4"> 根据区域名称查询 </span>
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
      this.$store.dispatch('get_project/getInitProjectRiskNumber')
      this.$store.dispatch('get_project/getInitProjectNumberChange')
      this.$store.dispatch('get_project/getInitProjectNearestPerception')
      this.$store.dispatch('get_project/getInitProjectHistoryPerception')
      this.$store.dispatch('get_project/getInitProjectRiskTop')
    },
    //按部门名称查询的函数
    onSubmitByArea() {
      let g_params = new URLSearchParams();
      this.form.query_level = 'ctr'
      g_params.append('query_level', this.form.query_level)
      g_params.append('ctr_name', this.form.ctr_name)
      this.$store.state.get_project.g_params = g_params
      this.$store.dispatch('get_project/getInitProjectRiskNumber')
      this.$store.dispatch('get_project/getInitProjectNumberChange')
      this.$store.dispatch('get_project/getInitProjectNearestPerception')
      this.$store.dispatch('get_project/getInitProjectHistoryPerception')
      this.$store.dispatch('get_project/getInitProjectRiskTop')
    }
  }
}
</script>

<style scoped>
.gran {
  text-align: left;
}

.prj_input {
  max-width: 200px;
}

</style>