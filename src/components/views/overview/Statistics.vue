<template>
  <div style="height: 80%; width: 20%; background-color: #125db3">

  </div>
</template>

<script>

export default {
  name: "d",
  data() {
    return {
      form: {
        cust_name: '宋城壹号',
        ctr_name: '宋城壹号',
        project_name: '宋城壹号01',
        search_name: '宋城壹号'

      },
      level: '项目层级',
    }
  },
  watch: {
    level(val) {

    }
  },
  methods: {},
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

.el-aside {
  color: #333;
  text-align: left;
}

.box {
  box-shadow: 0 2px 4px rgba(80, 30, 30, 0.12), 0 0 6px rgba(123, 31, 31, 0.04);

}
</style>