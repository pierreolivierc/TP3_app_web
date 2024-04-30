<template>
  <div class="container">
    <h1 class="mt-5 mb-4">Se connecter</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="username" class="form-label">Adresse courriel</label>
        <input type="text" class="form-control" id="username" v-model="username" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleSubmit() {
      // Handle form submission
      console.log({
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>
