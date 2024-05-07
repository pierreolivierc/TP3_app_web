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
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',
      name: 'IndexView',
      component: IndexView
    },
    {
      path: '/areas/new',
      name: 'AreaFormNewView',
      component: AreaFormView
    },
    {
      path: '/areas/:id/edit',
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
      name: 'RouteFormNewView',
      component: RouteFormView
    },
    {
      path: '/routes/:id/edit',
      name: 'RouteFormView',
      component: RouteFormView
    },
    {
      path: '/routes/:id',
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
  ]
})

export default router
