const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
        meta: { public: true }
      },
      {
        path: 'register',
        component: () => import('pages/RegisterPage.vue'),
        meta: { public: true }
      },
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
        meta: { requiresAuth: true, role: ['user', 'admin'] }
      },

      {
        path: 'produtos',
        component: () => import('pages/ProdutosPage.vue'),
        meta: { requiresAuth: true, role: 'admin' }
      },

      {
        path: 'pedidos',
        component: () => import('pages/PedidosPage.vue'),
        meta: { requiresAuth: true, role: 'admin' }
      },
    ]
  }
]

export default routes
