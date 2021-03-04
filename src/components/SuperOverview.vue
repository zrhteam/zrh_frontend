<template>
  <div class="background" style="vertical-align: center">
<!--    <img :src="imgSrc" width="100%" height="100%" alt="" />-->
    <el-col :span="8" style="height: 100%">
<!--      <div class="grid-content bg-purple">-->
        <el-button type="primary" icon="el-icon-view" @click="enterDB" style="font-size: 30px; top: 60%;"></el-button>
<!--      </div>-->
    </el-col>
    <el-col :span="4">
<!--      <div class="grid-content bg-purple-light">-->
        <el-dropdown @command="handleCommand">
          <el-button type="primary" style="font-size: 30px; top: 60%;">
            数据可视化系统<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, i) in headList" :command="item" @click="enterHead">{{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
<!--      </div>-->
    </el-col>
    <!--    把数据分析和数据洞察分开-->
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <el-button type="primary" @click="enterDataAnalysis" style="font-size: 50px; top: 60%;">数据分析系统</el-button>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <el-button type="primary" @click="enterDataInsight" style="font-size: 30px; top: 60%;">数据洞察系统</el-button>
      </div>
    </el-col>
    </div>
</template>

<script>
export default {
  name: "SuperOverview",
  data() {
    return {
      headList: [],
      imgSrc: require('../assets/home_page.png')
    }
  },
  mounted() {
    this.headList = this.getHeadList()
  },
  methods: {
    getHeadList() {
      // console.log('grant2', this.$store.state.get_login.grant_data)
      let arr = []
      for (let i in this.$store.state.get_login.grant_data.data.value.headquarter_tag) {
        arr.push(i)
      }
      return arr
    },
    enterDB() {
      this.$router.push({path: '/'});//数据库可视化系统的地址待填
    },
    enterHead(head_name) {
      //得到选取的总部名称，进入相应总部页面
      // let param = new URLSearchParams();
      // param.append('headquarter_name', head_name);
      // this.$store.commit('get_headquarter/changeParams', {params: param})
      // this.$store.commit('get_headquarter/changeHeadName', {params: param})
      let data = {
        label: head_name
      }
      let node = {
        level: 1
      }
      this.$router.push({path: '/land_headquarters'});
      this.handleTreeNodeClick(data, node)
    },
    handleCommand(command) {
      this.enterHead(command)
    },
    enterDataAnalysis() {
      this.$router.push({path: '/data_compare'});
    },
    enterDataInsight() {
      this.$router.push({path: '/analyze'});
    }
  }
}
</script>

<style scoped>
.background{
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    position: relative;
}
.background {
  background: url("../assets/home_page.png") no-repeat;
  background-size: cover;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>