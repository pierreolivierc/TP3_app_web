<template>
  <div class="container">
    <h1 class="mt-5 mb-4" v-if="isNewArea">Création d'un lieu</h1>
    <h1 class="mt-5 mb-4" v-else>Modification d'un lieu</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Nom :</label>
        <input type="text" class="form-control" id="name" v-model="name" :class="{ 'is-invalid': nameError }" required>
        <div class="invalid-feedback" v-if="nameError">{{ nameError }}</div>
      </div>
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="longitude" class="form-label">Longitude :</label>
            <input type="text" class="form-control" id="longitude" v-model="longitude" :class="{ 'is-invalid': longitudeError }" required>
            <div class="invalid-feedback" v-if="longitudeError">{{ longitudeError }}</div>
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="latitude" class="form-label">Latitude :</label>
            <input type="text" class="form-control" id="latitude" v-model="latitude" :class="{ 'is-invalid': latitudeError }" required>
            <div class="invalid-feedback" v-if="latitudeError">{{ latitudeError }}</div>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description :</label>
        <textarea class="form-control" id="description" v-model="description" :class="{ 'is-invalid': descriptionError }" rows="5" required></textarea>
        <div class="invalid-feedback" v-if="descriptionError">{{ descriptionError }}</div>
      </div>
      <div class="mb-3">
        <label for="directions" class="form-label">S'y rendre :</label>
        <textarea class="form-control" id="directions" v-model="directions" :class="{ 'is-invalid': directionsError }" rows="5" required></textarea>
        <div class="invalid-feedback" v-if="directionsError">{{ directionsError }}</div>
      </div>
      <button type="submit" class="btn btn-primary">{{ isNewArea ? 'Créer' : 'Modifier' }}</button>
      <!-- Feedback messages -->
      <div v-if="feedbackMessage" class="mt-3">
        <div :class="[ 'alert', feedbackClass ]">{{ feedbackMessage }}</div>
      </div>
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
      areaId: null,
      feedbackMessage: '',
      feedbackClass: '',
      nameError: '',
      longitudeError: '',
      latitudeError: '',
      descriptionError: '',
      directionsError: ''
    };
  },
  created() {
    const token = localStorage.getItem('jwt')
    if (token) {
      const decoded = jwtDecode(token);
      if(decoded){
        this.userId = decoded.userId
      }
    }else{
      this.$router.push('/forbidden');
    }


    const currentPath = window.location.pathname;

    if (currentPath.includes('/areas/new')) {
      this.isNewArea = true; // C'est une nouvelle zone
    } else {
      const areaId = currentPath.replace(/^\/areas\/|\/edit$/g, '');
      this.areaId = areaId;
      this.getAreas(areaId);
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
        // Vérification de la validité des données
        let isValid = true;
        if (isNaN(parseFloat(this.latitude))) {
          this.latitudeError = 'Veuillez entrer un nombre valide pour la latitude.';
          isValid = false;
        } else {
          this.latitudeError = '';
        }
        if (isNaN(parseFloat(this.longitude))) {
          this.longitudeError = 'Veuillez entrer un nombre valide pour la longitude.';
          isValid = false;
        } else {
          this.longitudeError = '';
        }
        if (!isValid) {
          return;
        }
        this.createArea();
      } else {
        this.updateRoute(this.areaId);
      }
    },
    createArea() {
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
        .then(response => {
          if (response.ok) {
            this.showFeedback('Lieu créé avec succès.', 'alert-success');
            this.$router.push('/profile');
          } else {
            throw new Error('Erreur lors de la création du lieu.');
          }
        })
        .catch(error => {
          this.showFeedback(error.message, 'alert-danger');
        });
    },
    updateRoute(areaId) {
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
        .then(response => {
          if (response.ok) {
            this.showFeedback('Lieu modifié avec succès.', 'alert-success');
            this.$router.push('/profile');
          } else {
            throw new Error('Erreur lors de la modification du lieu.');
          }
        })
        .catch(error => {
          this.showFeedback(error.message, 'alert-danger');
        });
    },
    showFeedback(message, cssClass) {
      this.feedbackMessage = message;
      this.feedbackClass = cssClass;
      setTimeout(() => {
        this.feedbackMessage = '';
        this.feedbackClass = '';
      }, 5000);
    }
  }
};
</script>
