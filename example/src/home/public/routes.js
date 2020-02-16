export default [
  {
    path: '/',
    async: () => import('../pages/home'),
  },
  {
    path: '/list',
    async: () => import('../pages/list'),
  },
  {
    path: '/detail/:id?',
    async: (cb) => {
      require.ensure([], (require) => {
        cb(require('../pages/detail').default);
      });
    },
  },
];
