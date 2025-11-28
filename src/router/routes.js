const routes = [

  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard', component: () => import('src/pages/DashboardPage.vue'), meta: { requiresAuth: true } },

      { path: 'produtos', component: () => import('src/pages/ProdutosPage.vue'), meta: { requiresAuth: true } },

      { path: 'pedidos', component: () => import('src/pages/PedidosPage.vue'), meta: { requiresAuth: true } }
    ]
  }

];

export default routes;
