<template>
<el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 49%; margin: 0px 5px 5px 5px">
    <div style="display: none">
      {{ getPrjRiskTop }}
    </div>
    <div class="level4" style="padding-top: 0px; padding-bottom: 10px; padding-left: 10px">
      <span>历次重复出现隐患排名</span>
    </div>
    <div>

      <el-table
          :header-cell-style="{color: '#fff'}"
          :data="riskTop"
          :row-style="{height: '20px'}"
          :cell-style="{padding: '0px'}"
          style="width: 100%; height: 100%; color: #fff">
        <el-table-column
            label="序号" type = 'index'>
<!--            type="index">-->
<!--          <span>{{scope.$index}} </span>-->
        </el-table-column>
        <el-table-column
            property="description"
            label="隐患描述" width="100%">
        </el-table-column>
        <el-table-column
            prop="major"
            label="所属专业">
        </el-table-column>
        <el-table-column
            prop="frequency"
            label="出现频率">
        </el-table-column>
      </el-table>
    </div>
<!--    <dv-scroll-board :config="config" style="width: 100%; height: 100%"/>-->
  </el-card>
</template>

<script>
export default {
name: "CheckRiskTop",
  data() {
    return {
      riskTop: [],
      timer: ''
    }
  },
  computed: {
    getPrjRiskTop() {
      let data = this.$store.state.get_check.check_risk_top
      let dataArray = []
      for (let i in data) {
        let obj = {
          description: '隐患描述',
          major: '所属专业',
          frequency: 0
        }
        obj.description = i
        obj.major = data[i].belonged_major
        obj.frequency = data[i].appear_time
        dataArray.push(obj)
      }
      dataArray.sort(this.sortNumber('frequency', false))
      this.riskTop = dataArray
      // console.log(dataArray)
      //this.config = dataArray
      // let nowData = this.config
      // nowData = {data: dataArray}
      // this.config = {...nowData}
      // this.config = {data: dataArray, header: ['隐患描述', '所属专业', '出现频率'], index: true, align: ['center']}

    }
  },
  mounted() {
    this.timer = setInterval(this.updateTable, 1000);
  },
  methods: {
    sortNumber(attr, rev) {
      if (rev == undefined) {
        rev = 1;
      } else {
          rev = (rev) ? 1 : -1;
        }

      return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      }
    },
    updateTable(){
      let first = this.riskTop[0];
      this.riskTop.shift();
      this.riskTop.push(first);
    },
    beforeDestroy(){
      clearInterval(this.timer);
    }
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