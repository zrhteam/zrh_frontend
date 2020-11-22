<template>
  <div>
    <div
        style="color: rgb(59, 162, 255); font-family: Avenir; font-weight: normal; font-style: normal; font-size: 21.09px;">
      <span>{{context.val}}</span>
    </div>
    <div class="chart-text-title" style='font-family: "Microsoft YaHei"'>
      <span>{{context.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectIndexView",
  props:['context']
}
</script>

<style scoped>
.chart-text-title {
  color: #000000;
  font-weight: bold;
  font-style: normal;
  line-height: normal;
  font-size: 12px;
}
</style>