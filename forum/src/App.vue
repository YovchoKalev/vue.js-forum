<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
    import AppHeader from './components/AppHeader.vue'
export default {
  name: 'app',
    components:{
      AppHeader,
    }
}
</script>

<style>
body{
  font-family: 'Ubuntu', sans-serif;
}
</style>
