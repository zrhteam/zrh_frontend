<template>
  <el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div>
            <span>所有项目未整改高风险隐患图片</span>
          </div>
          <div>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <!--                  图片1-->
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <!--                  图片2-->
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
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
  </el-row>
</template>

<script>
export default {
  name: "LandHeadquarter3",
  data() {
    return {
      tableData: [{
        description: '2016-05-02'
      }, {
        description: '2016-05-04'
      }, {
        description: '2016-05-06'
      }],
      timer: ''
    }
  },
  mounted() {
    this.timer = setInterval(this.updateTable, 1000);
  },
  methods: {
    updateTable() {
      let first = this.tableData[0];
      this.tableData.shift();
      this.tableData.push(first);
    },

  },
  beforeDestroy() {
      clearInterval(this.timer);
    }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

#subtitle {
  text-align: left;
}
</style>