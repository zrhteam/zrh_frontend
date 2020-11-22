<template>
  <div>
    <div style="display: none">
      {{ getPrjNearestPerception }}
    </div>
    <!--          最近一次检查隐患专业占比 饼图-->
    <div>
      <div>
        <span>最近一次检查隐患专业占比</span>
      </div>
      <svg></svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "LastCheckPerc",
  data(){
    return {
      nearest_perception:[]
    }
  },
  methods: {
    getPrjNearestPerception() {
      let data = this.$store.state.get_project.prj_nearest_perception;
      for (let i in data) {
        let obj = {
          major_name: '',
          value: 0
        }
        obj.major_name = i;
        obj.value = data[i]
        this.nearest_perception.push(obj)
      }
      this.drawPie(this.nearest_perception);
    },
  }
}
</script>

<style scoped>

</style>