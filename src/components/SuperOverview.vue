<template>
  <el-row>
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <el-button type="primary" @click="enterDB">数据库可视化系统</el-button>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple-light">
        <el-dropdown @command="handleCommand">
          <el-button type="primary">
            数据可视化系统<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, i) in headList" :command="item" @click="enterHead">{{item}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
<!--    可以考虑把数据分析和数据洞察分开-->
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <el-button type="primary" @click="enterDataAnalysis">数据分析系统</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "SuperOverview",
  data() {
    return {
      headList: []
    }
  },
  mounted() {
    this.headList = this.getHeadList()
  },
  methods: {
    getHeadList() {
      // console.log('grant2', this.$store.state.get_login.grant_data)
      let arr = []
      for(let i in this.$store.state.get_login.grant_data.data.value.headquarter_tag){
        arr.push(i)
      }
      return arr
    },
    enterDB() {
      this.$router.push({path: '/'});//数据库可视化系统的地址待填
    },
    enterHead(head_name) {
      //得到选取的总部名称，进入相应总部页面
      let param = new URLSearchParams();
      param.append('headquarter_name', head_name);
      this.$router.push({path: '/land_headquarters'});
    },
    handleCommand(command) {
      this.enterHead(command)
    },
    enterDataAnalysis() {
      this.$router.push({path: '/data_compare'});
    }
  }
}
</script>

<style scoped>

</style>