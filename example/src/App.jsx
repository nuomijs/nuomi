import React  from 'react';
import { ShapeRoute } from 'nuomi';

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
      },
    ]} />
  )
}
