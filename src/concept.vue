<template>
<div class="container">
  <h1>
    <span class="concept-title">{{concept.name}}</span>
    <label>Concept <span v-if="concept.parents && concept.parents.length">inherits directly from <span class="concept" v-for="parent in concept.parents"><router-link :to="{name: 'concept', params: {name:server.name, id: parent.id}}">{{parent.name}}</router-link></span></span></label>
  </h1>

  <div class="row">
    <div class="col s12 m8">
      <h4>Properties</h4>
      <p v-if="!(concept.values && concept.values.length) && !(concept.relationships && concept.relationships.length)"><i>None</i></p>

      <div v-for="value of concept.values" class="card teal lighten-4"><div class="card-content">
        <strong>{{value.label}}</strong> 
        <span class="concept inline" v-if="value.targetName">
          <router-link :to="{name: 'concept', params: {name: server.name, id: value.targetId}}">{{value.targetName}}</router-link>
        </span>
      </div></div>

      <div v-for="relationship of concept.relationships" class="card teal lighten-4"><div class="card-content">
        <strong>{{relationship.label}}</strong> 
        <span class="concept inline">
          <router-link :to="{name: 'concept', params: {name: server.name, id: relationship.targetId}}">{{relationship.targetName}}</router-link>
        </span>
      </div></div>

    </div>
    <div class="col s12 m4">
      <div class="card">
        <div class="card-content">
          <p><i>{{concept.ce}}</i></p>
        </div>
      </div>

      <div class="card light-blue lighten-4">
        <div class="card-content">
          <span class="card-title">Children</span>
          <div v-if="concept.children && concept.children.length">
            <router-link v-for="child of concept.children" class="concept inline" :to="{name: 'concept', params: {name: server.name, id: child.id}}">{{child.name}}</router-link>
          </div>
          <p v-else><i>None</i></p>
        </div>
      </div>

      <div class="card light-blue lighten-4">
        <div class="card-content">
          <span class="card-title">Instances</span>
          <div v-if="concept.instances && concept.instances.length">
            <router-link v-for="instance of concept.instances" class="instance inline" :to="{name: 'instance', params: {name: server.name, id: instance.id}}">{{instance.name}}</router-link>
          </div>
          <p v-else><i>None</i></p>
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
