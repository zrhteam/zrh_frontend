<template>
  <div>
    <div>
      <span>{{ context.title }}</span>
    </div>
    <div id="bar_chart">
      <!--        占比（可筛选专业）柱状图-->

    </div>
  </div>
</template>

<script>

export default {
  name: "RiskProjPercentage",
  props: ['context'],
  methods: {

  },
  mounted() {
    this.getM()
    // console.log(this.props)
  }
}
</script>

<style scoped>

</style>