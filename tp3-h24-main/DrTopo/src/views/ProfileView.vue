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
            <td><a :href="'/areas/' + area._id + '/edit'">modifier</a> <a href="#" @click="deleteArea(area._id)">supprimer</a></td>
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
            <td><a :href="'/areas/' + route.area._id">{{route.area.name}}</a></td>
            <td>{{route.grade.text}}</td>
            <td>{{route.type}}</td>
            <td><a :href="'/routes/' + route._id + '/edit'">modifier</a> <a href="#" @click="deleteRoute(route._id)">supprimer</a></td>
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
      areas: [],
      routes: []
    };
  },
  created() {
    const token = localStorage.getItem('jwt')
    if (token) {
      const decoded = jwtDecode(token);
      this.user.username = decoded.username;
      this.user.id = decoded.userId;
    }
    else{
      this.$router.push('/forbidden');
    }
  },
  mounted() {
    this.getUserAreas(this.user.id);
    this.getUserRoutes(this.user.id);
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
    getUserRoutes(userId) {
      fetch(`http://localhost:3000/routes/my-routes/${userId}`, {
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
        this.routes = data;
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
    },
    deleteRoute(routeId) {
      fetch(`http://localhost:3000/routes/${routeId}`, {
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
        this.getUserRoutes(this.user.id);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
};
</script>
