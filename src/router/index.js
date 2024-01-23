import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: () => import('../views/admin-page.vue')
    },    
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin-page.vue')
    },    
    {
      path: '/website',
      name: 'website',
      component: () => import('../views/website-page.vue')
    },    
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/users-page.vue')
    },  
    {
      path: '/support',
      name: 'support',
      component: () => import('../views/support-page.vue')
    },
  ]
})

export default router
