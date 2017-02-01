<template>
<div class="container">
  <h2>Launch new CENode instance</h2>
  <p>Specify an agent name and a port number to continue.</p>
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
      </div>
      
      <p v-if="port">The agent's address will be {{host}}:{{port}}.</p>
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
        host: 'http://' + window.location.host.replace(/:[0-9]*/g, ''),
        agent: '',
        port: '',
      }
    },
    methods: {
      create (event) {
        if (this.agent.length && this.port) {
          const data = {agent: this.agent, port: this.port};
          this.$http.post('/nodes/create', data).then(response => {
            this.$router.push('/');
            Materialize.toast('CENode instance created', 3000, 'rounded')
          }, err => Materialize.toast('This name or port is already in use or invalid', 4000, 'rounded'));
        }
      }
    }
  }
</script>

<style>
  .message {
    color: red;
  }
</style>

