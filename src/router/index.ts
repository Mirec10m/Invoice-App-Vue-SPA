import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/login', name: 'login', component: () => import('@/views/auth/Login.vue')},
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/error/404.vue') },

    {
      path: '/',
      name: 'home',
      component: () => import('@/views/AppLayout.vue'),
      meta: {auth: true},
      children: [
        {
          path: '/invoices',
          name: 'invoices.index',
          component: () => import('@/views/invoices/Index.vue'),
          meta: {auth: true},
          children: [
            {
              path: '/invoices/create',
              name: 'invoices.create',
              component: () => import('@/views/invoices/Create.vue'),
              meta: {auth: true}
            },
            {
              path: '/invoices/edit/:id',
              name: 'invoices.edit',
              component: () => import('@/views/invoices/Edit.vue'),
              meta: {auth: true}
            }
          ]
        },
        {
          path: '/customers',
          name: 'customers.index',
          component: () => import('@/views/customers/Index.vue'),
          meta: {auth: true},
          children: [
            {
              path: '/customers/create',
              name: 'customers.create',
              component: () => import('@/views/customers/Create.vue'),
              meta: {auth: true}
            },
            {
              path: '/customers/edit/:id',
              name: 'customers.edit',
              component: () => import('@/views/customers/Edit.vue'),
              meta: {auth: true}
            }
          ]
        },
      ]
    }
  ],
  linkActiveClass: "active",
})

router.beforeEach((to, from) => {
  const auth = useAuthStore()

  if (to.meta.auth && !auth.authenticated) {
    auth.setRedirect(to.fullPath)
    auth.setPreloading(true)
    auth.redirectIfAuthenticated()

    return {name: 'login'}
  }
})

export default router
