<template>

    <nav>
        <div class="nav-wrapper">
            <div class="container">
                <a href="#" class="brand-logo">Logo</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li v-if="sessionData"><router-link to="/">Home</router-link></li>
                    <li v-if="!sessionData"><router-link to="/login">Login</router-link></li>
                    <li v-if="!sessionData"><router-link to="/register">Register</router-link></li>
                    <li v-if="sessionData"><router-link to="/list/1">List Posts</router-link></li>
                    <li v-if="sessionData"><router-link to="/create">Create Post</router-link></li>
                    <li @click="logOut()" v-if="sessionData">Log out</li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import auth from '../auth'
    import VueRouter from 'vue-router'
    export default{
        data(){
            return{
                sessionData:false,
                bratt:'cunka'
            }
        },
       methods:{
            logOut(){
                auth.auth=false;
                console.log(auth.auth);
                sessionStorage.clear();
                var router = new VueRouter();
                router.push('/login')
            }
        },
        computed:{
            brat(){

            }
        },
        watch:{
            '$route'(){
                if(auth.auth){
                    this.sessionData= true;
                }
                else{
                    this.sessionData= false;


                }
            }
        }
    }
</script>


<style scoped>

</style>