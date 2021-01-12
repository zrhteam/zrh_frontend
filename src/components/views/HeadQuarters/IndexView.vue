<template>
  <div class="grid-content bg-purple index boundary-C">
    <div class="index_box" >
      <span class="level11">{{context.title}}</span>
      <div style="padding-top: 10px">
        <span class="level9">23</span>
      </div>
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
    // console.log('this.context', this.context);
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

.index {
  padding-right: 5px;
  /*background-color: #39415e;*/
  /*width: 80%;*/
  height: 200px;
}

.index_box {
  padding-top: 50px;
}

.level11 {
  font-size: 19px;
  font-family: "Microsoft YaHei";
  color: #ffffff;
}

.level9 {
  font-size: 29px;
  font-family: Avenir;
  color: #ffffff;
}
</style>