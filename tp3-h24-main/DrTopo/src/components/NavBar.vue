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
          <router-link to="/signin" class="nav-link me-3 py-2" :class="{ 'active': $route.path === '/signin' }">
            Connexion
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/signup" class="nav-link me-3 py-2" :class="{ 'active': $route.path === '/signup' }">
            Inscription
          </router-link>
        </li>
      </ul>
    </nav>
  </div>

</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
</script>
