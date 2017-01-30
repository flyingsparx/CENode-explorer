import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
import Home from './app.vue'
import Settings from './settings.vue'
import New from './new.vue';

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({routes: [
  { path: '/', component: Home},
  { path: '/settings', component: Settings },
  { path: '/new', component: New}
]})

const app = new Vue({
    router
}).$mount('#app')
