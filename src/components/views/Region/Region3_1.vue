<template>
  <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 49%; margin: 0px 5px 5px 5px">
    <div style="display: none">
      {{ getRiskNumberTop }}
    </div>
    <div class="grid-content bg-purple-light">
      <div id="subtitle1" class="level4" style="padding-top: 15px">
        <span>项目累计出现隐患前十条</span>
      </div>
      <div>
        <el-table
            :header-cell-style="{color: '#fff'}"
            :data="riskNumberTop"
            :row-style="{height: '20px'}"
            :cell-style="{padding: '5px'}"
            style="width: 100%; color: #fff">
          <el-table-column
              prop="description"
              label="隐患描述"
              width='500'>
          </el-table-column>
          <el-table-column
              prop="num"
              label="出现次数">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-card>
</template>

<script>
function sortNumber(attr, rev) {
  //默认升序排序
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
}
export default {
  name: "Region3_1",
  data() {
    return {
      riskNumberTop: [],
    }
  },
    mounted() {
    this.timer =setInterval(this.updateTable, 1000);
  },
  computed: {
    getRiskNumberTop() {
      let data = this.$store.state.get_region.risk_number_top;
      //console.log('the front end data:', this.$store.state.get_region.risk_number_top)
      //console.log(data)

      let dataArray = []
      for (let i in data) {
        let obj = {
          description: ' ',
          num: 0
        }
        //console.log(i)
        obj.description = i;
        obj.num = data[i]['appear_time']
        dataArray.push(obj)
      }//for
      //按出现次数降序
      dataArray.sort(sortNumber('num', false))
      console.log(dataArray)
      this.riskNumberTop = dataArray
    }
  },
  methods: {
    updateTable(){
      let first = this.riskNumberTop[0];
      this.riskNumberTop.shift();
      this.riskNumberTop.push(first);
    },
    beforeDestroy(){
      clearInterval(this.timer);
    },
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