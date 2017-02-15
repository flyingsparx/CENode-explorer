<template>
<div class="container">
  <div v-if="server.name">
    <h2>{{server.name}} <small>at {{$store.state.hostName}}:{{server.port}}</small></h2>

    <div class="hide-on-med-and-down">
      <button class="waves-effect btn" v-on:click="openCEModal"><i class="fa fa-plus"></i> Add CE</button>
      <button class="waves-effect btn blue" v-on:click="openModelChooser"><i class="fa fa-upload"></i> Upload model</button>
      <input type="file" style="display:none" id="modelChooser" v-on:change="loadModel">
      <a class="waves-effect btn blue" :href="'http://'+$store.state.hostName+':'+server.port+'/model'" download :download="server.name+'.ce'"><i class="fa fa-download"></i> Download model</a>
      <button class="waves-effect btn red lighten-1" v-on:click="clearNode"><i class="fa fa-ban"></i> Clear node</button>
    </div>

    <input type="file" style="display:none" id="modelChooser" v-on:change="loadModel">
    <ul id='node-dropdown' class='dropdown-content'>
      <li><a href="#" v-on:click="openCEModal"><i class="fa fa-plus"></i> Add CE</a></li>
      <li><a href="#" v-on:click="openModelChooser"><i class="fa fa-upload"></i> Upload model</a></li>
      <li><a :href="'http://'+$store.state.hostName+':'+server.port+'/model'" download :download="server.name+'.ce'"><i class="fa fa-download"></i> Download model</a></li>
      <li class="divider"></li>
      <li><a href="#" class="red-text" v-on:click="clearNode"><i class="fa fa-ban"></i> Clear node</a></li>
    </ul>
    <button class="waves-effect btn hide-on-large-only node-dropdown-button" data-activates="node-dropdown">Options <i class="fa fa-caret-down"></i></button>

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
    <h4>Add CE</h4>
    <p>Add line-separated CE sentences to be processed in-order by the node.</p>
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
    component.$http.get('http://' + component.$store.state.hostName + ':' + component.server.port + '/info').then(response => {
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
      openCEModal (event) {
        event.preventDefault();
        $('.modal').modal();
        $('#modal1').modal('open');
      },
      submitCE () {
        this.$http.post('http://' + this.$store.state.hostName + ':' + this.server.port + '/sentences', this.customCE).then(() => refreshInfo(this));
      },
      clearNode (event) {
        event.preventDefault();
        const response = window.confirm('Really clear this node? This will remove all instances and concepts from the knowledge base.');
        if (response) {
          this.$http.put('http://' + this.$store.state.hostName + ':' + this.server.port + '/reset').then(() => refreshInfo(this));
        }
      },
      openModelChooser (event) {
        event.preventDefault();
        $('#modelChooser').click();               
      },
      loadModel (event){
        const files = event.target.files; 
        const reader = new FileReader();
        reader.onload = event2 => {
          this.$http.post('http://' + this.$store.state.hostName + ':' + this.server.port + '/sentences', event2.target.result).then(() => refreshInfo(this));
        }; 
        reader.readAsText(files && files[0]);
      }
    },
    created () {
      if (this.server.port) {
        refreshInfo(this);
      }
    },
    mounted () {
      $('.node-dropdown-button').dropdown({constrainWidth: false});
    }
  }
</script>

<style>
 .info-view{
   margin-top:60px;
 }
 h2 small{
   font-size:14px;
   color:rgb(100,100,100);
 }
</style>
