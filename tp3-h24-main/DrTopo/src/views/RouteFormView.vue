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
            <select id="type" class="form-control mx-2" v-model="type" required>
              <option v-for="type in climbingType" :key="type">{{ type }}</option>
            </select>
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="grade" class="form-label">Difficulté :</label>
            <select id="grade" class="form-control mx-2" v-model="grade.text" @change="updateGrade" required>
              <option v-for="grade in climbingGrades" :key="grade.value">{{ grade.text }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label for="lieu" class="form-label">Lieu :</label>
        <select id="lieu" class="form-control ms-2" v-model="area" @change="updateAreaId" required>
          <option v-for="area in areas" :key="area._id">{{ area.name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="approche" class="form-label">Approche :</label>
        <textarea class="form-control" id="approche" v-model="approche" rows="5" required></textarea>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description :</label>
        <textarea class="form-control" id="description" v-model="description" rows="5" required></textarea>
      </div>
      <div class="mb-3">
        <label for="descente" class="form-label">Descente :</label>
        <textarea class="form-control" id="descente" v-model="descente" rows="5" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Créer</button>
    </form>
  </div>
</template>

<script>
import {jwtDecode} from 'jwt-decode';
const url = import.meta.env.VITE_URL

export default {
  data() {
    return {
      name: '',
      type: '',
      difficulty: '',
      area: '',
      areaId: '',
      routeId: '',
      approche: '',
      description: '',
      descente: '',
      userId: '',
      isNewRoute: false,
      grade: {text: '', value: ''},
      climbingGrades: [],
      climbingType: [],
      areas: []
    };
  },
  async created() {
    const token = localStorage.getItem('jwt')
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded) {
        this.userId = decoded.userId
      }
    }
    else{
      this.$router.push('/forbidden');
    }

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
      this.routeId = routeId;
      this.getRoutes(routeId);
    }
  },
  mounted() {
    // Appel de la méthode getAreas lors de la création du composant
    this.getAreas();
  },
  methods: {
    submitForm() {
      const currentPath = window.location.pathname;

      if (currentPath.includes('/routes/new')) {
        this.createArea();
      } else {
        this.updateArea(this.routeId);
      }
    },
    updateAreaId() {
      const selectedArea = this.areas.find(area => area.name === this.area);
      if (selectedArea) {
        // Mise à jour de l'ID de la zone
        this.areaId = selectedArea._id;
      }
    },
    updateGrade(event) {
      const selectedIndex = event.target.selectedIndex;
      const selectedGrade = this.climbingGrades[selectedIndex];
      this.grade = {text: selectedGrade.text, value: selectedGrade.value}; // Mise à jour de grade
      console.log(this.grade)
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
    getRoutes(areaId) {
      fetch(url+`/routes/${areaId}`, {
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
            this.grade = this.climbingGrades.find(grade => grade.text === data.grade.text);
            this.area = data.area.name;
            this.approche = data.approach;
            this.description = data.description;
            this.descente = data.descent;

            this.updateAreaId();
          })
          .catch(error => {
            console.error(error);
          });
    },
    updateArea(routeId) {
      // if (this.validateForm()) {
      console.log(this.areaId)
      fetch(url+`/routes/${routeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          type: this.type,
          grade: this.grade,
          description: this.description,
          approach: this.approach,
          descent: this.descent,
          areaId: this.areaId,
          userId: this.userId,
        })
      })
          .then(_ => {
            this.$router.push('/profile')
          })
          .catch(error => {
            this.errorMessage = error.message
          })
    },
    createArea() {
      // if (this.validateForm()) {
      fetch(url+'/routes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          type: this.type,
          grade: this.grade,
          description: this.description,
          approach: this.approach,
          descent: this.descent,
          areaId: this.areaId,
          userId: this.userId,
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
}
;
</script>
