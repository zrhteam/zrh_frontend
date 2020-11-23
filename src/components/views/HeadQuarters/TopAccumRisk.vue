<template>
  <div>
    <div style="display: none">
      {{ getNumberTop }}
    </div>
    <div class="grid-content bg-purple-light">
      <div id="subtitle" class="level4">
        <span>所有项目累计重复出现隐患前十名</span>
      </div>
      <div><!--            stripe-->
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              prop="description"
              label="隐患描述">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopAccumRisk",
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
/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell{

  background-color: transparent;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {

  background-color: transparent;
}

</style>