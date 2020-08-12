import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login'
import Home from '@/pages/Home'
import User from '@/pages/User'
import Power from '@/pages/Power'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/Home/user',
          name: User,
          component: User
        },
        {
          path: '/Home/power',
          name: 'Power',
          component: Power
        },
      ]
    }
  ]
})
