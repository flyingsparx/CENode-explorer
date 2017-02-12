<template>
<div class="container">

  <h1>Welcome</h1>
  <div class="row">
    <div class="col m6">
      <p></strong>Choose a CENode instance to manage</strong> or <router-link to="/new">launch a new one</router-link>.</p>

      <div class="card blue-grey darken-1">
				<div class="card-content white-text">
					<span class="card-title">About</span>
          <p>CENode Explorer is a web-based front-end for CENode. In particular it manages CENode instances running on the server.</p>
          <p>It allows users to interact with the standard CENode APIs through a graphical interface, simply adding the ability to start and stop instances when required.</p>
				</div>
				<div class="card-action">
          <a href="https://github.com/flyingsparx/CENode-explorer" target="_blank"><i class="fa fa-github"></i> View project</a>
          <a href="http://cenode.io" target="_blank"><i class="fa fa-globe"></i> About CENode</a>
				</div>
			</div>

    </div>
    <div class="col m6">
      <div class="card-panel orange lighten-4" v-if="!servers || !servers.length"><i class="fa fa-exclamation-triangle"></i> Looks like there aren't any CENodes running yet. Get started by <router-link to="/new">launching a new instance</router-link>.</div>

			<div class="card" v-for="server in servers">
				<div class="card-content">
					<span class="card-title">{{server.name}}</span>
          <p>Running on port {{server.port}}</p>
          <div class="chip">{{server.conceptCount}} concepts</div>
          <div class="chip">{{server.instanceCount}} instances</div>
				</div>
				<div class="card-action">
					<router-link :to="{ name: 'node', params: { name: server.name }}"><i class="fa fa-cogs"></i> Manage</router-link>
				  <a class="red-text text-darken-2" href="#" v-on:click="deleteServer(server)"><I class="fa fa-trash"></i> Stop</a>	
				</div>
			</div>
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
  .chip{
    margin:10px 5px 0px 0px;
  }
</style>

