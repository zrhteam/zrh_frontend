<template>
  <el-row>
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <div>
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
                    <img src="images0" id="img0" style="width: 500px; height: 500px"/>
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
                    <img src="images1" id="img1" style="width: 500px; height: 500px"/>
                  </div>
                </div>
                <!--                  <div class="login-center-img"><img src="images1" id="img1"/></div>-->
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div style="display: none">
        {{ getNumberTop }}
      </div>
      <div class="grid-content bg-purple-light">
        <div id="subtitle">
          <span>所有项目累计重复出现隐患前十名</span>
        </div>
        <div>
          <el-table
              :data="tableData"
              stripe
              style="width: 100%">
            <el-table-column
                prop="description"
                label="隐患描述">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: "LandHeadquarter3",
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
    this.$store.dispatch('get_headquarter/getInitNumberTop')
    this.$store.dispatch('get_headquarter/getInitImage')
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

#subtitle {
  text-align: left;
}
</style>