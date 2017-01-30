<template>
<div class="container">
  <h2>Create new CENode instance</h2>
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
          <label for="port">Port number</label>
        </div>
      </div>
      <button v-on:click="create" class="btn"><i class="fa fa-check"></i> Ready</button>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Hello from vue-loader!',
        agent: '',
        port: ''
      }
    },
    methods: {
      create (event) {
        if (this.agent.length && this.port) {
          const data = {agent: this.agent, port: this.port};
          this.$http.post('/nodes/create', data).then(response => {
            console.log(response.body); 
          }, err => console.log(err));
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

