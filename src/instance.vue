<template>
<div v-if="instance.name" class="container">
  <h1>{{instance.name}} <label>Instance of type <router-link :to="{name: 'concept', params: {name: server.name, id: instance.conceptId}}">{{instance.conceptName}}</router-link></label></h1>
  <hr>
  <div class="row">
    <div class="col s12 m8">
      <h3>Properties</h3>
    </div>
    <div class="col s12 m4">
      <div class="card teal">
        <div class="card-content white-text">
          <span class="card-title">Info</span>
          
          <h6>Synonyms</h6>
          <p><span v-if="instance.synonyms.length">{{instance.synonyms}}</span><span v-else><i>None</i></span></p>

          <h6>Sub-concepts</h6>
          <p><span v-if="instance.subConcepts.length">{{instance.subConcepts}}</span><span v-else><i>None</i></span></p>
        </div>
      </div>
    </div>
  </div>
  
</div>

</template>

<script>

  function refreshInfo (component){
    component.$http.get('http://localhost:' + component.server.port + '/instance?id=' + component.$store.state.route.params['id']).then(response => {
      console.log(response.body);
      component.instance = response.body;
    });
  }

  export default {
    data () {
      return {
        instance: {}
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
