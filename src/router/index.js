import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login'
import Goods from '@/pages/Goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Goods',
      name: 'Goods',
      component: Goods
    }
  ]
})
