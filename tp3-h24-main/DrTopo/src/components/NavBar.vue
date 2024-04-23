<template>
  <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
    <router-link to="/articles" class="me-3 py-2 " >
      Articles
    </router-link>
    <!-- exemple route nommée -->
    <router-link :to="{ name: 'About' }" class="me-3 py-2 " >
      À propos
    </router-link>
  </nav>
</template>

<style scoped>
/* Ces deux classes sont automatiquement ajoutées au liens par le systeme de routage */
/* Elles permettent de rendre les liens actifs avec une couleur différentes */
a.router-link-active,
a.router-link-exact-active {
  color: #ec0f0f;
}
</style>