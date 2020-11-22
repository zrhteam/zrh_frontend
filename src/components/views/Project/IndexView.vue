<!--TODO: 检查一下是不是可以与其他IndexView合并-->
<template>
  <div class="grid-content bg-purple index">
    <div class="index_box">
      <span> {{context.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  props:['context']
}
</script>

<style scoped>

</style>