<template>
<div class="container">
  <h2>Running CENode instances</h2>
  <div class="card-panel teal lighten-2 white-text" v-if="!servers || !servers.length">Looks like there aren't any running yet. Get started by <router-link to="/new">launching a new instance</router-link>.</div>
  <ul id="example-1">
    <li v-for="server in servers">
      {{server.name}} 
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
    created (){
      this.$http.get('/nodes').then(response => {
        this.servers = response.body;
      }, err => console.log(err));
    }
  }
</script>

<style>
  .message {
    color: red;
  }
</style>

