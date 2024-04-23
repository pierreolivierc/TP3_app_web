import { createRouter, createWebHistory } from 'vue-router'
import AreaFormView from "../views/AreaFormView.vue";
import AreasView from "../views/AreasView.vue";
import AreaView from "../views/AreaView.vue";
import IndexView from "../views/IndexView.vue";
import ProfileView from "../views/ProfileView.vue";
import RouteFormView from "../views/RouteFormView.vue";
import RouteView from "../views/RouteView.vue";
import SignIn from "../views/SignIn.vue";
import SignUpView from "../views/SignUpView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',
      name: '/IndexView',
      component: IndexView
    },
    {
      path: '/areas/new',
      name: 'AreaFormView',
      component: AreaFormView
    },
    {
      path: '/areas/:id/edi',
      name: 'AreaFormView',
      component: AreaFormView
    },
    {
      path: '/areas',
      name: 'AreasView',
      component: AreasView
    },
    {
      path: '/areas/:id',
      name: 'AreaView',
      component: AreaView
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: ProfileView
    },
    {
      path: '/routes/new',
      name: 'RouteFormView',
      component: RouteFormView
    },
    {
      path: '/routes/:id/edit',
      name: 'RouteFormView',
      component: RouteFormView
    },
    {
      path: '/routes/:id ',
      name: 'RouteView',
      component: RouteView
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUpView',
      component: SignUpView
    },
    { path: '/:notFound(.*)', component: NotFound }
  ],

  // scrollBehavior() permet de scroller au bon endroit lors d'une redirection
  // Cette fonction prend 3 paramètres :
  // to : objet contenant les informations de la route cible
  // from : objet contenant les informations de la route source
  // savedPosition : sauvegarde la position de la page quand on utilise le bouton précédent ou suivant du navigateur
  scrollBehavior(to, from, savedPosition) {
    console.log('savedPosition', savedPosition)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Si savedPosition existe, on scroll à la position sauvegardée
        if (savedPosition) {
          resolve(savedPosition)
        }
        resolve({ left: 0, top: 0 })
      }, 500)
    })
  }
})

export default router