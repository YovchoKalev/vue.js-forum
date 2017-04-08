<template>
    <div class="container">
       <div class="input-field">
           <input v-model="title" id="title" type="text" placeholder="Title">
       </div>
        <div class="input-field">
            <textarea v-model="content" id="content"  class="materialize-textarea" placeholder="content"></textarea>
        </div>
        <button class="btn waves-effect waves-light" @click="editPost">Edit</button>

    </div>
</template>

<script>
    import VueRouter from 'vue-router'
    export default{
        data(){
            return{
                title:'',
                content:'',
                loading: true,
                error: null,
                author:'',
                date:''
            }
        },
        created(){
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods:{
            fetchData () {
                let idNumber = this.$route.params.identification;
                this.error = this.post = null;
                this.loading = true;
                const kinveyBaseUrl = "https://baas.kinvey.com/";
                const kinveyAppKey = "kid_Byf97zZ6x";
                const kinveyAppSecret = "361c58bc53d849438e9bb2ddf107955a";
                const kinveyAppAuthHeaders = {
                    'Authorization': "Basic " + btoa('yovcho' + ":" + '12345')
                };
                const kinveyListUrl = `https://baas.kinvey.com/appdata/kid_Byf97zZ6x/posts/?query={"_id":"${idNumber}"}`;
                var self = this;
                axios({
                    method: "GET",
                    url: kinveyListUrl,
                    headers: kinveyAppAuthHeaders,
                    data: kinveyAppAuthHeaders
                }).then(function (response) {
                    self.loading = false;
                    let data = response.data;
                    self.title = data[0].title;
                    self.content = data[0].content;
                    self.author = data[0].content;
                    self.date =new Date().toLocaleString();


                }).catch(function (error) {
                    self.error = "error";
                    console.log(error);
                    self.loading = false;

                });
            },
            editPost(){
                let idNumber = this.$route.params.identification;
                this.error = this.post = null;
                this.loading = true;
                const kinveyBaseUrl = "https://baas.kinvey.com/";
                const kinveyAppKey = "kid_Byf97zZ6x";
                const kinveyAppSecret = "361c58bc53d849438e9bb2ddf107955a";
                const kinveyAppAuthHeaders = {
                    'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
                };
                const kinveyListUrl = `https://baas.kinvey.com/appdata/kid_Byf97zZ6x/posts/${idNumber}`;
                var self = this;
                let postData = {
                    title:self.title,
                    content:self.content,
                    user:sessionStorage.getItem('user'),
                    date:self.date
                }
                axios({
                    method: "PUT",
                    url: kinveyListUrl,
                    headers: kinveyAppAuthHeaders,
                    data: postData,
                }).then(function (response) {
                    self.loading = false;
                    var router = new VueRouter() ;
                    router.push('/list')


                }).catch(function (error) {
                    self.error = "error";
                });
            }
        }

    }
</script>