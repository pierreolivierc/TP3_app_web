<template>
  <div class="container">
    <h1 class="mt-5 mb-4">Créer un compte</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="username" class="form-label">Nom d'utilisateur</label>
        <input type="text" class="form-control" id="username" v-model="username" required
               :class="{ 'is-invalid': nameError }">
        <div class="invalid-feedback" v-if="nameError">{{ nameError }}</div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Adresse courriel</label>
        <input type="email" class="form-control" id="email" v-model="email" required
               :class="{ 'is-invalid': emailError }">
        <div class="invalid-feedback" v-if="emailError">{{ emailError }}</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="password" v-model="password" required
               :class="{ 'is-invalid': passwordError }">
        <div class="invalid-feedback" v-if="passwordError">{{ passwordError }}</div>
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirmer le mot de passe</label>
        <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required
               :class="{ 'is-invalid': passwordError }">
        <div class="invalid-feedback" v-if="passwordError">{{ passwordError }}</div>
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
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      nameError: "",
      emailError: "",
      passwordError: ""

    };
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.nameError = "";
      this.emailError = "";
      this.passwordError = "";

      if (!this.username) {
        this.nameError = "Veuillez entrer votre nom d'utilisateur";
        isValid = false;
      } else if (this.username.length < 3 || this.username.length > 50) {
        this.nameError = "Le nom d'utilisateur doit être entre 3 et 50 caractères";
        isValid = false;
      }

      if (!this.email) {
        this.emailError = "Veuillez entrer votre adresse courriel";
        isValid = false;
      } else if (!this.isValidEmail(this.email)) {
        this.emailError = "Veuillez entrer une adresse courriel valide";
        isValid = false;
      } else if (this.username.length > 50) {
        this.emailError = "Le courriel ne devrait pas dépasser 50 caractères";
        isValid = false;
      }


      if (this.password !== this.confirmPassword) {
        this.passwordError = 'Les mots de passe ne correspondent pas';
        isValid = false;
      } else if (this.password.length < 6) {
        this.passwordError = 'Les mots de passe doivent comporter au moins 6 caractères';
        isValid = false;
      }

      return isValid;
    },
    submitForm() {
      if (this.validateForm()) {
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password
          })
        })
            .then(response => {
              if (response.ok) {
                return response.json()
              } else if (response.status === 409) {
                this.emailError = "Cette adresse courriel est déjà utilisée. Veuillez en choisir une autre.";
                return Promise.reject("Email déjà utilisé"); // Ajoutez cette ligne pour arrêter la chaîne de promesses
              } else {
                this.emailError = "Impossible de se connecter";
                return Promise.reject("Impossible de se connecter"); // Ajoutez cette ligne pour arrêter la chaîne de promesses
              }
            })
            .then(data => {
              localStorage.setItem('jwt', data.jwt);
              this.$router.push('/');
            })
            .catch(error => {
              this.errorMessage = error.message;
            });
      }
    },
    isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
  }
};
</script>

