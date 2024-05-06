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
            Profil
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
// import { jwtDecode  } from 'jwt-decode';

export default {
  data() {
    return {
      isLogged: false,
      user: {}
    }
  },
  watch: {
    '$route' () {
      this.isLogged = localStorage.getItem('jwt') !== null
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      // if (token) {
      //   const decoded = jwtDecode(token);
      //   this.user = decoded.user;
      // } else {
      //   this.user = {};
      // }
    }
  },
  created() {
    this.isLogged = localStorage.getItem('jwt') !== null
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    // if (token) {
    //   const decoded = jwtDecode(token);
    //   this.user = decoded.user;
    // }
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt')
      this.isLogged = false
      this.user = {};
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
