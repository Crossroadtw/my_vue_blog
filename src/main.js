import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui'
import { Popover, Divider, Pagination, Menu, Submenu, MenuItem, Form, Row, Col, Card, FormItem, Autocomplete, Button, Container, Tag, Icon, Input, Carousel, CarouselItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import axios from 'axios'
import serverurl from './assets/js/param'
import VueParticles from 'vue-particles'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueParticles)
Vue.use(VueCodeMirror)
Vue.use(Pagination)
Vue.use(Popover)
Vue.use(Divider)
Vue.use(Menu)
Vue.use(Form)
Vue.use(Input)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Tag)
Vue.use(FormItem)
Vue.use(CarouselItem)
Vue.use(Carousel)
Vue.use(Container)
Vue.use(Autocomplete)
Vue.use(Row)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Col)
Vue.use(Card)
// Vue.use(ElementUI)
Vue.prototype.$serverurl = serverurl
Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.token
    }

    return config
  },
  error => {
    return Promise.reject(error)
  })
new Vue({
  router,
  store,
  data: function () {
    return {
      blog_num: false,
      login_flag: true,
      com_data: ''
      // file_data: []
    }
  },
  render: h => h(App)
}).$mount('#app')
