<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <h2>{{ area.name }}</h2>
        <div class="card">
          <div id="map" style="height: 200px;"></div>
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
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
        this.showMap(data.lon, data.lat);
      })
      .catch(error => {
        console.error(error);
      });
    },
    showMap(lon, lat) {
      // Créer une carte Leaflet
      const map = L.map('map').setView([lat, lon], 13);

      // Ajouter une couche de tuile OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Ajouter un marqueur à l'emplacement spécifié
      L.marker([lat, lon]).addTo(map)
        .bindPopup(this.area.name) // Ajouter un popup avec le nom de l'area
        .openPopup();
    }
  }
};
</script>

<style scoped>
</style>
