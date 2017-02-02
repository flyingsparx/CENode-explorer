<template>
<div class="container">
  <h1>Concept</h1> 
</div>

</template>

<script>

  function refreshInfo (component){
    component.$http.get('http://localhost:' + component.server.port + '/concept?id=' + component.$store.state.route.params['id']).then(response => {
      console.log(response);
    });
  }

  export default {
    data () {
      return {
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
</style>
