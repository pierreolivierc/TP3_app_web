<template>
  <div class="container">
    <h1 class="mt-5 mb-4" v-if="isNewArea">Création d'un lieu</h1>
    <h1 class="mt-5 mb-4" v-else>Modification d'un lieu</h1>
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
      <button type="submit" class="btn btn-primary">{{ isNewArea ? 'Créer' : 'Modifier' }}</button>
    </form>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
export default {
  data() {
    return {
      name: '',
      longitude: '',
      latitude: '',
      description: '',
      directions: '',
      userId: '',
      isNewArea: false,
      areaId: null
    };
  },
  created() {
    const currentPath = window.location.pathname;

    if (currentPath.includes('/areas/new')) {
      this.isNewArea = true; // C'est une nouvelle zone
    } else {
      const areaId = currentPath.replace(/^\/areas\/|\/edit$/g, '');
      this.areaId = areaId;
      this.getAreas(areaId);

    }
    const token = localStorage.getItem('jwt')
      if (token || token !== undefined) {
        const decoded = jwtDecode(token);
        if(decoded){
          this.userId = decoded.userId
        }
      }
  },
  methods: {
    getAreas(areaId) {
      fetch(`http://localhost:3000/areas/${areaId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token'),
        },
      })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des détails de la zone');
            }
            return response.json();
          })
          .then(data => {
            this.name = data.name;
            this.longitude = data.lon;
            this.latitude = data.lat;
            this.description = data.description;
            this.directions = data.gettingThere;
          })
          .catch(error => {
            console.error(error);
          });
    },
    submitForm() {
      const currentPath = window.location.pathname;
      if (currentPath.includes('/areas/new')) {
        this.createArea();
      } else {
        this.updateRoute(this.areaId);
      }
    },
    createArea() {
      // if (this.validateForm()) {
      fetch('http://localhost:3000/areas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          description: this.description,
          gettingThere: this.directions,
          lon: this.longitude,
          lat: this.latitude,
          user: this.userId

        })
      })

          .then(_ => {
            this.$router.push('/profile')
          })
          .catch(error => {
            this.errorMessage = error.message
          })
    },
    updateRoute(areaId) {
      // if (this.validateForm()) {
      fetch(`http://localhost:3000/areas/${areaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          description: this.description,
          gettingThere: this.directions,
          lon: this.longitude,
          lat: this.latitude

        })
      })

          .then(_ => {
            this.$router.push('/profile')
          })
          .catch(error => {
            this.errorMessage = error.message
          })
    }
  },

};
</script>
