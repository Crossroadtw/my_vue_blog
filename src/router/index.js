import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/views/Home'
// import blog from '@/views/Blog'
// import blogcl from '@/views/BlogNum'
// import About from '@/views/About'
// import Chat from '@/views/Chat_Co'
// import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['@/views/Home'], resolve)
  },
  {
    path: '/chat',
    name: 'chat',
    // component: Chat
    component: resolve => require(['@/views/Chat_Co'], resolve)
  },
  {
    path: '/home/about',
    name: 'about',
    // component: About
    component: resolve => require(['@/views/About'], resolve)
  },
  {
    path: '/home/blog',
    name: 'blog',
    // component: blog
    component: resolve => require(['@/views/Blog'], resolve)
  },
  {
    path: '/home/show',
    name: 'show',
    // component: blogcl
    component: resolve => require(['@/views/BlogNum'], resolve)
  },
  {
    path: '/message',
    name: 'message',
    // component: Login
    component: resolve => require(['@/views/Article'], resolve)
  },
  {
    path: '/code',
    name: 'code',
    // component: Login
    component: resolve => require(['@/views/Code_C'], resolve)
  },
  {
    path: '/informal_essay',
    name: 'informal_essay',
    // component: Login
    component: resolve => require(['@/views/Record'], resolve)
  },
  {
    path: '/language',
    name: 'language',
    // component: Login
    component: resolve => require(['@/views/Login'], resolve)
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
