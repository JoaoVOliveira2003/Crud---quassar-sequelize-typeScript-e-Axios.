import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/paginaCrudUsuarios.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/notas',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/paginaCrudNotas.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/dashboard',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/paginaDashboards.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/login',
    // component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/paginaLogin.vue') }],
  },
  {
    path: '/cadastro',
    // component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/paginaRegistro.vue') }],
  },

];

export default routes;
