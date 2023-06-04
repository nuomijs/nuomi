import React  from 'react';
import { ShapeRoute } from 'nuomi';

export default () => {
  return (
    <ShapeRoute routes={[
      {
        path: '/',
        async: () => import('./layout'),
        children: [
          {
            path: '/',
            cache: true,
            reload: true,
            async: () => import('./pages/index')
          },
          {
            path: '/list',
            reload: true,
            async: () => import('./pages/list')
          }
        ]
      },
      // {
      //   path: '/login',
      //   async: () => import('./pages/login'),
      // }
    ]} />
  )
}
