<template>
	<div id="login">
		<div id="loginForm">
			<div class="login">
				<div class="login-top">
					登录
				</div>
				<div class="login-center clearfix">
					<div class="login-center-img"><img src="../assets/name.png" /></div>
					<div class="login-center-input">
						<input id="username" type="text" name="username" v-model="username" placeholder="请输入您的用户名" onfocus="this.placeholder=''" onblur="this.placeholder='请输入您的用户名'" />
						<div class="login-center-input-text">用户名</div>
					</div>
				</div>
				<div class="login-center clearfix">
					<div class="login-center-img"><img src="../assets/password.png" /></div>
					<div class="login-center-input">
						<input id="password" type="password" name="password" v-model="password" placeholder="请输入您的密码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入您的密码'" />
						<div class="login-center-input-text">密码</div>
					</div>
				</div>
				<div id="loginBtn" class="login-button" @click="login">
					登录
				</div>
			</div>
		</div>
		<Particles></Particles>
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
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                let params = new URLSearchParams();
                params.append('username', this.username);
                params.append('password', this.password);
                axios.post(`http://localhost:5000/api/login`, params)
                    .then((response) => {debugger
                    var jsonObj = JSON.parse(JSON.stringify(response));
                    console.log(JSON.stringify(jsonObj));
                    console.log(response);
                    if(parseInt(response.data.code) === 200){//如果成功了
                        this.$cookies.remove('username'),
                        this.$cookies.remove('password'),
                        this.$cookies.set("username", this.username, 30 * 60);
                        this.$cookies.set("password", this.password, 30 * 60);
                        this.$cookies.set("status", "logined", 30 * 60); // 设置cookie中存放的生命周期
                        let redirect = decodeURIComponent(
                            this.$route.query.redirect || "/search_module"
                        );
                        if(!redirect){
                            redirect = '/login'
                        }
                        this.$router.push({path: redirect});
                        //alert(response.data.msg)
                        //window.location.href = 'http://localhost:5000/home'
                    }else {
                        alert(response.data.msg)
                    }
                    }).catch(function (error) {
                        console.log(error.response)
                    })
            }
        },
        created() {
            this.username = '';
            this.password = '';
        }
    }
</script>

<style scoped>
	#login{
	    text-align: left;
	    width: 100%;
	    height: 100%;
	}
</style>