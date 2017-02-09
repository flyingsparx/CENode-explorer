<template>
<div class="container">

  <h1>Welcome</h1>
  <div class="row">
    <div class="col s6">
      <p></strong>Choose a CENode instance to manage</strong> or <router-link to="/new">launch a new one</router-link>.</p>
    </div>
    <div class="col s6">
      <div class="card-panel orange lighten-4" v-if="!servers || !servers.length"><i class="fa fa-exclamation-triangle"></i> Looks like there aren't any CENodes running yet. Get started by <router-link to="/new">launching a new instance</router-link>.</div>
      <ul v-else class="collection">
        <li class="collection-item avatar" v-for="server in servers">
          <img src="/static/node.png" alt="" class="circle">
          <span class="title">{{server.name}}</span>
          <p>Running on port {{server.port}}</p>
          <div class="chip">{{server.conceptCount}} concepts</div>
          <div class="chip">{{server.instanceCount}} instances</div>
          <router-link :to="{ name: 'node', params: { name: server.name }}" class="btn-flat white-text"><i class="fa fa-cogs"></i> Manage</router-link>
          <button class="secondary-content btn-flat red-text" v-on:click="deleteServer(server)"><i class="fa fa-trash"></i> Stop</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        servers: this.$store.state.servers
      }
    },
    methods: {
      deleteServer (server){
        if (window.confirm('Really delete?')) {
          this.$store.dispatch('deleteServer', server.name);
          Materialize.toast('CENode instance deleted', 3000, 'rounded');
        }
      }
    },
    created (){
      this.$store.dispatch('updateServerList'); 
    }
  }
</script>

<style>
  .collection .collection-item.avatar span.title{
    font-size:20px;
  }
  .chip{
    margin:10px 5px;
  }
</style>

