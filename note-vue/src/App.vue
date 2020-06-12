<template>
<v-app>
  <div id="app">
  Welcome
    <router-view />
    <iframe width="0" height="0" src="/silent-refresh.html" frameborder="0"></iframe>
  </div>
</v-app>
</template>
<script lang="ts">
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
