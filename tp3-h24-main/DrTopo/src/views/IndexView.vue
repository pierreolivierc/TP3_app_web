<template>
  <div>
    <!-- Partie du haut -->
    <div class="container mt-5">
      <div class="row">
        <!-- Titre et sous-titre -->
        <div class="col-md-6">
          <h2>Au-delà du guide</h2>
          <h3 class="text-muted">Des milliers de voies partagées par passionné(e)s d'escalade comme vous!</h3>
        </div>
        <!-- Card formulaire -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Trouver une voie</h5>
              <form @submit.prevent="getFilteredRoutes" class="needs-validation" novalidate>
                <div class="form-row d-flex">
                  <!-- Selects -->
                  <div class="form-group col-md-4 d-flex">
                    <label for="type">Type</label>
                    <select id="type" class="form-control mx-2" v-model="selectedType" required>
                      <option v-for="type in climbingType" :key="type">{{ type }}</option>
                    </select>
                    <div class="invalid-feedback">Veuillez sélectionner un type.</div>
                  </div>
                  <div class="form-group col-md-4">
                    <select id="difficultyMin" class="form-control mx-2" @change="updateGrade" required>
                      <option v-for="grade in climbingGrades" :key="grade.value" :value="grade.value">{{ grade.text }}</option>
                    </select>
                    <div class="invalid-feedback">Veuillez sélectionner une difficulté minimale.</div>
                  </div>
                  <div class="form-group col-md-4 d-flex ms-2">
                    <label for="difficultyMax" class="mx-2">à</label>
                    <select id="difficultyMax" class="form-control" @change="updateGradeMax" required>
                      <option v-for="grade in climbingGrades" :key="grade.value" :value="grade.value">{{ grade.text }}</option>
                    </select>
                    <div class="invalid-feedback">Veuillez sélectionner une difficulté maximale.</div>
                  </div>
                </div>
                <div class="form-group d-flex my-3">
                  <label for="location">Lieux</label>
                  <select id="location" class="form-control ms-2" v-model="selectedLocation" required>
                    <option v-for="area in areas" :key="area._id" :value="area._id">{{ area.name }}</option>
                  </select>
                  <div class="invalid-feedback">Veuillez sélectionner un lieu.</div>
                </div>
                <button type="submit" class="btn btn-primary">Rechercher</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Partie du bas -->
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <h2>Résultats</h2>
          <table class="table table-striped">
            <tbody>
            <tr v-for="(route, index) in filteredRoutes" :key="index">
              <td><a :href="'/routes/' + route._id">{{ route.name }}</a></td>
              <td><a :href="'/areas/' + route.area._id">{{ route.area.name }}</a></td>
              <td>{{ route.grade.text }}</td>
              <td>{{ route.type }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const url = import.meta.env.VITE_URL
export default {
  name: "IndexView",
  data() {
    return {
      climbingGrades: [],
      climbingType: [],
      areas: [],
      routes: [],
      selectedType: '',
      selectedMinDifficulty: '5.00',
      selectedMaxDifficulty: '5.00',
      selectedLocation: '',
      filteredRoutes: []
    };
  },
  async created() {
    try {
      const response = await fetch('../../public/grade.json');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      this.climbingGrades = data.climbingGrades;
      this.climbingType = data.climbingType;
    } catch (error) {
      console.error('Error fetching climbing grades:', error.message);
    }
  },
  mounted() {
    // Appel de la méthode getAreas lors de la création du composant
    this.getAreas();
  },
  methods: {
    updateGrade(event) {
      this.selectedMinDifficulty = event.target.value;
    },
    updateGradeMax(event) {
      this.selectedMaxDifficulty = event.target.value;
    },
    getAreas() {
      fetch(url+"/areas/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token'),
        },
      })
          .then(response => response.json())
          .then(data => {
            this.areas = data;
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des areas :', error);
          });
    },
    getFilteredRoutes() {
      // Vérification de la sélection de toutes les options
      if (!this.selectedType || !this.selectedMinDifficulty || !this.selectedMaxDifficulty || !this.selectedLocation) {
        // Affichage d'un message d'erreur ou d'une action appropriée
        console.error("Veuillez remplir tous les champs du formulaire.");
        return; // Arrêt de la fonction si tous les champs ne sont pas remplis
      }

      // Si tous les champs sont remplis, procédez à la requête
      fetch(url+`/routes/?type=${this.selectedType}&minDifficulty=${this.selectedMinDifficulty}&maxDifficulty=${this.selectedMaxDifficulty}&location=${this.selectedLocation}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token'),
        },
      })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des routes');
            }
            return response.json();
          })
          .then(data => {
            this.filteredRoutes = data;
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
};
</script>

<style scoped>
</style>
