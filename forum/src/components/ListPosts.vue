<template>
    <div class="container">
        <div v-if="loading" class="progress">
            <div class="indeterminate"></div>
        </div>
        <div v-if="error" class="error">
            {{error}}
        </div>
        <div class="row">
            <div class="col s3">
                <div class="card-panel small-card white center">
                    Date
                </div>
            </div>
            <div class="col s6">
                <div class="card-panel small-card white text-white center">
                    Title
                </div>
            </div>
            <div class="col s3">
                <div class="card-panel small-card white text-white center">
                    Author
                </div>
            </div>
        </div>
        <listed-post v-for="post in posts" :title="post.title" :date="post.date" :author="post.user" :identification="post.identification"></listed-post>

        <router-link class="float-left" v-if="this.$route.params.page>1" :to="{ name: 'List', params: {page:Number(this.$route.params.page)-1}}"><i class="fa fa-chevron-left" aria-hidden="true"></i></router-link>
        <router-link class="float-right" v-if="countOfPosts - (this.$route.params.page * 3)-1 >=0" :to="{ name: 'List', params: {page:Number(this.$route.params.page)+1}}"><i class="fa fa-chevron-right" aria-hidden="true"></i></router-link>

    </div>
</template>

<script>
    import ListedPost from '../components/ListedPost.vue'

    export default{
        components:{
            ListedPost
        },
        data(){
            return{
                posts:[],
                loading: true,
                error: null,
                countOfPosts:''
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
                let kinveyListUrl = '';
                let skip = this.$route.params.page* 3 - 3;
                if(this.$route.params.page >=1){

                    kinveyListUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + `/posts?query={}&sort={"date": -1}&limit=${3}&skip=${skip}`
                }
                else{
                    kinveyListUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + `/posts?query={}&sort={"date": -1}&limit=3&skip=0`
                }
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
                let kinveyListUrl2 =  kinveyListUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + `/posts/_count`
                axios({
                    method: "GET",
                    url: kinveyListUrl2,
                    headers: kinveyAppAuthHeaders,
                    data: kinveyAppAuthHeaders
                }).then(function(response) {
                    self.loading = false;
                    let data = response.data;
                       self.countOfPosts = data.count;
                }).catch(function (error) {
                    self.error = "error";
                    console.log(error);
                });
            }
            /*List(){
                const kinveyBaseUrl = "https://baas.kinvey.com/";
                const kinveyAppKey = "kid_Byf97zZ6x";
                const kinveyAppSecret = "361c58bc53d849438e9bb2ddf107955a";
                const kinveyAppAuthHeaders = {
                    'Authorization': "Basic " + btoa('yovcho' + ":" + '12345')
                };
                const kinveyListUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/posts";
                var self = this;
                axios({
                    method: "GET",
                    url: kinveyListUrl,
                    headers: kinveyAppAuthHeaders,
                    data: kinveyAppAuthHeaders
                }).then(function(response) {
                    console.log(response)
                }).catch(function (error) {
                    /!*self.message= "invalid credidentials"*!/
                })
            }*/
        },
        nextPage(){

        }
    }
</script>

<style scoped="">
    .card-panel{
        color:#fff;
    }
    .small-card{
        padding: 10px;
        color:#4db6ac;
        border:1px solid #4db6ac

    }
    .float-left{
        float:left;
        margin-top: -10px;
    }
    .float-right{
        float:right;
        margin-top: -10px;
    }
    i{
        font-size:30px !important;
        margin-top:10px;
        color:#ee6e73;
    }
</style>