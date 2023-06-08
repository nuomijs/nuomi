import React, { Fragment }  from 'react';
import { ShapeRoute, configure, router } from 'nuomi';

configure({
  reload: true,
})

router.listener(() => {
  NProgress.start();
}, () => {
  NProgress.done();
})

export default () => {
  return (
    <ShapeRoute routes={[
      {
        path: '/login',
        async: () => import('./pages/login'),
      },
      {
        path: '/*',
        async: () => import('./layouts'),
        reload: false,
      },
    ]} />
  )
}
