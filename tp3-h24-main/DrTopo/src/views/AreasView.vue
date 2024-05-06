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
              <td><a :href="`/area/${area._id}`">{{ area.name }}</a></td>
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
import getAreas from "../../../api/controllers/areaController.js";

export default {
  data() {
    return {
      areas: []
    };
  },
  getArticles() {
      fetch("http://monapi.com/articles/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token'),
        },
      })
      .then(response => response.json())
      .then(data => {
        this.areas = data.posts
      })
    }
};
</script>

<style scoped>
</style>