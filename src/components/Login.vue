<template>
  <!--	<div id="login">-->
  <!--		<div id="loginForm">-->
  <!--			<div class="login">-->
  <!--				<div class="login-top">-->
  <!--					登录-->
  <!--				</div>-->
  <!--				<div class="login-center clearfix">-->
  <!--					<div class="login-center-img"><img src="../assets/name.png" /></div>-->
  <!--					<div class="login-center-input">-->
  <!--						<input id="username" type="text" name="username" v-model="username" placeholder="请输入您的用户名" onfocus="this.placeholder=''" onblur="this.placeholder='请输入您的用户名'" />-->
  <!--						<div class="login-center-input-text">用户名</div>-->
  <!--					</div>-->
  <!--				</div>-->
  <!--				<div class="login-center clearfix">-->
  <!--					<div class="login-center-img"><img src="../assets/password.png" /></div>-->
  <!--					<div class="login-center-input">-->
  <!--						<input id="password" type="password" name="password" v-model="password" placeholder="请输入您的密码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入您的密码'" />-->
  <!--						<div class="login-center-input-text">密码</div>-->
  <!--					</div>-->
  <!--				</div>-->
  <!--				<div id="loginBtn" class="login-button" @click="login">-->
  <!--					登录-->
  <!--				</div>-->
  <!--			</div>-->
  <!--		</div>-->
  <!--		<Particles></Particles>-->
  <!--	</div>-->
  <div class="main">

    <div class="header">
      <!--      <div class="header-center fl">-->
      <div class="header-title" v-show="isShow">
        登录界面
      </div>
      <div class="header-title" v-show="!isShow">
        注册界面
      </div>
      <div class="header-img"></div>
      <div class="header-bottom fl"></div>

    </div>

    <div class="content">
      <div class="content-left">
      </div>
      <div class="content-right">
        <div class="right-infp">
          <div class="right-infp-name">
            <input type="text" name="username" v-model="username" placeholder="请输入用户名" maxlength="12" required=""
                   value="">
          </div>
          <div class="right-infp-name">
            <input type="password" name="password" v-model="password" placeholder="请输入密码" autocomplete="off">
          </div>

          <div class="right-infp-btn">
            <button class="btn" v-show="isShow" @click="hasGrantLogin">登录</button>
            <button class="btn" v-show="!isShow">注册</button>
          </div>
          <div class="bottom">
            <el-button class="register_btn" type="text" v-show="isShow" @click="jumpToLogin">注册</el-button>
            <el-button class="register_btn" type="text" v-show="!isShow" @click="jumpToLogin">登录</el-button>
            <el-button class="pwd_btn" type="text" v-show="isShow">忘记密码</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import particlesJs from '../components/particles/Particles.vue'

export default {
  name: 'Login',
  components: {
    Particles: particlesJs
  },
  data() {
    return {
      isShow: true,
      username: '',
      password: ''
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
    jumpToLogin() {
      console.log("in jumpToLogin")
      this.isShow = !this.isShow
    },
    hasGrantLogin() {
      let params = new URLSearchParams();
      params.append('username', this.username);
      params.append('password', this.password);
      this.$store.commit('get_login/changeParams',{params: params})
      // this.$store.state.get_login.params = params
      this.$store.dispatch('get_login/getLoginGrant')
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
          this.$router.push({path: '/prj_data_analysis'});
          // this.$router.push({path: '/register'});
        }// 区域级权限
        else if (data.data.user_grant == '区域') {
          this.$router.push({path: '/region_department'});
        }// 总部级权限
        else if (data.data.user_grant == '总部') {
          this.$router.push({path: '/land_headquarters'});
          // this.$router.push({path: '/register'});
        }// 超级用户权限
        else if (data.data.user_grant == '超级用户') {
          this.$router.push({path: '/land_headquarters'});
        }
      }else {
        alert("出错了")
      }

    }
  },
  created() {
    // this.username = 'headquarter1';
    // this.username = 'region1';
    this.username = 'project1';
    this.password = '123456';
    $(document).ready(function () {
      var whei = $(window).width()
      $("html").css({fontSize: whei / 24});
      $(window).resize(function () {
        var whei = $(window).width();
        $("html").css({fontSize: whei / 24})
      });
    });
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
  background: url("../assets/login_bg.jpg") no-repeat;
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
  height: 1.2rem;
  position: relative;
  margin: 0 auto;
}

.header .header-title {
  text-align: center;
  color: #ffffff;
  font-size: .4rem;
  text-shadow: 0 0 .3rem #00d8ff;
  line-height: 1.05rem;
}

.header .header-img {
  background: url("../assets/login_head.gif") no-repeat center center;
  background-size: 100%;
  height: 100%;
  width: 100%;
  position: absolute;
  top: .8rem;
}

.content {
  width: 12rem;
  height: 7rem;
  /*background: green;*/
  margin: 1rem auto 0 auto;
  /*border: 1px solid green;*/
}

.content .content-left {
  width: 6.2rem;
  height: 5.8rem;
  /*border: 1px solid red;*/
  background: url("../assets/login_d.png") no-repeat;
  background-size: 100% 100%;
  padding: 0.4rem 0;
  box-sizing: border-box;
  margin-right: 2%;
  float: left;
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
  width: 5.4rem;
  height: 5.8rem;
  background: url("../assets/login_e.png") no-repeat;
  background-size: 100% 100%;
  float: right;
  position: relative;

}

.right-infp {
  width: 4rem;
  height: 3rem;
  margin: auto auto;
  /* border: 1px solid red;*/
  vertical-align: center;
  position: absolute;
  top: 1.6rem;
  left: 0.9rem;
}

.right-infp-name {
  background: url("../assets/login_b.png") no-repeat;
  width: 100%;
  height: 0.5rem;
  background-size: 100% 100%;
  line-height: 0.45rem;
  margin-bottom: 0.4rem;
  position: relative;
}

.right-infp-name input {
  width: 85%;
  border: none;
  box-sizing: border-box;
  height: 0.5rem;
  margin-left: 0.5rem;
  line-height: 0.4rem;
  background: none !important;
  color: #00eaff;
  padding-left: 0.15rem;
  /*box-shadow: 0 0 1px #00eaff;*/
  outline: none;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  position: absolute;
  display: block;
  margin-right: auto;
}

input::-webkit-input-placeholder {
  color: #ccc;
}

.right-infp-btn {
  background: url("../assets/login_a.png") no-repeat;
  width: 100%;
  height: 0.5rem;
  background-size: 100% 100%;
  line-height: 0.5rem;
  margin-bottom: 0.4rem;
  position: relative;
}

.right-infp-btn .btn {
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
  position: absolute;
  display: block;
  margin-right: auto;
}

.bottom {
  width: 100%;
  height: 0.5rem;
}

.register_btn {
  line-height: 0.3rem;
  background: none !important;
  color: #ffffff;
  /*box-shadow: 0 0 1px #00eaff;*/
  outline: none;
  /*-webkit-tap-highlight-color:rgba(255,0,0,0);*/
  position: absolute;
  display: block;
  margin-left: 0px;
  margin-right: auto;
}

.pwd_btn {
  line-height: 0.3rem;
  background: none !important;
  color: #ffffff;
  /*box-shadow: 0 0 1px #00eaff;*/
  outline: none;
  /*-webkit-tap-highlight-color:rgba(255,0,0,0);*/
  float: right;
  display: block;
  margin-right: auto;

}
</style>