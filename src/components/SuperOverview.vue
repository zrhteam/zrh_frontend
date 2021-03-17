<template>
  <div class="background" style="vertical-align: center">
    <img id="img1_bg" :src="imgSrc1" @click="enterDB" alt=""
         style="width: 17.1%; left: 12.7%; top: 41.4%; z-index: 99; position: absolute;"/>
    <el-dropdown @command="handleCommand">
      <el-button style="background-image: url(../assets/data_vis.png);
left:-360px; top:343px;
width: 330px;height: 353px;background-repeat:no-repeat ;
background-size:330px 353px; border: 0;
background-color: transparent;
position: absolute">
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, i) in headList" :command="item" @click="enterHead">{{ item }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <img :src="imgSrc3" @click="enterDataAnalysis" alt=""
         style="width: 17.1%; left: 50%; top: 43.5%; z-index: 99; position: absolute;"/>
    <img :src="imgSrc4" @click="enterDataInsight" alt=""
         style="width: 17.1%; left: 68.5%; top: 41.4%; z-index: 99; position: absolute;"/>
  </div>
</template>

<script>
export default {
  name: "SuperOverview",
  data() {
    return {
      headList: [],
      imgSrc1: require('../assets/db_vis.png'),
      imgSrc2: require('../assets/data_vis.png'),
      imgSrc3: require('../assets/data_analysis.png'),
      imgSrc4: require('../assets/data_insight.png'),
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
      window.location.href = 'http://124.71.45.84:8085';//数据库可视化系统的
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
    },
    Click() {
      alert("click")
    }
  }
}
</script>

<style scoped>
.background {
  background: url("../assets/home_page.png") no-repeat;
  background-size: cover;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;
}

</style>