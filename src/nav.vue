<template>
  <div>
    <ul id='server-dropdown' class='dropdown-content'>
      <li><router-link to="/"><i class="fa fa-fw fa-cog"></i> Manage</router-link></li>
      <li><router-link to="/new"><i class="fa fa-fw fa-plus"></i> New</router-link></li>
      <li class="divider"></li>
      <li v-for="server in servers"><router-link :to="{ name: 'node', params: { name: server.name }}">{{server.name}}</router-link></li>
    </ul>

    <ul id='mobile-dropdown' class='dropdown-content' data-constrainWidth="false">
      <li><router-link to="/"><i class="fa fa-fw fa-cog"></i> Manage nodes</router-link></li>
      <li><router-link to="/new"><i class="fa fa-fw fa-plus"></i> New node</router-link></li>
      <li class="divider"></li>
      <li v-for="server in servers"><router-link :to="{ name: 'node', params: { name: server.name }}">{{server.name}}</router-link></li>
    </ul>

   <nav>
      <div class="nav-wrapper">
        <router-link to="/" class="brand-logo"><img src="/static/logo.png" style="height:55px;"></router-link>
        <ul class="right hide-on-large-only">
          <li><a href='#' class="mobile-dropdown-button" data-activates='mobile-dropdown'><i class="fa fa-bars"></i></a></li>
        </ul>
        <ul class="right hide-on-med-and-down">
          <li><a href='#' class="server-dropdown-button" data-activates='server-dropdown'>Switch node <i class="fa fa-caret-down"></i></a></li>
          <li v-if="server.name"><router-link :to="{ name: 'node', params: { name: server.name }}">{{server.name}}</router-link></li>
          <li><router-link to="/new" class="waves-effect waves-light btn">Launch node</router-link></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  
  export default {
    data () {
      return {
        servers: this.$store.state.servers
      }
    },
    computed: {
      server () {
        return this.$store.getters.currentServer
      }
    },
    mounted () {
      $('.mobile-dropdown-button').dropdown({constrainWidth: false});
      $('.server-dropdown-button').dropdown({constrainWidth: false});
    }
  };
</script>

<style>
nav .nav-wrapper ul li a i{
  height:2px;
}
</style>
