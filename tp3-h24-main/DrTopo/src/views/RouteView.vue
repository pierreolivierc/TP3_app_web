<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <h2><strong>{{ route.name }}</strong></h2>
        <h3><strong>{{ route.grade.text }}</strong></h3>
        <div>
          <div class="d-flex"><p class="me-3">Lieux:</p><p>{{route.area.name}}</p></div>
          <div class="d-flex"><p class="me-3">Type:</p><p>{{route.type}}</p></div>
          <div class="d-flex"><p class="me-3">Partagé par:</p><p>{{route.user.username}}</p></div>
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
const url = import.meta.env.VITE_URL
export default {
  data() {
    return {
      route: {}
    };
  },
  created() {
    // Récupérer l'ID de l'URL
    const routeId = this.$route.params.id;
    console.log(routeId);
    // Appeler la méthode pour récupérer les détails de la route
    this.getRoute(routeId);
  },
  methods: {
    getRoute(routeId) {
      fetch(url+`/routes/${routeId}`, {
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
