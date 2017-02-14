<template>
<div class="container">
  <h2>Launch new CENode instance</h2>
  <p>Specify an agent name and a port number.</p>
  <div class="row">
    <div class="col m6">
      <div class="row">

        <div class="input-field col s12">
          <input v-model="agent" placeholder="Moira" id="agent" type="text" class="validate">
          <label for="agent">Agent name</label>
        </div>

        <div class="input-field col s12">
          <input v-model="port" id="port" type="number" class="validate" placeholder="5678">
          <label for="port">Port number (1024 - 65536)</label>
        </div>

        <div class="input-field col s12">
          <p>Select CE models to bundle with the launch.</p>
          <p>
            <input v-model="preloadedModels" value="core" type="checkbox" id="core_model">
            <label for="core_model">Core (recommended) - <small>includes the basics to get up-and running with cards, policies, and rules</small></label>
          </p>
          <p>
            <input v-model="preloadedModels" value="server"  type="checkbox" id="server_model">
            <label for="server_model">Server - <small>adds extra policy information to enable the node to act as a relay for other nodes. <span class="amber-text">Requires the core model</span></small></label>
          </p>
        </div>

      </div>
     
      <div v-if="port" class="card light-blue lighten-4">
        <div class="card-content">
          <p><i class="fa fa-info"></i> The agent's address will be <b>{{$store.state.hostName}}:{{port}}</b>.</p>
        </div>
      </div>

      <button v-on:click="create" class="btn"><i class="fa fa-rocket"></i> Launch</button>
      <router-link to="/" class="btn-flat">Cancel</router-link>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data () {
      return {
        agent: '',
        port: '',
        preloadedModels: ['core']
      }
    },
    methods: {
      create (event) {
        if (this.agent.length && this.port) {
          const data = {agent: this.agent, port: this.port, models: this.preloadedModels};
          this.$http.post('/nodes/create', data).then(response => {
            this.$router.push('/');
            Materialize.toast('CENode instance created', 3000, 'rounded')
          }, err => Materialize.toast('This name or port is already in use or invalid', 4000, 'rounded'));
        }
      }
    },
    mounted () {
      $('#agent').focus();
      setTimeout(() => Materialize.updateTextFields(), 500);
    }
  }
</script>

<style>
  .message {
    color: red;
  }
</style>

