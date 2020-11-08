<template>
  <div>
    <p>Home page</p>
    <p>Random number from backend: {{ randomNumber }}</p>
    <button @click="getRandom">New random number</button>
    <h3>欢迎{{name}}</h3>
    <a href="/" v-on:click="logout">logout</a>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      randomNumber: 0,
      name: ""
    }
  },
  methods: {
    getRandomInt (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    getRandom () {
      // this.randomNumber = this.getRandomInt(1, 100)
      this.randomNumber = this.getRandomFromBackend()
    },
    getRandomFromBackend () {
      const path = `http://localhost:5000/api/random`
      axios.get(path)
      .then(response => {
        console.log(response)
        this.randomNumber = response.data.randomNumber
      })
      .catch(error => {
        console.log(error)
      })
    },
    logout () {
        delCookie("username")
        this.$router.push("/")
    }
  },
  mounted () {
    let uname = getCookie("username")
    this.name = uname
    if(uname == ""){
        this.$router.push("/")
    }
  },
  created () {
    this.getRandom()
  }
}
</script>
