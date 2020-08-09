import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login'
import Goods from '@/pages/Goods'
import User from '@/pages/User'
import Power from '@/pages/Power'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/user',
      name: User,
      component: User
    },
    {
      path: '/Goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/Power',
      name: 'Power',
      component: Power
    },

  ]
})
