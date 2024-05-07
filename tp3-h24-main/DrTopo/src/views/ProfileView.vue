<template>
  <div class="container mt-5">
    <h2>Profile</h2>
    <p>Nom: {{ user.username }}</p>
    <div class="col-md-12">
      <h2>Mes lieux <a href="/areas/new">ajouter</a></h2>
      <table class="table table-striped">
        <tbody>
          <tr v-for="(area, index) in areas" :key="index">
            <td><a :href="'/areas/' + area._id">{{ area.name }}</a></td>
            <td>{{ area.location }}</td>
            <td><a :href="'/areas/' + area._id + '/edi'">modifier</a> <a href="#" @click="deleteArea(area._id)">supprimer</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-12">
      <h2>Mes voies <a href="/routes/new">ajouter</a></h2>
      <table class="table table-striped">
        <tbody>
          <tr v-for="(route, index) in routes" :key="index">
            <td><a :href="'/routes/' + route._id">{{ route.name }}</a></td>
            <td>{{ route.area }}</td>
            <td><a :href="'/routes/' + route._id + '/edit'">modifier</a> <a :href="'/routes/' + route._id + '/delete'">supprimer</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
export default {
  data() {
    return {
      user: {
        username: "",
        id: ""
      },
      areas: []
    };
  },
  created() {
    const token = localStorage.getItem('jwt')
    if (token) {
      const decoded = jwtDecode(token);
      this.user.username = decoded.username;
      this.user.id = decoded.userId;
    }
  },
  mounted() {
    this.getUserAreas(this.user.id);
  },
  methods: {
    getUserAreas(userId) {
      fetch(`http://localhost:3000/areas/my-areas/${userId}`, {
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
        this.areas = data;
        this.routes = data.routes;
      })
      .catch(error => {
        console.error(error);
      });
    },
    deleteArea(areaId) {
      fetch(`http://localhost:3000/areas/${areaId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token'),
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de la zone');
        }
        // Si la suppression réussit, actualisez les zones pour refléter les modifications
        this.getUserAreas(this.user.id);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
};
</script>
