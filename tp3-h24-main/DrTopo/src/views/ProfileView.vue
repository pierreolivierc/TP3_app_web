<template>
  <div class="container mt-5">
    <h2>Profile</h2>
    <p>Nom: {{ user.username }}</p>
    <div class="col-md-12">
      <h2>Mes lieux <a href="/areas/new">ajouter</a></h2>
      <table class="table table-striped">
        <tbody>
          <tr v-for="(area, index) in areas" :key="index">
            <td><a :href="'/areas/' + area.id">{{ area.name }}</a></td>
            <td>{{ area.location }}</td>
            <td><a href="/areas/new/">modifier</a> <a href="/areas/new/">supprimer</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-12">
      <h2>Mes voies <a href="/routes/new">ajouter</a></h2>
      <table class="table table-striped">
        <tbody>
          <tr v-for="(route, index) in routes" :key="index">
            <td><a :href="'/routes/' + route.id">{{ route.name }}</a></td>
            <td>{{ route.area }}</td>
            <td><a href="/areas/new/">modifier</a> <a href="/areas/new/">supprimer</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileView",
  data() {
    return {
      user: {
        username: "JohnDoe" // Mettez ici le nom d'utilisateur de l'utilisateur connecté
      },
      areas: [
        { id: 1, name: "Voie de la Cascade", location: "Cascade"},
        { id: 2, name: "Voie de l'Aube", location: "Montagne" },
        { id: 3, name: "Voie du Crépuscule", location: "Forêt"}
      ],
      routes: [
        { id: 1, name: "Voie de la Cascade", area: "Cascade"},
        { id: 2, name: "Voie de l'Aube", area: "Montagne"},
        { id: 3, name: "Voie du Crépuscule", area: "Forêt"}
      ]
    };
  }
};
</script>
