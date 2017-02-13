<template>
<div v-if="instance.name" class="container">
  <h1>
    <span class="instance-title">{{instance.name}}</span>
    <label>Instance of type <router-link class="concept" :to="{name: 'concept', params: {name: server.name, id: instance.conceptId}}">{{instance.conceptName}}</router-link></label>
  </h1>

  <div class="row">
    <div class="col s12 m8">
      <h3>Properties</h3>
      <p v-if="!(instance.values && instance.values.length) && !(instance.relationships && instance.relationships.length)"><i>None</i></p>

      <div v-for="value of instance.values" class="card teal lighten-4"><div class="card-content">
        <strong>{{value.label}}</strong>
        <span v-if="value.targetId">
          <span class="instance inline labelled">
            <router-link :to="{name: 'instance', params: {name: server.name, id: value.targetId}}">{{value.targetName}}</router-link>
            <span class="concept"><router-link :to="{name: 'concept', params: {name: server.name, id: value.targetConceptId}}">{{value.targetConceptName}}</router-link>
            </span>
          </span>
        </span>
        <span v-else="value.targetName"><br><span class="raw">{{value.targetName}}</span></span>
      </div></div>

      <div v-for="relationship of instance.relationships" class="card teal lighten-4"><div class="card-content">
        <strong>{{relationship.label}}</strong> 
        <span class="instance inline labelled">
          <router-link :to="{name: 'instance', params: {name: server.name, id: relationship.targetId}}">{{relationship.targetName}}</router-link>
          <span class="concept"><router-link :to="{name: 'concept', params: {name: server.name, id: relationship.targetConceptId}}">{{relationship.targetConceptName}}</router-link>
          </span>
        </span>
      </div></div>

    </div>
    <div class="col s12 m4">

      <div class="card">
        <div class="card-content">
          <p><i>{{instance.ce}}</i></p>
        </div>
      </div>

      <div class="card light-blue lighten-4">
        <div class="card-content">
          <span class="card-title">Synonyms</span>
          <ul v-if="instance.synonyms.length">
            <li v-for="synonym of instance.synonyms">{{synonym}}</li>
          </ul>
          <p v-else><i>None</i></p>
        </div>
      </div>

      <div class="card light-blue lighten-4">
        <div class="card-content">
          <span class="card-title">Sub-concepts</span>
          <ul v-if="instance.subConcepts.length">
            <li v-for="subConcept of instance.subConcepts">
              <router-link :to="{name: 'concept', params: {name: server.name, id: subConcept.id}}">{{subConcept.name}}</router-link>
            </li>
          </ul>
          <p v-else><i>None</i></p>
        </div>
      </div>
    </div>
  </div>
  
</div>

</template>

<script>

  function refreshInfo (component){
    component.$http.get('http://' + component.$store.state.hostName + ':' + component.server.port + '/instance?id=' + component.$store.state.route.params['id']).then(response => {
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
