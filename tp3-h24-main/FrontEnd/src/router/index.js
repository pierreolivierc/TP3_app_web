import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/articles' },
    {
      path: '/articles',
      name: 'Articles',
      component: Articles
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue') // <== le code de ce composant
      // ne sera chargé qu'au moment où la route sera visitée pour la première fois,
    },
    {
      path: '/articles/:id',
      name: 'ArticleSingle',
      component: ArticleSingle
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