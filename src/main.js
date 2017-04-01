// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Ranking from './Ranking'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: App },
  { path: '/ranking', component: Ranking }
]

const router = new VueRouter({
  routes // short for routes: routes
})

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')

// hide loading
document.querySelector('.loading-container').style.display = 'none'
