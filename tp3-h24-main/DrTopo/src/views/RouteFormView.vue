<template>
  <div class="container">
    <h1 class="mt-5 mb-4" v-if="isNewRoute">Création d'une voie</h1>
    <h1 class="mt-5 mb-4" v-else>Modification d'une voie</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Nom :</label>
        <input type="text" class="form-control" id="name" v-model="name" required>
      </div>
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="type" class="form-label">Type :</label>
            <select id="type" class="form-control mx-2" v-model="type">
              <option v-for="type in climbingType" :key="type">{{ type }}</option>
            </select>
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="grade" class="form-label">Difficulté :</label>
            <select id="grade" class="form-control mx-2" v-model="difficulty">
              <option v-for="grade in climbingGrades" :key="grade">{{ grade }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label for="lieu" class="form-label">Lieu :</label>
        <select id="lieu" class="form-control ms-2" v-model="area">
          <option v-for="area in areas" :key="area._id">{{ area.name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="directions" class="form-label">Approche :</label>
        <textarea class="form-control" id="directions" v-model="approche" rows="5" required></textarea>
      </div>
      <div class="mb-3">
        <label for="directions" class="form-label">Description :</label>
        <textarea class="form-control" id="directions" v-model="description" rows="5" required></textarea>
      </div>
      <div class="mb-3">
        <label for="directions" class="form-label">Descente :</label>
        <textarea class="form-control" id="directions" v-model="descente" rows="5" required></textarea>
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
      type: '',
      difficulty: '',
      area: '',
      approche: '',
      description: '',
      descente: '',
      isNewRoute: false,
      climbingGrades: [],
      climbingType: [],
      areas: []
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

    const currentPath = window.location.pathname;

    if (currentPath.includes('/routes/new')) {
      this.isNewRoute = true; // C'est une nouvelle zone
    } else {
      const routeId = currentPath.replace(/^\/routes\/|\/edit$/g, '');
      this.areaId = routeId;
      this.getRoutes(routeId);
    }
  },
  mounted() {
    // Appel de la méthode getAreas lors de la création du composant
    this.getAreas();
  },
  methods: {
    submitForm() {
      // Handle form submission
      console.log('Formulaire envoyé');
    },
    getAreas() {
      fetch("http://localhost:3000/areas/", {
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
    getRoutes(areaId) {
      fetch(`http://localhost:3000/routes/${areaId}`, {
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
            this.type = data.type;
            this.difficulty = data.grade.text;
            this.area = data.area.name;
            this.approche = data.approach;
            this.description = data.description;
            this.descente = data.descent;
          })
          .catch(error => {
            console.error(error);
          });
    },
  }
};
</script>
