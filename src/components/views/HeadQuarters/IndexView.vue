<template>
  <div class="grid-content bg-purple boundary-C">
    <div class="chart-text-title">
      <span>{{context.title}}</span>
    </div>
  </div>
</template>
<!--消防危险指数-->
<!--电梯危险指数-->
<!--电气危险指数-->
<!--燃气危险指数-->
<script>
export default {
  name: "IndexView",
  props:['context'],
  mounted(){
    console.log('this.context', this.context);
  }
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