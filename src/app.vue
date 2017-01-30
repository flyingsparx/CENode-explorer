<template>
  <div class="message"><i class="fa fa-home"></i> {{ msg }}</div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Hello from vue-loader!'
      }
    }
  }
</script>

<style>
  .message {
    color: red;
  }
</style>

