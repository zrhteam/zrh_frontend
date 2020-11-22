<template>
  <div>
    <div style='display: none'>
      {{ getNoRectificationRisk }}
    </div>
    <div class="grid-content bg-purple-light">
      <div class="text list">
        <span>项目当前未整改高风险隐患列表</span>
      </div>
    </div>
    <el-table
        :data="noRectificationNumber"
        style="width: 100%"
        max-height="400">
      <el-table-column
          prop="description"
          label="隐患描述"
          width="550">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Region2_1",
  data() {
    return {
      noRectificationNumber: [],
    }
  },
  computed: {
    getNoRectificationRisk() {
      let data = this.$store.state.get_region.no_rectification_risk.note_list;
      console.log(this.$store.state.get_region.no_rectification_risk.note_list)
      console.log(data)

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
  }
}
</script>

<style scoped>

</style>