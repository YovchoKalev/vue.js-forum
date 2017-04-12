import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import AppHome from '@/components/Home.vue'
import Register from '@/components/Register.vue'
import ListPosts from '@/components/ListPosts.vue'
import CreatePost from '@/components/CreatePost.vue'
import Post from '@/components/Post.vue'
import EditPost from '@/components/EditPost.vue'
import Profile from '@/components/Profile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
      {
          path: '/',
          name: 'Home',
          component: AppHome
      },
      {
          path: '/register',
          name: 'Register',
          component: Register
      },
      {
          path: '/list/:page',
          name: 'List',
          component: ListPosts
      },
      {
          path: '/create',
          name: 'Create',
          component: CreatePost
      },
      {
          path: '/post/:identification/:postTitle',
          name: 'Post',
          component: Post
      },
      {
          path: '/post/edit/:identification/:postTitle',
          name: 'EditPost',
          component: EditPost
      },
      {
          path: '/user/:username',
          name: 'Profile',
          component: Profile
      }
  ]
})
