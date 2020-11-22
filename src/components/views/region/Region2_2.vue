<template>
  <div>
    <div class="grid-content bg-purple">
      <div>
        <span>未整改高风险隐患图片</span>
      </div>
    </div>
    <div class="grid-content bg-purple">
      <div class='demo-image__placeholder'>
        <div class='block'>
          <img src='images' id='img' style='width: 400px; height: 400px'>
        </div>
      </div>
    </div>
    <div style="display: none">
      {{ getImage }}
    </div>
  </div>

</template>

<script>
export default {
  name: "Region2_2",
  computed: {
    getImage() {
      let data = this.$store.state.get_region.images;
      let count = 0;
      // document.getElementById('img').src = 'http://' + data[0][0]
      for (let i in data) {
        for (let j in data[i]) {
          if (count > 0) {
            break
          }
          if (count == 0) {
            document.getElementById('img').src = 'http://' + data[i][j]
            this.images = 'http://' + data[i][j]//存在的问题是，会把所有图片都显示在上面，要改成轮播形式
          }
          count++
        }
      }
      console.log(this.images)
    },
  }
}
</script>

<style scoped>

</style>