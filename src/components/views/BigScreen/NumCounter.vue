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
      timer1: null,
      timer2: null
    }
  },
  mounted() {
    this.timer1 = setInterval(() => {
      this.$nextTick(_ => {
        this.numberGrow(this.$refs.numberGrow)
      })
    }, 10000);
  },
  methods: {
    numberGrow(ele) {
        let step = parseInt((this.value) / (this.time * 50))
        let current = 0
        let start = 0
        this.timer2 = setInterval(() => {
          start += step + 3
          if (start >= this.value) {
            clearInterval(this.timer)
            start = this.value
            this.timer = null
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
    clearInterval(this.timer1)
    clearInterval(this.timer2)
  }
}
</script>

<style scoped>

</style>