// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import App from './App'
import Game from './components/Game'
import Ranking from './components/Ranking'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        component: Game
      },
      {
        path: 'ranking',
        component: Ranking
      }
    ]
  }
]

const router = new VueRouter({
  routes // short for routes: routes
})

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')

// hide loading
document.querySelector('.loading-container').style.display = 'none'
