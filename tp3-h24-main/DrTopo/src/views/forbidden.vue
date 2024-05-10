<template>
  <div class="forbidden-page">
    <div class="container text-center">
      <h1 class="display-4">Erreur 403</h1>
      <p class="lead">Désolé, vous n'êtes pas autorisé à accéder à cette page.</p>
      <router-link to="/" class="btn btn-primary">Retour à la page d'accueil</router-link>
    </div>
  </div>
</template>

<style scoped>
.forbidden-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
