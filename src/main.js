import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './app.vue'
import Settings from './settings.vue'

Vue.use(VueRouter)

const router = new VueRouter({routes: [
  { path: '/', component: Home},
  { path: '/settings', component: Settings }
]})

const app = new Vue({
    router
}).$mount('#app')
