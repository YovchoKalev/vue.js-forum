<template>
    <div class="row">
        <div class="col s3 center">
            <div class="card-panel text-white">
                {{ date }}
            </div>
        </div>
        <div class="col s6 center">
                <div class="card-panel text-white">
                    {{content}}
                    </div>
        </div>
        <div class="col s3 center">
            <div class="card-panel text-white">
                {{ author }}
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
    }
</style>