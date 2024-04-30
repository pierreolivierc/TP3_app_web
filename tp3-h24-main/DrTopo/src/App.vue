<template>
  <div>
    <nav-bar />
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import AppFooter from "@/components/Footer.vue"; // Renommer Footer en AppFooter

export default {
  name: 'App',
  components: {
    NavBar,
    AppFooter // Utiliser le composant renommé ici
  },
  data () {
    return {
    }
  }
}
</script>

<style>
#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  //-webkit-font-smoothing: antialiased;
  //-moz-osx-font-smoothing: grayscale;
  //text-align: left;
  //color: #2c3e50;
  //margin-top: 60px;
}
</style>
