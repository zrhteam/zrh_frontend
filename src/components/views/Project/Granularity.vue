<template>
  <div class="prj_form">
<!--    <el-form ref="form" :model="form" :label-position="labelPosition" class="gran">-->
<!--      <el-form-item size="mini">-->
<!--        <span class="level4"> 根据总部名称查询 </span>-->
<!--        <el-input size="mini" v-model="form.cust_name" class="prj_input"></el-input>-->
<!--        <el-button icon="el-icon-search" circle @click="onSubmitByHeadquarter"></el-button>-->
<!--      </el-form-item>-->
<!--      <el-form-item size="mini">-->
<!--        <span class="level4"> 根据区域名称查询 </span> -->
<!--        <el-input v-model="form.ctr_name" class="prj_input"></el-input>-->
<!--        <el-button icon="el-icon-search" circle @click="onSubmitByArea"></el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
    <el-form style="margin-left:10px; margin-right: 10px" ref="form" :model="form">
      <el-form-item label="输入层级">
        <el-radio-group v-model="level">
          <el-radio label="区域层级"></el-radio>
          <el-radio label="总部层级"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item size="mini" label="输入查询内容"></el-form-item>
      <!--        尝试写带下拉列表的查询框-->
      <el-form-item size="mini" prop="name">
        <div style="width: 500px">
          <el-select size="mini" v-model="form.search_name" filterable  popper-class="select-option">
            <el-option
                v-for="item in name"
                :value="item"
                :label="item">
            </el-option>
          </el-select>
          <el-button round size="mini" @click="onSubmitQuery">确认</el-button>
        </div>

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
        search_name: '',
        query_level: ''
      },
      level: '总部层级',
      region_name: [],
      head_name: [],
      name: []
    }
  },
  watch: {
    level(val) {
      if (val == '区域层级') {
        this.name = this.region_name
      } else if (val == '总部层级') {
        this.name = this.head_name
      }
    },
    nameList(data) {
      console.log('namelist', data)
      // let prj_name = []
      // let region_name = []
      // let head_name = []
      for (let i in data) {
        this.head_name.push(i)
        for (let j in data[i]) {
          this.region_name.push(j)
        }
      }
      this.name = this.head_name
      // console.log('prj_name', this.prj_name)
      // console.log('region_name', this.region_name)
      // console.log('head_name', this.head_name)
    },
  },
   computed: {
    //得到所有项目名称，区域名称、总部名称
    nameList() {
      return this.$store.state.get_locations.name
      // console.log(this.dataset)
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
      }
    },
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
  },
  created() {
    this.$store.dispatch('get_locations/getProjectionMap')
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

.prj_form {
  max-width: 500px;
  text-align: left;
}

</style>