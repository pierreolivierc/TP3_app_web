<template>
  <div class="container">
    <h1 class="mt-5 mb-4">Créer un compte</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="username" class="form-label">Nom d'utilisateur</label>
        <input type="text" class="form-control" id="username" v-model="username" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Adresse courriel</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirmer le mot de passe</label>
        <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <button type="submit" class="btn btn-primary">Créer un compte</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUpView",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    handleSubmit() {
      // Vérification de la correspondance des mots de passe
      if (this.password !== this.confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
      }

      // Handle form submission
      console.log({
        username: this.username,
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

