<template>
  <div class="grid-content bg-purple">
    <div class="level4" style="padding-top: 15px; padding-bottom: 15px">
      <span>所有项目未整改高风险隐患图片</span>
      <div style="display: none">
        {{ getImage }}
      </div>
    </div>
    <div>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="demo-image__placeholder">
              <div class="block">
                <img src="images0" id="img0" style="width: 100%; height: 100%"/>
              </div>
            </div>
            <!--                  <div class="login-center-img"><img src="images0"/></div>-->
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <!--                  图片2-->
            <div class="demo-image__placeholder">
              <div class="block">
                <img src="images1" id="img1" style="width: 100%; height: 100%"/>
              </div>
            </div>
            <!--                  <div class="login-center-img"><img src="images1" id="img1"/></div>-->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "HighRiskImages",
  data() {
    return {
      images0: '',
      images1: '',
      tableData: [],
      timer: ''
    }
  },
  mounted() {
    this.timer = setInterval(this.updateTable, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    getImage() {
      let data = this.$store.state.get_headquarter.images;
      let count = 0
      for (let i in data) {
        for (let j in data[i]) {
          if (count >= 2) {
            break
          }
          if (count == 0) {
            document.getElementById('img0').src = 'http://' + data[i][j]
            // this.images0 = 'http://' + data[i][j]
          }
          if (count == 1) {
            document.getElementById('img1').src = 'http://' + data[i][j]
            // this.images1 = 'http://' + data[i][j]
          }
          count++
        }
      }
      console.log(this.images0)
    },
    //得到所有项目中出现隐患数量排名前10的隐患
    getNumberTop() {
      let data = this.$store.state.get_headquarter.hidden_danger;
      console.log(this.$store.state.get_headquarter.hidden_danger)
      console.log(data)
      //  风险等级对应情况
      //  1：低风险； 2：中风险； 3：高风险
      let dataArray = []
      for (let i in data) {
        let obj = {
          description: ''
        }
        obj.description = i
        dataArray.push(obj)
      }
      console.log(dataArray)
      this.tableData = dataArray
    }
  },
  methods: {
    updateTable() {
      let first = this.tableData[0];
      this.tableData.shift();
      this.tableData.push(first);
    },
  },
  created() {
    // this.$store.dispatch('get_headquarter/getInitNumberTop')
    this.$store.dispatch('get_headquarter/getInitImage')
  }
}
</script>

<style scoped>

</style>