<template>
<div class="container">
  <h1>{{concept.name}} <label>Concept</label></h1>
  <p v-if="concept.parents && concept.parents.length">Directly inherits from <span class="badge parent teal white-text" v-for="parent in concept.parents"><router-link :to="{name: 'concept', params: {name:server.name, id: parent.id}}">{{parent.name}}</router-link></span></p>
  <hr>
  <div class="row">
    <div class="col s12 m8">
      <h3>Properties</h3>
    </div>
    <div class="col s12 m4">
      <div class="card light-blue lighten-4">
        <div class="card-content">
          <span class="card-title">Direct instances</span>
          <button class="btn"><i class="fa fa-plus"></i> New</button>
          <ul>
            <li v-for="instance of concept.instances"><router-link :to="{name: 'instance', params: {name: server.name, id: instance.id}}">{{instance.name}}</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
</div>

</template>

<script>

  function refreshInfo (component){
    component.$http.get('http://localhost:' + component.server.port + '/concept?id=' + component.$store.state.route.params['id']).then(response => {
      console.log(response.body);
      component.concept = response.body;
    });
  }

  export default {
    data () {
      return {
        concept: {}
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
  .badge.parent {
    float:none;
    margin:0px 4px;
    padding:3px;
  }
</style>
