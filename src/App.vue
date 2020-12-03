<template>
    <div id="app">
        <!-- <div id="nav">
            <router-link to="/home">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div> -->
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
      return {
        userName: '',
        isLogin: this.$cookies.isKey("status")
      }
  },
  created(){
      if(this.$cookies.isKey("status") === true){
         this.isLogin = true
      }
  },
  methods: {
  }
}

</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.boundary {
  border: dashed #00ffc4 1px;
  border-width: 1px;
}

.boundary-B {
  border: dashed #4363ce 1px;
  border-width: 1px;
}

.boundary-C {
  border: dashed #58ce43 1px;
  border-width: 1px;
}
</style>
