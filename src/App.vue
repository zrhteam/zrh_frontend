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
  data() {
    return {
      userName: '',
      isLogin: this.$cookies.isKey("status")
    }
  },
  created() {
    if (this.$cookies.isKey("status") === true) {
      this.isLogin = true
    }

    // //在页面加载时读取localStorage里的状态信息
    // sessionStorage.getItem("userMsg") && this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("userMsg"))));
    //
    // //在页面刷新时将vuex里的信息保存到localStorage里
    // window.addEventListener("beforeunload", () => {
    //   sessionStorage.setItem("userMsg", JSON.stringify(this.$store.state))
    // })
    // sessionStorage.getItem("userMsg") && this.$store.replaceState(JSON.parse(sessionStorage.getItem("userMsg")));
  },
  methods: {}
}

</script>

<style>

#app {
  font-family: Noto Sans SC;
  font-style: normal;
  font-weight: 400;
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

body .el-table::before {
    z-index: inherit;
}

.boundary {
  border: 1px dashed #00ffc4;
}

.boundary-B {
  border: 1px dashed #4363ce;
}

.boundary-C {
  border: 1px dashed #58ce43;
}

.el-tree {
  color: white;
}

.el-tree-node__content:hover {
  background-color: #aaaaaa;
}

.el-tree-node:focus > .el-tree-node__content {
  background-color: #969696 !important;
}

</style>
