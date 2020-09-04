import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import axios from 'axios'
import serverurl from './assets/js/param'
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.prototype.$serverurl = serverurl
Vue.config.productionTip = false
// let URL = this.$root.URL
new Vue({
  router,
  store,
  data: function () {
    return {
      blog_num: 0
    }
  },
  render: h => h(App)
}).$mount('#app')
