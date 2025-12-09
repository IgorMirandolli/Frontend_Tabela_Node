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
        path: 'perfil',
        component: () => import('src/pages/PerfilPage.vue'),
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

      {
        path: 'carrinho',
        component: () => import('pages/CartPage.vue'),
        meta: { requiresAuth: true, role: ['user', 'admin'] }
      },

      {
        path: 'produto/:id',
        component: () => import('pages/ProdutoDetalhesPage.vue'),
        meta: { requiresAuth: true, role: ['user', 'admin'] }
      },
    ]
  }
]

export default routes
