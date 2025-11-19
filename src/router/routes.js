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
      { path: 'produtos', component: () => import('pages/ProdutosPage.vue') }
    ]
  }
];

export default routes;
