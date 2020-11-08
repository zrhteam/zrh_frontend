<template>
  <div id="register">
    <form  style="margin:20px;border:1px solid red" method="post" action="http://localhost:5000/register">
        <span>username:</span><input type="text" name="username" id="username"><br/>
        <span>password:</span><input type="password" name="password" id="password"><br/>
        <button type="submit" id="registerBtn">register</button>
    </form>
  </div>
</template>
<script>
    export default {
        name: 'Register',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            register: function () {
                axios.post('http://127.0.0.1:5000/register',{
                    username: this.username,
                    password: this.password
                }).then(function (response) {
                    console.log(response.code)
                    if(parseInt(response.code) === 200){
                        window.location.href = 'http://localhost:5000/home'
                    }
                }).catch(function (error) {
                    console.log(error.response)
                })
            }
        }
    }
</script>