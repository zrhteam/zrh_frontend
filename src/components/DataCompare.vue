<template>
  <el-row style="height: 100%">
    <el-col :span="8" style="height: 100%">
      <el-row style="height: 20%">
<!--        <div class="grid-content bg-purple">-->
        <el-col :span="8" style="height: 100%">
          <label style="font-size: 0.2em; vertical-align: middle; display: inline-block">请先选择粒度</label>
        </el-col>
        <el-col :span="16" style="height: 100%">
          <el-radio-group v-model="radio" @change="ClickRadio">
          <el-radio v-model="radio" label="1">总部</el-radio>
          <el-radio v-model="radio" label="2">区域</el-radio>
          <el-radio v-model="radio" label="3">项目</el-radio>
          <el-radio v-model="radio" label="4">检查</el-radio>
            </el-radio-group>
        </el-col>
<!--        </div>-->
      </el-row>
      <el-row style="height: 80%">
        <el-col :span="12" style="height: 100%">
          <el-row style="height: 100%">
            <Tree
                :treeObj="treeObj"
                :show-checkbox="true"
                @handleNodeClick="handleTrNodeClick"
                @handleCheck="handleTrCheck"
                style="height: 100%"></Tree>
          </el-row>
        </el-col>
        <el-col :span="12" style="height: 100%">
          <el-row style="height: 100%">
            <Tree
                :treeObj="treeObj"
                :show-checkbox="true"
                @handleNodeClick="handleTrNodeClick"
                @handleCheck="handleTrCheck"
                style="height: 100%"></Tree>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  <el-col :span="16">
    <div class="grid-content bg-purple-light"></div>
  </el-col>
  </el-row>
</template>

<script>
import Tree from "@/components/views/functions/Tree.vue";

export default {
  name: "DataCompare",
  components: {Tree},
  data() {
    return {
      treeObj: this.$store.state.get_login.grant_data.data.value,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      radio: '1'
    }
  },
  methods: {
    ClickRadio(radio) {
      this.radio = radio
    },
    handleTrNodeClick(data, node) {
    },
    handleTrCheck(a, b, level) {
      // console.log(this.radio)
      // console.log(level)
      if(level > this.radio) {
        this.$message.error('您当前选择的层级与粒度不对应！');
      }
    }
  },
  created() {
    //得到树形控件的内容 还负责封装了地理位置信息
    this.treeObj = this.$store.state.get_login.grant_data.data.value
  }
}
</script>

<style scoped>

</style>