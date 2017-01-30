<template>
  <div class="message">{{ msg }}</div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'settings'
      }
    }
  }
</script>

<style>
  /*@import "{}/node_modules/materialize-css/dist/css/materialize.min.css";*/
  .message {
    color: red;
  }
</style>

