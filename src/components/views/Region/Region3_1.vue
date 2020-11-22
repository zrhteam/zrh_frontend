<template>
  <div>
    <div style="display: none">
      {{ getRiskNumberTop }}
    </div>
    <div class="grid-content bg-purple-light">
      <div id="subtitle1">
        <span>项目累计出现隐患前十条</span>
      </div>
      <div>
        <el-table
            :data="riskNumberTop"
            stripe
            style="width: 100%">
          <el-table-column
              prop="description"
              label="隐患描述"
              width='550'>
          </el-table-column>
          <el-table-column
              prop="num"
              label="出现次数">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
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
  methods: {
    getRiskNumberTop() {
      let data = this.$store.state.get_region.risk_number_top;
      console.log(this.$store.state.get_region.risk_number_top)
      console.log(data)

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
      }
      //按出现次数降序
      dataArray.sort(sortNumber('num', false))
      console.log(dataArray)
      this.riskNumberTop = dataArray
    }
  }
}
</script>

<style scoped>

</style>