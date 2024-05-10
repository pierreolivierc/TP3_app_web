<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <h2>Lieux</h2>
        <table class="table table-striped">
          <tbody>
            <!-- Utilisation de v-for pour parcourir les areas -->
            <tr v-for="area in areas" :key="area._id">
              <!-- Affichage du nom de l'area -->
              <td><a :href="`/areas/${area._id}`">{{ area.name }}</a></td>
              <!-- Affichage du nombre de voies -->
              <td>{{ area.routes.length }} voies</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      areas: []
    };
  },
  mounted() {
    // Appel de la méthode getAreas lors de la création du composant
    this.getAreas();
  },
  methods: {
    getAreas() {
      fetch(import.meta.env.VITE_URL+"/areas/", {
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
    }
  }
};
</script>

<style scoped>
</style>
