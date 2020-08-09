// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
import global_func from './util/function.js';


Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.use(global_func)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
