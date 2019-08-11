export default [
  {
    path: '/home',
    async: () => import('../pages/home'),
  },
  {
    path: '/home/list',
    async: () => import('../pages/list'),
  },
  {
    wrapper: true,
    path: '/home/detail/:id',
    async: (cb) => {
      require.ensure([], (require) => {
        cb(require('../pages/detail').default);
      });
    },
  },
];
