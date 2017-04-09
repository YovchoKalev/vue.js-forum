<template>
    <main class="register">
        <div class="container">
            <div v-if="loading" class="progress">
                <div class="indeterminate"></div>
            </div>
            <h3 class="center">Register</h3>
            <div class="row">
                <div class="col s8 offset-s2">
                    <div class="input-field">
                        <input v-model="username" id="user" type="text" placeholder="Username">
                    </div>
                    <div class="input-field">
                        <input v-model="password" id="pass" type="text" placeholder="Password">
                    </div>
                    <button @click="register()" class="btn waves-effect waves-light">Login</button>
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
            saveAuthInSession(response) {
                let userAuth = response.data._kmd.authtoken;
                sessionStorage.setItem('authToken', userAuth);
                let userId = response.data._id;
                sessionStorage.setItem('userId', userId);
                let user = response.data.username;
                sessionStorage.setItem('user', user);

            },
            redirect(){
                var router = new VueRouter() ;
                router.push('/list')
            },
            register(){
                const kinveyBaseUrl = "https://baas.kinvey.com/";
                const kinveyAppKey = "kid_Byf97zZ6x";
                const kinveyAppSecret = "361c58bc53d849438e9bb2ddf107955a";
                const kinveyAppAuthHeaders = {
                    'Authorization': "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret),
                };
                const kinveyRegisterUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/";
                let userData = {
                    username: this.username,
                    password: this.password
                };
                var self = this;
                this.loading=true;
                axios({
                    method: "POST",
                    url: kinveyRegisterUrl,
                    headers: kinveyAppAuthHeaders,
                    data: userData,
                }).then(function(response) {
                    self.saveAuthInSession(response);
                    auth.auth=true;
                    self.redirect();
                    self.loading=false;
                }).catch(function (error) {
                    self.message= "invalid credidentials"
                    self.loading=false;
                })

            }
        }
    }
</script>

<style scoped>
    .register h3{
        color:#26a69a
    }

</style>