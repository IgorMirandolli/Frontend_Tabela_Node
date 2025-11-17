const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/produtos' },
      { path: '/produtos', component: () => import('pages/ProdutosPage.vue') }
    ]
  }
];


export default routes;