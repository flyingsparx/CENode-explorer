<template>
<div class="container">
  <div v-if="server.name">
    <h2>{{server.name}} <small>on port {{server.port}}</small></h2>
    <button class="waves-effect btn" v-on:click="openCEModal"><i class="fa fa-plus"></i> Add CE</button>
    <button class="waves-effect btn" v-on:click="clearNode"><i class="fa fa-ban"></i> Clear node</button>

    <div class="row">
      <div class="col s12 m6">
        <h4>Recent instances</h4>
        <ul class="collection">
          <li v-for="instance in instances" class="collection-item">
            <router-link :to="{name: 'instance', params: {name: server.name, id: instance.id}}">{{instance.name}}</router-link>
            <span class="badge teal white-text"><a href="#">{{instance.conceptName}}</a></span>
          </li>
        </ul>
      </div>

      <div class="col s12 m6">
        <h4>Recent concepts</h4>
        
        <ul class="collection">
          <li v-for="concept in concepts" class="collection-item">
            <router-link :to="{name: 'concept', params: {name: server.name, id: concept.id}}">{{concept.name}}</router-link>
          </li>
        </ul>
      </div>
    </div>

  </div>

<div id="modal1" class="modal bottom-sheet">
  <div class="modal-content">
    <h4>Add CE to the node</h4>
    <div class="input-field">
      <textarea id="ce-field" class="materialize-textarea" v-model="customCE"></textarea>
      <label for="ce-field">Enter CE</label>
    </div>
  </div>
  <div class="modal-footer">
    <button v-on:click="submitCE" class="modal-action modal-close waves-effect waves-green btn-flat">Submit CE</button>
  </div>
</div>
</div>

</template>

<script>

  function refreshInfo (component){
    component.$http.get('http://localhost:' + component.server.port + '/info').then(response => {
      component.instances = response.body.recentInstances;
      component.concepts = response.body.recentConcepts;
    });
  }

  export default {
    data () {
      return {
        instances: [],
        concepts: [],
        customCE: ''
      }
    },
    computed: {
      server () {
        return this.$store.getters.currentServer
      }
    },
    watch: {
      server: function (val, oldVal) {
        if (val) {
          refreshInfo(this);
        }
      }
    },
    methods: {
      openCEModal () {
        $('.modal').modal();
        $('#modal1').modal('open');
      },
      submitCE () {
        this.$http.post('http://localhost:' + this.server.port + '/sentences', this.customCE).then(() => refreshInfo(this));
      },
      clearNode () {
        const response = window.confirm('Really clear this node? This will remove all instances and concepts from the knowledge base.');
        if (response) {
          this.$http.put('http://localhost:' + this.server.port + '/reset').then(() => refreshInfo(this));
        }
      }
    },
    created () {
      if (this.server.port) {
        refreshInfo(this);
      }
    }
  }
</script>

<style>
  .white-text a{
    color:white;
  }
</style>
