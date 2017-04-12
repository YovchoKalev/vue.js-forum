<template>
   <div class="container profile-container">
       <h1 class="center">{{user}}</h1>

        <div class="row">
            <div class="col s12 center">
                <h2>Posts</h2>
                <profile-listed-post v-for="post in posts" :date="post.date" :title="post.title" :identification="post.identification"></profile-listed-post>
            </div></div>
        </div>
   </div>
</template>


<script>
    import ProfileListedPost from '../components/ProfileListedPost.vue'
    export default{
        components:{
            ProfileListedPost,
        },
        data(){
            return{
                user:this.$route.params.username,
                comments:[],
                posts:[]
            }
        },
        created () {
            // fetch the data when the view is created and the data is
            // already being observed
            this.fetchData()
        },
        watch: {
            // call again the method if the route changes
            '$route': 'fetchData'
        },
        methods:{
            fetchData () {
                this.posts= [];
                this.error = this.post = null
                this.loading = true
                const kinveyBaseUrl = "https://baas.kinvey.com/";
                const kinveyAppKey = "kid_Byf97zZ6x";
                const kinveyAppSecret = "361c58bc53d849438e9bb2ddf107955a";
                const kinveyAppAuthHeaders = {
                    'Authorization': "Basic " + btoa('yovcho' + ":" + '12345')
                };
                let kinveyListUrl = `https://baas.kinvey.com/appdata/kid_Byf97zZ6x/posts/?query={"user":"${this.$route.params.username}"}`;
                var self = this;
                axios({
                    method: "GET",
                    url: kinveyListUrl,
                    headers: kinveyAppAuthHeaders,
                    data: kinveyAppAuthHeaders
                }).then(function(response) {
                    self.loading = false;
                    let data = response.data;
                    for(let entry in data){
                        let insideData = data[entry];
                        let obj = {
                            title:insideData.title,
                            date:insideData.date,
                            user:insideData.user,
                            identification:insideData._id
                        };
                        self.posts.push(obj);
                    }

                }).catch(function (error) {
                    self.error = "error"
                    console.log(error);
                });
                let kinveyListUrl2 =  kinveyListUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + `/postComments/?query={"user":"${this.$route.params.username}"}`
                axios({
                    method: "GET",
                    url: kinveyListUrl2,
                    headers: kinveyAppAuthHeaders,
                    data: kinveyAppAuthHeaders
                }).then(function(response) {
                    self.loading = false;
                    let data = response.data;
                    for(let entry in data){
                        let insideData = data[entry];
                        let obj = {
                            title:insideData.title,
                            date:insideData.date,
                            user:insideData.user,
                            identification:insideData.postId
                        };
                        self.comments.push(obj);
                    }
                    console.log(self.comments)
                }).catch(function (error) {
                    self.error = "error";
                    console.log(error);
                });
            }
        }

    }
</script>

<style>
    .profile-container .row{
        display: flex;
    }
    .profile-container .col{
        flex:1
    }
</style>