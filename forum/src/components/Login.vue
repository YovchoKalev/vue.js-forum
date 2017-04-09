<template>
    <main class="login">
        <div class="container">
            <h3 class="center">Login</h3>
            <div v-if="loading" class="progress">
                <div class="indeterminate"></div>
            </div>
            <div class="row">
                <div class="col s8 offset-s2">
                    <div class="input-field">
                        <input v-model="username" id="user" type="text" value="" placeholder="Username">
                    </div>
                    <div class="input-field">
                        <input v-model="password" id="pass" type="text" placeholder="Password">
                    </div>
                    <button class="btn waves-effect waves-light" @click="logIn()">Login</button>
                    <div v-if="message">{{message}}</div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import VueRouter from 'vue-router'
    import auth from '../auth'

    export default{

        data(){
            return{
                username:'',
                password:'',
                message:'',
                loading:false
            }
        },
        methods:{
            redirect(){
                var router = new VueRouter() ;

                /*router.go('/home');*/
                router.push('/')
            },
            logIn(){
                const kinveyBaseUrl = "https://baas.kinvey.com/";
                const kinveyAppKey = "kid_Byf97zZ6x";
                const kinveyAppSecret = "361c58bc53d849438e9bb2ddf107955a";
                const kinveyAppAuthHeaders = {
                    'Authorization': "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret),
                };
                const kinveyLoginUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/login";
                console.log(kinveyLoginUrl);
                let userData = {
                    username: this.username,
                    password: this.password
                };
                var self = this;
                this.loading = true;
                axios({
                    method: "POST",
                    url: kinveyLoginUrl,
                    headers: kinveyAppAuthHeaders,
                    data: userData
                    /*success: /!*this.redirect()*!/ console.log("ivan"),
                    error:console.log('brat')*/
                }).then(function(response) {
                    self.saveAuthInSession(response);
                    auth.auth=true;
                    self.redirect();
                    self.loading = false;
                }).catch(function (error) {
                    self.message= "invalid credidentials";
                    self.loading = false;
                })

            },
            saveAuthInSession(response) {
                let userAuth = response.data._kmd.authtoken;
                sessionStorage.setItem('authToken', userAuth);
                let userId = response.data._id;
                sessionStorage.setItem('userId', userId);
                let user = response.data.username;
                sessionStorage.setItem('user', user);

            }
        }
    }
</script>

<style>
    .login h3{
        color:#26a69a
    }

</style>