<template>
<div class="container">
  <div v-if="server.name">
    <h2>{{server.name}} <small>at localhost:{{server.port}}</small></h2>
    <button class="waves-effect btn" v-on:click="openCEModal"><i class="fa fa-plus"></i> Add CE</button>
    <button class="waves-effect btn blue" v-on:click="openModelChooser"><i class="fa fa-upload"></i> Upload model</button>
    <input type="file" style="display:none" id="modelChooser" v-on:change="loadModel">
    <a class="waves-effect btn blue" :href="'http://localhost:'+server.port+'/model'" download :download="server.name+'.ce'"><i class="fa fa-download"></i> Download model</a>
    <button class="waves-effect btn red lighten-1" v-on:click="clearNode"><i class="fa fa-ban"></i> Clear node</button>

    <div class="row info-view">
      <div class="col s12 m6">
        <h4>Recent instances</h4>
        <span class="instance inline labelled" v-for="instance in instances">
          <router-link :to="{name: 'instance', params: {name: server.name, id: instance.id}}">{{instance.name}}</router-link>
          <span class="concept"><router-link :to="{name: 'concept', params: {name: server.name, id: instance.conceptId}}">{{instance.conceptName}}</router-link>
          </span>
        </span>
      </div>

      <div class="col s12 m6">
        <h4>Concepts</h4>
        <router-link v-for="concept in concepts" class="concept inline" :to="{name: 'concept', params: {name: server.name, id: concept.id}}">{{concept.name}}</router-link>
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
      component.instanceList = response.body.recentInstances;
      component.conceptList = response.body.recentConcepts;
    });
  }

  export default {
    data () {
      return {
        instanceList: [],
        conceptList: [],
        customCE: ''
      }
    },
    computed: {
      server () {
        return this.$store.getters.currentServer
      },
      concepts () {
        return this.conceptList.sort((a, b) => {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        });
      },
      instances () {
        return this.instanceList.reverse();
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
      },
      openModelChooser () {
        $('#modelChooser').click();               
      },
      loadModel (event){
        const files = event.target.files; 
        const reader = new FileReader();
        reader.onload = event2 => {
          this.$http.post('http://localhost:' + this.server.port + '/sentences', event2.target.result).then(() => refreshInfo(this));
        }; 
        reader.readAsText(files && files[0]);
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
 .info-view{
   margin-top:60px;
 }
</style>
