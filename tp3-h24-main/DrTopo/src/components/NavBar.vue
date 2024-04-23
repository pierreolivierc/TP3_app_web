<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/" class="me-3 py-2 ">IndexView</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/areas" class="me-3 py-2 ">AreasView</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
</script>

<style scoped>
/* Ces deux classes sont automatiquement ajoutées au liens par le systeme de routage */
/* Elles permettent de rendre les liens actifs avec une couleur différentes */
a.router-link-active,
a.router-link-exact-active {
  color: #ec0f0f;
}
</style>