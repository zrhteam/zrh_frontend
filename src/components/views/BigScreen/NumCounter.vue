<template>
  <div class="number-grow-warp">
    <span ref="numberGrow" :data-time="time" class="number-grow">0</span>
  </div>
</template>

<script>
export default {
  name: "NumCounter",
  props: {
    time: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      timer: null
    }
  },
  mounted() {
     this.timer = setInterval(() => {
      this.numberGrow(this.$refs.numberGrow)
    }, 10000);
  },
  methods: {
    numberGrow(ele) {
      let step = parseInt((this.value) / (this.time * 50))
      let current = 0
      let start = 0
      this.timer = setInterval(() => {
        start += step + 3
        if (start >= this.value) {
          clearInterval(t)
          start = this.value
          t = null
        }
        if (current === start) {
          return
        }
        current = start
        ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
      }, 50)
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>

</style>