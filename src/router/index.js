import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import blog from '@/views/Blog'
import blogcl from '@/views/BlogNum'
import About from '@/views/About'
import Chat from '@/views/Chat_Co'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat
  },
  {
    path: '/home/about',
    name: 'about',
    component: About
  },
  {
    path: '/home/blog',
    name: 'blog',
    component: blog
  },
  {
    path: '/home/show',
    name: 'show',
    component: blogcl
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
