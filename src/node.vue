<template>
<div class="container">
  <div v-if="server.name">
    <h2>{{server.name}} <small>on port {{server.port}}</small></h2>
    <button class="waves-effect btn"><i class="fa fa-plus"></i> Add CE</button>
    <button class="waves-effect btn"><i class="fa fa-ban"></i> Clear node</button>

    <h4>Recent instances</h4>
    <ul>
      <li v-for="instance in instances">{{instance.name}}</li>
    </ul>

    <h4>Recent concepts</h4>
    <ul>
      <li v-for="concept in concepts">{{concept.name}}</li>
    </ul>

  </div>
</div>
</template>

<script>
  export default {
    data () {
      return {
        instances: [],
        concepts: []
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
          this.$http.get('http://localhost:' + val.port + '/info').then(response => {
            this.instances = response.body.recentInstances;
            this.concepts = response.body.recentConcepts;
          });
        }
      }
    }
  }
</script>
