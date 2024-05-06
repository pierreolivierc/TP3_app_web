<template>
  <div class="container">
    <h1 class="mt-5 mb-4">Création d'un lieu</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Nom :</label>
        <input type="text" class="form-control" id="name" v-model="name" required>
      </div>
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="longitude" class="form-label">Longitude :</label>
            <input type="text" class="form-control" id="longitude" v-model="longitude" required>
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="latitude" class="form-label">Latitude :</label>
            <input type="text" class="form-control" id="latitude" v-model="latitude" required>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description :</label>
        <textarea class="form-control" id="description" v-model="description" rows="5" required></textarea>
      </div>
      <div class="mb-3">
        <label for="directions" class="form-label">S'y rendre :</label>
        <textarea class="form-control" id="directions" v-model="directions" rows="5" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Créer</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      longitude: '',
      latitude: '',
      description: '',
      directions: ''
    };
  },
  methods: {
    submitForm() {
      // Handle form submission
      console.log('Formulaire envoyé');
    }
  }
};
</script>
