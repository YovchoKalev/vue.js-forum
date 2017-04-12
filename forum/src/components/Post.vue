<template>
    <div class="container">
        <div v-if="loading" class="progress">
            <div class="indeterminate"></div>
        </div>
        <h1>{{title}}</h1>
        <div class="row">
            <div class="col s4">
                <div class="card-panel teal lighten-2 text-white">
                    <div class="float-left">
                        <router-link class="truncate" :to="{ name: 'Profile', params: {username:author}}">
                                {{author}}
                        </router-link>
                     </div>
                    <div class="float-right">
                        Date: {{date}}
            </div>
                </div>
            </div>
        </div>
        <p class="content">
            {{content}}
        </p>

        <button class="btn waves-effect waves-light red" v-if="creator" @click="deletePost">Delete Post</button>
        <a class="btn waves-effect waves-light text-white" v-if="creator"><router-link :to="{ name: 'EditPost', params: {identification:identification, postTitle: title.replace(/\s+/g, '-').toLowerCase()}}">Edit Post</router-link></a>
        <h1>Comments</h1>
        <div  v-for="comment in comments">
            <comment  :date="comment.date" :content="comment.content" :author="comment.user"></comment>
                <button class="btn waves-effect waves-light red" v-if="showHideDelete(comment.user)" @click="removeComment(comment.id)">Delete comment</button>
        </div>
    <h1>Add Comment</h1>
            <textarea v-model="commentContent" id="content"  class="materialize-textarea" placeholder="content"></textarea>

        <button class="btn waves-effect waves-light" @click="addComment">Add comment</button>
    </div>
</template>

<script>
    import VueRouter from 'vue-router'
    import Comment from '../components/Comment.vue'
    export default{
        components: {
            Comment
        },
        data(){
            return {
                title: '',
                author: '',
                date: '',
                content: '',
                loading: true,
                error: null,
                creator:false,
                identification:this.$route.params.identification,
                comments:[],
                commentContent:''
            }
        },
        created () {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            getKinveyUserAuthHeaders() {
                return {
                    'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
                };
            },
            addComment(){
                const kinveyBaseUrl = "https://baas.kinvey.com/";
                const kinveyAppKey = "kid_Byf97zZ6x";
                const kinveyPostsUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/postComments";
                var usernameee = sessionStorage.getItem('user');
                let postData = {
                    user: usernameee,
                    content: this.commentContent,
                    date:new Date().toLocaleString(),
                    postId:this.$route.params.identification
                };
                console.log(postData)
                var self = this;
                self.loading=true;
                axios({
                    method: "POST",
                    url: kinveyPostsUrl,
                    headers: this.getKinveyUserAuthHeaders(),
                    data: postData,
                }).then(function(response) {
                    self.loading=false;
                    self.comments = [];
                    self.fetchData()
                    self.commentContent = '';

                    console.log(response)
                }).catch(function (error) {
                    self.message= "invalid"
                })
            },
            showHideDelete(user){
               return sessionStorage.getItem('user') === user;
            },
                removeComment(comment) {
                    var result = this.comments.filter(( obj )=>obj.id !==comment);
                    this.comments = result;

                        let idNumber = this.$route.params.identification;
                        this.error = this.post = null;
                        this.loading = true;
                        const kinveyBaseUrl = "https://baas.kinvey.com/";
                        const kinveyAppKey = "kid_Byf97zZ6x";
                        const kinveyAppSecret = "361c58bc53d849438e9bb2ddf107955a";
                        const kinveyAppAuthHeaders = {
                            'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
                        };
                        const deleteUrl = `https://baas.kinvey.com/appdata/kid_Byf97zZ6x/postComments/?query={"_id":"${comment}"}`;
                        var self = this;
                        axios({
                            method: "DELETE",
                            url: deleteUrl,
                            headers: kinveyAppAuthHeaders,
                        }).then(function (response) {
                            self.loading=false;
                            console.log(response);
                        }).catch(function (error) {
                            console.log(error);
                        });

                    },
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
                    self.author = data[0].user;
                    self.date = data[0].date;
                    self.content = data[0].content;
                    if(data[0].user == sessionStorage.getItem('user')){
                        self.creator = true;
                    }


                }).catch(function (error) {
                    self.error = "error";
                    self.loading = false;
                    console.log(error);
                });
                const kinveyLisCommentstUrl = `https://baas.kinvey.com/appdata/kid_Byf97zZ6x/postComments/?query={"postId":"${this.$route.params.identification}"}`;
                axios({
                    method: "GET",
                    url: kinveyLisCommentstUrl,
                    headers: kinveyAppAuthHeaders
                }).then(function (response) {
                    self.loading = false;
                    let data = response.data;
                   for(let d in data){
                       let obj = {
                           user:data[d].user,
                           content:data[d].content,
                           date:data[d].date,
                           id:data[d]._id
                       }
                       self.comments.push(obj)
                    }
                }).catch(function (error) {
                    self.error = "error";
                    self.loading = false;
                    console.log(error);
                });
            },
            deletePost(){
                let idNumber = this.$route.params.identification;
                this.error = this.post = null;
                this.loading = true;
                const kinveyBaseUrl = "https://baas.kinvey.com/";
                const kinveyAppKey = "kid_Byf97zZ6x";
                const kinveyAppSecret = "361c58bc53d849438e9bb2ddf107955a";
                const kinveyAppAuthHeaders = {
                    'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
                };
                const deleteUrl = `https://baas.kinvey.com/appdata/kid_Byf97zZ6x/posts/?query={"_id":"${idNumber}"}`;
                var self = this;
                axios({
                    method: "DELETE",
                    url: deleteUrl,
                    headers: kinveyAppAuthHeaders,
                }).then(function (response) {
                    var router = new VueRouter() ;
                    router.push('/list')


                }).catch(function (error) {
                    console.log(error);
                });
            },
            editPost(){
                console.log('in')
                let idNumber = this.$route.params.identification;
                this.error = this.post = null;
                this.loading = true;
                const kinveyBaseUrl = "https://baas.kinvey.com/";
                const kinveyAppKey = "kid_Byf97zZ6x";
                const kinveyAppSecret = "361c58bc53d849438e9bb2ddf107955a";
                const kinveyAppAuthHeaders = {
                    'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
                };
                const deleteUrl = `https://baas.kinvey.com/appdata/kid_Byf97zZ6x/posts/?query={"_id":"${idNumber}"}`;
                var self = this;
                axios({
                    method: "DELETE",
                    url: deleteUrl,
                    headers: kinveyAppAuthHeaders,
                }).then(function (response) {
                    var router = new VueRouter() ;
                    router.push('/list')


                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
    a{
        color:#fff;
    }
    .card-panel{
        color:#fff;
    }
    .float-left{
        float:left;
        margin-top: -10px;
    }
    .float-right{
        float:right;
        margin-top: -10px;
    }
</style>