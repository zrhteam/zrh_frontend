<template>
  <div>
    <div style='display: none'>
      {{ getNoRectificationRisk }}
    </div>
    <div class="grid-content bg-purple-light">
      <div class="level4" style="padding-top: 15px">
        <span>项目当前未整改高风险隐患列表</span>
      </div>
    </div>
    <el-table
        :header-cell-style="{color: '#fff'}"
        :data="noRectificationNumber"
        :row-style="{height: '20px'}"
        :cell-style="{padding: '5px'}"
        style="width: 100%; color: #fff"
        max-height="400px">
      <el-table-column
          prop="description"
          label="隐患描述">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Region2_1",
  data() {
    return {
      noRectificationNumber: []
    }
  },
  computed: {
    getNoRectificationRisk() {
      let data = this.$store.state.get_region.no_rectification_risk.note_list;
      //console.log(this.$store.state.get_region.no_rectification_risk.note_list)
      //console.log(data)

      let dataArray = []
      let reg = RegExp(/测试/)
      for (let i in data) {
        let obj = {
          description: ""
        }
        if (!data[i].match(reg)) {
          obj.description = data[i]
          dataArray.push(obj)
        }

      }//for

      console.log(dataArray)
      this.noRectificationNumber = dataArray
    },
  },
  mounted() {
    this.timer = setInterval(this.updateTable, 1000);
  },
  methods: {
    updateTable() {
      let first = this.noRectificationNumber[0];
      this.noRectificationNumber.shift();
      this.noRectificationNumber.push(first);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
}
</script>

<style scoped>
/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell {
  background-color: transparent;
}

/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent;
}
</style>