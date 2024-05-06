<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <h2>{{ area.name }}</h2>
        <div class="card">
          <div class="card-body">
          </div>
        </div>
        <h3>Description</h3>
        <p>{{ area.description }}</p>
        <h3>S'y rendre</h3>
        <p>{{ area.gettingThere }}</p>
        <h3>Voies</h3>
        <table class="table table-striped">
          <tbody>
            <tr v-for="route in area.routes" :key="route._id">
              <td><a :href="`/routes/${route._id}`">{{ route.name }}</a></td>
              <td>{{ route.type }}</td>
              <td>{{ route.grade.text }}</td>
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
      area: {}
    };
  },
  mounted() {
    // Récupérer l'ID de l'URL
    const areaId = this.$route.params.id;
    // Appeler la méthode pour récupérer les détails de la zone
    this.getArea(areaId);
  },
  methods: {
    getArea(areaId) {
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
        this.area = data;
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
