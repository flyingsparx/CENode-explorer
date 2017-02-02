import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
import VuexRouterSync from 'vuex-router-sync';
import Vuex from 'vuex';
import Home from './home.vue'
import Settings from './settings.vue'
import New from './new.vue';
import Node from './node.vue';

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    servers: []
  },
  getters: {
    currentServer: state => {
      for (const server of state.servers) {
        if (server.name === state.route.params['name']) {
          return server;
        }
      }
      return {};
    }
  },
  mutations: {
    updateServerList (state, list){
      state.servers.splice(0, state.servers.length);
      for (const server of list) {
        state.servers.push(server);
      }
    },
    deleteServer (state, name){
      let index = -1;
      for (const i in state.servers) {
        if (state.servers[i].name === name) {
          index = i;
          break;
        }
      }
      if (index > -1) {
        state.servers.splice(index, 1);
      }
    }
  },
  actions: {
    updateServerList (context) {
      Vue.http.get('/nodes').then(response => {
        context.commit('updateServerList', response.body); 
      }, err => console.log(err));
    },
    deleteServer (context, name) {
      Vue.http.delete('/nodes?name=' + name).then(response => {
        context.commit('deleteServer', name);
      });
    }
  }
})

const router = new VueRouter({routes: [
  { path: '/', component: Home},
  { path: '/settings', component: Settings },
  { path: '/new', component: New},
  { path: '/node/:name', component: Node, name: 'node'},
  { path: '/node/:name/concept/:id', component: null, name: 'concept'},
  { path: '/node/:name/instance/:id', component: null, name: 'instance'}
]})

VuexRouterSync.sync(store, router);

new Vue({router, store}).$mount('#app')
store.dispatch('updateServerList');
