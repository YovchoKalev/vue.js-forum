<template>
    <div class="row">
        <div class="col s3 center">
            <div class="card-panel text-white">
                {{ date }}
            </div>
        </div>
        <div class="col s6 center">
                <div class="card-panel text-white truncate">
                    {{content}}
                    </div>
        </div>
        <div class="col s3 center">
            <div class="card-panel text-white">
                <router-link class="truncate white-text" :to="{ name: 'Profile', params: {username:author}}">
                    {{author}}
                        </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props:['date','content','author'],


    }
</script>

<style scoped>

    a{
        cursor:pointer;
    }
    .card-panel{
        background-color: #ee6e73;
        color: #fff;
    }
</style>