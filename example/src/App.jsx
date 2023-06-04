import React, { Component }  from 'react';
import { Router, ShapeRoute } from 'nuomi';

export default () => {
  return (
    <ShapeRoute routes={[
      {
        path: '/',
        async: () => import('./layout'),
        reload: true,
        children: [
          {
            path: '/',
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
