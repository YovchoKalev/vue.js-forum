<template>
    <div class="row">
        <div class="col s3 center">
            <div class="card-panel teal lighten-2 text-white">
            {{ date }}
            </div>
        </div>
        <div class="col s6 center truncate">
            <router-link class="truncate" :to="{ name: 'Post', params: {identification:identification, postTitle: title.replace(/\s+/g, '-').toLowerCase()}}">
                    <div class="card-panel teal lighten-2 text-white truncate">
                    {{title}}
                    </div>
                </router-link>
        </div>
        <div class="col s3 center">
            <div class="card-panel teal lighten-2 text-white">
            {{ author }}
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props:['date','title','author', 'identification'],


    }
</script>

<style scoped>
    a{
        cursor:pointer;
        color:#fff
    }
    .card-panel{
        color:#fff !important
    }
</style>