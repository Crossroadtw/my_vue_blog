import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import blog from '@/views/blog'
import blogcl from '@/views/blognum'
import About from '@/views/About'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
