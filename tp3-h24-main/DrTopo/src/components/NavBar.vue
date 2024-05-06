<template>
  <div class=" bg-dark border-bottom border-body" data-bs-theme="dark">
    <nav class="navbar navbar-expand-lg d-flex justify-content-between container">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link me-3 py-2" :class="{ 'active': $route.path === '/' }">DrTopo</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/areas" class="nav-link me-3 py-2" :class="{ 'active': $route.path === '/areas' }">Lieux
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link v-show="!isLogged" to="/signin" class="nav-link me-3 py-2" :class="{ 'active': $route.path === '/signin' }">
            Connexion
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-show="!isLogged" to="/signup" class="nav-link me-3 py-2" :class="{ 'active': $route.path === '/signup' }">
            Inscription
          </router-link>
        </li>
        <li>
          <router-link v-show="isLogged"  to="/profile" class="nav-link me-3 py-2" :class="{ 'active': $route.path === '/profile' }">
            {{ username }}
          </router-link>
        </li>
        <li>
          <router-link v-on:click="logout" v-show="isLogged" to="/" class="nav-link me-3 py-2 ">
            Deconnexion
          </router-link>
        </li>

      </ul>
    </nav>
  </div>

</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import { jwtDecode } from 'jwt-decode';

export default {
  data() {
    return {
      isLogged: false,
      username: ""
    }
  },
  watch: {
    '$route' () {
      this.isLogged = localStorage.getItem('jwt') !== null
      const token = localStorage.getItem('jwt')
      if (token) {
        const decoded = jwtDecode(token);
        this.username = decoded.username
      } else {
        this.username = "";
      }
    }
  },
  created() {
    this.isLogged = localStorage.getItem('jwt') !== null
    const token = localStorage.getItem('jwt')
      if (token) {
        const decoded = jwtDecode(token);
        this.username = decoded.username
      }
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt')
      this.isLogged = false
      this.username = "";
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

