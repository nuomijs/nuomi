import React, { Fragment }  from 'react';
import { ShapeRoute, configure } from 'nuomi';

configure({
  reload: true,
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
      },
    ]} />
  )
}
