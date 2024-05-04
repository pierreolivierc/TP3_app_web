<template>
  <div>
    <!-- Partie du haut -->
    <div class="container mt-5">
      <div class="row">
        <!-- Titre et sous-titre -->
        <div class="col-md-6">
          <h2>Au-delà du guide</h2>
          <h3 class="text-muted">Des milliers de voies partagées par pationné(e)s d'escalade comme vous!</h3>
        </div>
        <!-- Card formulaire -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Trouver une voie</h5>
              <form>
                <div class="form-row d-flex">
                  <!-- Selects -->
                  <div class="form-group col-md-4 d-flex">
                    <label for="type">Type</label>
                    <select id="type" class="form-control mx-2">
                      <option>SPORT</option>
                      <option>TRAD</option>
                      <option>TOPROPE</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <select id="difficultyMin" class="form-control mx-2">
                      <option>5.7</option>
                      <option>5.8</option>
                      <option>5.9</option>
                      <option>5.10</option>
                      <option>5.11</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4 d-flex ms-2">
                    <label for="difficultyMax" class="mx-2">à</label>
                    <select id="difficultyMax" class="form-control">
                      <option>5.7</option>
                      <option>5.8</option>
                      <option>5.9</option>
                      <option>5.10</option>
                      <option>5.11</option>
                    </select>
                  </div>
                </div>
                <div class="form-group d-flex my-3">
                  <label for="location">Lieux</label>
                  <select id="location" class="form-control ms-2">
                    <option>Falaise du Pic Vert</option>
                    <option>Grotte des Chimères</option>
                    <option>Mur du Dragon</option>
                    <option>Rocher du Griffon</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Rechercher</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Partie du bas -->
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <h2>Résultats</h2>
          <table class="table">
            <tbody>
              <!-- Insérez vos données fictives ici -->
              <tr>
                <td><a href="">Voie de la Cascade</a></td>
                <td><a href="">Voie de l'Aube</a></td>
                <td>5.8</td>
              </tr>
              <tr>
                <td><a href="">Voie du Crépuscule</a></td>
                <td><a href="">Voie de la Licorne</a></td>
                <td>5.9</td>
              </tr>
              <tr>
                <td><a href="">Voie de l'Aigle</a></td>
                <td><a href="">Voie de l'Ours</a></td>
                <td>5.10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexView"
}
</script>

<style scoped>
/* Ajoutez vos styles personnalisés ici */
</style>
