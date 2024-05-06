<template>
  <div class="container">
    <h1 class="mt-5 mb-4">Se connecter</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="email" class="form-label">Adresse courriel</label>
        <input type="email" class="form-control" id="email" v-model="email" required
               :class="{ 'is-invalid': errorMessage }">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="password" v-model="password" required
               :class="{ 'is-invalid': errorMessage }">
      </div>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data: () => {
    return {
      email: "",
      password: "",
      errorMessage:""
    }
  },
  methods: {
    login() {
      fetch("http://localhost:3000/signIn", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })
          .then(response => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error('Le courriel ou le mot de passe saisi est incorrect.')
            }
          })
          .then(data => {
            localStorage.setItem('jwt', data.jwt)
            this.$router.push('/')
          })
          .catch(error => {
            this.errorMessage = error.message
          })
    }
  }
}
;
</script>
