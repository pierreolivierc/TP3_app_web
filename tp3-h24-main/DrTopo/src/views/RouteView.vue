<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <h2><strong>{{ route.name }}</strong></h2>
        <h3><strong>{{ route.grade.text }}</strong></h3>
        <div>
          <div class="d-flex"><p>Lieux:</p></div>
          <div class="d-flex"><p>Type:</p></div>
          <div class="d-flex"><p>Partagé par:</p></div>
        </div>
        <h3>Approche</h3>
        <p>{{ route.approach }}</p>
        <h3>Description</h3>
        <p>{{ route.description }}</p>
        <h3>Descente</h3>
        <p>{{ route.descent }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      route: {}
    };
  },
  mounted() {
    // Récupérer l'ID de l'URL
    const routeId = this.$route.params.id;
    console.log(routeId);
    // Appeler la méthode pour récupérer les détails de la route
    this.getRoute(routeId);
  },
  methods: {
    getRoute(routeId) {
      fetch(`http://localhost:3000/routes/${routeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token'),
        },
      })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des détails de la route');
            }
            return response.json();
          })
          .then(data => {
            // Vérifier si les données sont correctes
            if (!data || Object.keys(data).length === 0) {
              throw new Error('Aucune donnée de route récupérée');
            }
            this.route = data;
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
};
</script>

<style scoped>
/* Ajoutez vos styles personnalisés ici */
</style>
