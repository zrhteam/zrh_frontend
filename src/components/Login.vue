<template>
  <div class="main">

    <div class="header">
      <!--      <div class="header-center fl">-->
      <!--      <div class="header-title">-->
      <!--        登录界面-->
      <!--      </div>-->
      <!--      <div class="header-title" v-show="isShow">-->
      <!--        登录界面-->
      <!--      </div>-->
      <!--      <div class="header-title" v-show="!isShow">-->
      <!--        注册界面-->
      <!--      </div>-->
      <div class="header-img"></div>
      <div class="header-bottom fl"></div>

    </div>

    <div class="content">
      <div class="content-left">
      </div>
      <div class="content-right">
        <div class="right-infp">
          <div class="right-infp-name">
            <span style="float: left; font-size: 24px; color: #05e2ec">登录</span>
          </div>
          <div class="right-infp-name">
            <el-input prefix-icon="el-icon-my-user" class="username" type="text" name="username" v-model="username"
                      placeholder="请输入用户名" maxlength="12" required=""
                      value=""></el-input>
          </div>
          <div class="right-infp-name">
            <el-input prefix-icon="el-icon-clock" class="password" type="password" name="password" v-model="password"
                      placeholder="请输入用户密码" autocomplete="off"></el-input>
          </div>
          <div class="right-infp-name" style="line-height: 0.8rem; vertical: middle">
            <el-checkbox v-model="checked" style="float: left">记住密码</el-checkbox>
            <button class="pwd_btn" type="text" @click="forgetPsw">忘记密码</button>
          </div>

          <div class="right-infp-login">
            <!--            <button class="btn" v-show="isShow" @click="hasGrantLogin">登录</button>-->
            <!--            <button class="btn" v-show="!isShow">注册</button>-->
            <el-button class="btn" @click="hasGrantLogin" style="color: #0a447b">登录</el-button>
          </div>
          <div class="bottom">
            <!--            <el-button class="register_btn" type="text" v-show="isShow" @click="jumpToLogin">注册</el-button>-->
            <!--            <el-button class="register_btn" type="text" v-show="!isShow" @click="jumpToLogin">登录</el-button>-->

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      // isShow: true,
      username: '',
      password: '',
      checked: false
    }
  },
  methods: {
    login() {


      // this.$router.push({path: '/region_department'});
      // axios.post(`http://localhost:5000/api/login`, params)
      //     .then((response) => {
      //       var jsonObj = JSON.parse(JSON.stringify(response));
      //       console.log(JSON.stringify(jsonObj));
      //       console.log(response);
      //       if (parseInt(response.data.code) === 200) {//如果成功了
      //         this.$cookies.remove('username'),
      //             this.$cookies.remove('password'),
      //             this.$cookies.set("username", this.username, 30 * 60);
      //         this.$cookies.set("password", this.password, 30 * 60);
      //         this.$cookies.set("status", "logined", 30 * 60); // 设置cookie中存放的生命周期
      //         let redirect = decodeURIComponent(
      //             this.$route.query.redirect || "/search_module"
      //         );
      //         if (!redirect) {
      //           redirect = '/login'
      //         }
      //         this.$router.push({path: redirect});
      //         //alert(response.data.msg)
      //         //window.location.href = 'http://localhost:5000/home'
      //       } else {
      //         alert(response.data.msg)
      //       }
      //     }).catch(function (error) {
      //   console.log(error.response)
      // })
    },
    // jumpToLogin() {
    //   console.log("in jumpToLogin")
    //   this.isShow = !this.isShow
    // },
    hasGrantLogin() {
      let params = new URLSearchParams();
      params.append('username', this.username);
      params.append('password', this.password);
      let _this = this
      this.$store.commit('get_login/changeParams', {params: params})
      this.$store.commit('get_login/changeUserName', {data: _this.username})
      // this.$store.state.get_login.params = params
      this.$store.dispatch('get_login/getLoginGrant')
      // //在页面加载时读取sessionStorage里的状态信息
      // sessionStorage.getItem("userMsg") && this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("userMsg"))));
      // //在页面刷新时将vuex里的信息保存到sessionStorage里
      // window.addEventListener("beforeunload", () => {
      //   sessionStorage.setItem("userMsg", JSON.stringify(this.$store.state))
      // })
      this.$store.commit('get_login/changeNameParam', {params: _this.username})
      //  得到隐患描述的筛选条件
      this.$store.dispatch('get_login/getDangerSelection')
      //判断复选框是否被勾选 勾选则调用配置cookie方法
      if (_this.checked == true) {
        //传入账号名，密码，和保存天数3个参数
        _this.setCookie(_this.username, _this.password, 7);
      } else {
        //清空Cookie
        _this.clearCookie();
      }
    },
    forgetPsw() {
      this.$alert('忘记密码，请联系管理员XX，联系方式：XXX XXXX XXXX', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      })
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('='); //再次切割
          //判断查找相对应的值
          if (arr2[0] == 'userName') {
            this.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == 'userPwd') {
            this.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function () {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  },
  computed: {
    //得到对应权限
    grantData() {
      return this.$store.state.get_login.grant_data
      // console.log(this.dataset)
    }
  },
  watch: {
    grantData(data) {
      // console.log('grantData', data)
      if (data.code == 10000) {
        //项目级权限
        if (data.data.user_grant == '项目') {
          this.$store.commit('get_project/changePrjName', {prj_name: this.$store.state.get_login.grant_data.data.project_tag})
          this.$store.commit('get_region/changeRegionName', {region_name: this.$store.state.get_login.grant_data.data.region_tag})
          this.$store.commit('get_headquarter/changeHeadName', {head_name: this.$store.state.get_login.grant_data.data.headquarter_tag})
          this.$router.push({path: '/prj_data_analysis'});
          let data = {
            label: this.$store.state.get_login.grant_data.data.project_tag
          }
          let node = {
            level: 3
          }
          this.handleTreeNodeClick(data, node)
          // this.$router.push({path: '/register'});
        }// 区域级权限
        else if (data.data.user_grant == '区域') {
          this.$store.commit('get_region/changeRegionName', {region_name: this.$store.state.get_login.grant_data.data.region_tag})
          this.$store.commit('get_headquarter/changeHeadName', {head_name: this.$store.state.get_login.grant_data.data.headquarter_tag})
          this.$router.push({path: '/region_department'});
          let data = {
            label: this.$store.state.get_login.grant_data.data.region_tag
          }
          let node = {
            level: 2
          }
          this.handleTreeNodeClick(data, node)
        }// 总部级权限
        else if (data.data.user_grant == '总部') {
          this.$store.commit('get_headquarter/changeHeadName', {head_name: this.$store.state.get_login.grant_data.data.headquarter_tag})
          this.$router.push({path: '/land_headquarters'});
          let data = {
            label: this.$store.state.get_login.grant_data.data.headquarter_tag
          }
          let node = {
            level: 1
          }
          // this.$router.push({path: '/land_headquarters'});
          this.handleTreeNodeClick(data, node)
          // this.$router.push({path: '/register'});
        }// 超级用户权限
        else if (data.data.user_grant == '超级用户') {
          this.$router.push({path: '/super_overview'});
          // this.$router.push({path: '/data_compare'});
          // this.$router.push({path: '/analyze'});
        }
      } else {
        alert("用户名或密码错误")
      }

    }
  },
  mounted() {
    this.getCookie();
  },
  created() {
    // this.username = 'headquarter1';
    // this.username = 'region1';
    // this.username = 'project1';
    // this.password = '123456';
    // this.username = 'boss';
    // this.password = 'iamboss';
    $(document).ready(function () {
      var whei = $(window).width()
      $("html").css({fontSize: whei / 24});
      $(window).resize(function () {
        var whei = $(window).width();
        $("html").css({fontSize: whei / 24})
      });
    });
    //在页面加载时读取sessionStorage里的状态信息
    sessionStorage.getItem("userMsg") && this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("userMsg"))));
    window.addEventListener("beforeunload", () => {
      sessionStorage.clear();
    })
  },
  destroyed() {
    window.removeEventListener("beforeunload", () => {
      sessionStorage.clear();
    })
  }
}
</script>

<style scoped>
/*#login {*/
/*  text-align: left;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*}*/

.main {
  background: url("../assets/login_bg.png") no-repeat;
  background-size: cover;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;
}

.header {
  padding-top: 50px;
  width: 100%;
  height: 1.5rem;
}

.header {
  width: 50%;
  height: 2.2rem;
  position: relative;
  margin: 0 auto;
}

.header .header-title {
  text-align: center;
  color: #ffffff;
  font-size: .4rem;
  text-shadow: 0 0 .3rem #00d8ff;
  line-height: 2.25rem;
}

/*.header .header-img {*/
/*  background: url("../assets/login_head.gif") no-repeat center center;*/
/*  background-size: 100%;*/
/*  height: 100%;*/
/*  width: 100%;*/
/*  position: absolute;*/
/*  top: .8rem;*/
/*}*/

.content {
  width: 14rem;
  height: 8rem;
  /*background: green;*/
  margin: 1rem auto 0 auto;
  /*border: 1px solid green;*/
}

.content .content-left {
  width: 6.2rem;
  height: 6.2rem;
  /*border: 1px solid red;*/
  /*background: url("../assets/login_aaa.png") no-repeat;*/
  background-size: 100% 100%;
  padding: 0.4rem 0;
  box-sizing: border-box;
  margin-right: 2%;
  float: left;
  z-index: -99;
  opacity: 0.7;
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

.content .content-left {
  -webkit-transform: rotate(360deg);
  animation: rotation 15s linear infinite;
  -moz-animation: rotation 15s linear infinite;
  -webkit-animation: rotation 15s linear infinite;
  -o-animation: rotation 15s linear infinite;
}

.content .content-right {
  width: 6.8rem;
  height: 5.8rem;
  /*background: url("../assets/login_e.png") no-repeat;*/
  background-size: 100% 100%;
  float: right;
  position: relative;

}

.right-infp {
  width: 4rem;
  height: 5rem;
  margin: auto auto;
  /* border: 1px solid red;*/
  vertical-align: center;
  position: absolute;
  top: 1rem;
  left: 0.9rem;
}

.right-infp-name {
  /*background: url("../assets/login_b.png") no-repeat;*/
  width: 100%;
  /*height: 0.5rem;*/
  /*background-size: 100% 100%;*/
  line-height: 0.45rem;
  margin-bottom: 0.1rem;
  position: relative;
  vertical-align: center;
}

.right-infp-name input {
  width: 85%;
  /*border: none;*/
  /*border-color: #0e62c3;*/
  box-sizing: border-box;
  height: 0.5rem;
  margin-left: 2.5rem;
  line-height: 0.4rem;
  background: none !important;
  color: #00eaff;
  padding-left: 2.15rem;
  /*box-shadow: 0 0 1px #00eaff;*/
  outline: none;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  position: absolute;
  display: block;
  margin-right: auto;
  text-align: center;
}

.right-infp-name .password {
  background: url("../assets/login_lock.png") left center no-repeat;
  background-size: 0.4rem;
}

.right-infp-name .username {
  background: url("../assets/login_user.png") left center no-repeat;
  background-size: 0.4rem;
}

el-input::-webkit-input-placeholder {
  color: #1072b5 !important;
}

/deep/ input::-webkit-input-placeholder {
  color: #1072b5 !important;
  -webkit-text-fill-color: #1072b5 !important;
}

.right-infp-login .btn {
  width: 95%;
  border: none;
  box-sizing: border-box;
  height: 0.45rem;
  margin-left: 0.1rem;
  font-size: 0.22rem;
  cursor: pointer;
  background: none;
  outline: none;
  color: #fff;
  position: relative;
  display: block;
  margin-right: auto;
}

.bottom {
  width: 100%;
  height: 0.5rem;
}

.pwd_btn {
  line-height: 19px;
  background: none !important;
  color: #1072b5;
  /*box-shadow: 0 0 1px #00eaff;*/
  outline: none;
  /*-webkit-tap-highlight-color:rgba(255,0,0,0);*/
  float: right;
  display: block;
  margin-right: auto;
  vertical-align: middle;
  height: 0.8rem;
  border: none;
}

.el-button {
  width: 100% !important;
  height: 0.45rem !important;
  background: #1adcff !important;
  border: none;
  margin-left: 0px !important;
}

.el-input--prefix >>> .el-input__inner {
  border-color: #0e5ca0 !important;
  border: 2px solid;
}

.el-input >>> .el-input__inner {
  color: #1072b5 !important;
}

/deep/ .el-checkbox__inner {
  border-radius: 0;
  background-color: transparent;
  border-color: #1072b5;
}

/deep/ .el-checkbox {
  color: #1072b5;
}

/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #18bff0;
}

/deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #18bff0;
  border-color: #18bff0;
}


</style>