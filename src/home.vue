<template>
<div class="container">
  <h2>Running CENode instances</h2>
  <div class="card-panel teal lighten-2 white-text" v-if="!servers || !servers.length">Looks like there aren't any running yet. Get started by <router-link to="/new">launching a new instance</router-link>.</div>

  <ul class="collection">
    <li class="collection-item avatar" v-for="server in servers">
      <img src="/static/node.png" alt="" class="circle">
      <span class="title">{{server.name}}</span>
      <p><b>Running on port {{server.port}}</b></p>
      <div class="chip">{{server.conceptCount}} concepts</div>
      <div class="chip">{{server.instanceCount}} instances</div>
      <a href="#!" class="btn-flat"><i class="fa fa-cogs"></i> Manage</a>
      <button class="btn-flat red-text" v-on:click="deleteServer(server)"><i class="fa fa-trash"></i></button>
    </li>
  </ul>
</template>

<script>
  export default {
    data () {
      return {
        servers: []
      }
    },
    methods: {
      deleteServer (server){
        if (window.confirm('Really delete?')) {
          this.$http.delete('/nodes?name=' + server.name);
        }
      }
    },
    created (){
      this.$http.get('/nodes').then(response => {
        this.servers = response.body;
      }, err => console.log(err));
    }
  }
</script>

<style>
  .collection .collection-item.avatar span.title{
    font-size:20px;
  }
</style>

