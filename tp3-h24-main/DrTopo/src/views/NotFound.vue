<template>
  <div class="not-found-page">
    <div class="container text-center">
      <h1 class="display-4">Oops! Page introuvable</h1>
      <p class="lead">La page que vous recherchez semble introuvable.</p>
      <p class="lead">Il se peut qu'elle ait été déplacée ou supprimée.</p>
      <router-link to="/" class="btn btn-primary">Retour à la page d'accueil</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
