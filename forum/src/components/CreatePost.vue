<template>
    <div class="container">
        <div class="input-field">
            <input v-model="title" id="title" type="text" placeholder="Title">
        </div>
        <div class="input-field">
            <textarea v-model="content" id="content"  class="materialize-textarea" placeholder="content"></textarea>
        </div>
        <button class="btn waves-effect waves-light" @click="submitPost()">Create</button>

    </div>
</template>

<script>
    import VueRouter from 'vue-router'
    export default{
        data(){
            return {
                title: '',
                content: ''
            }
        },
        methods: {
            redirect(){
                var router = new VueRouter() ;
                router.push('/list/1')
            },
            getKinveyUserAuthHeaders() {
                return {
                    'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
                };
            },
            formatDate(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
            },
            submitPost(){
                const kinveyBaseUrl = "https://baas.kinvey.com/";
                const kinveyAppKey = "kid_Byf97zZ6x";
                const kinveyPostsUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/posts";
                var usernameee = sessionStorage.getItem('user');
                let postData = {
                    title: this.title,
                    user: usernameee,
                    content: this.content,
                    date:new Date().toLocaleString()
                };
                console.log(postData)
                var self = this;
                if(postData.title != '' && postData.content !=''){
                    axios({
                        method: "POST",
                        url: kinveyPostsUrl,
                        headers: this.getKinveyUserAuthHeaders(),
                        data: postData,
                        /*success: /!*this.redirect()*!/ console.log("ivan"),
                         error:console.log('brat')*/
                    }).then(function(response) {
                        self.redirect();
                        console.log(response)
                    }).catch(function (error) {
                        self.message= "invalid"
                    })
                }
            }
        }
    }
</script>