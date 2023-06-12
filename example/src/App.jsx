import React, { Fragment }  from 'react';
import { ShapeRoute, configure, router, NavLink } from 'nuomi';

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
        load: () => import('./pages/login'),
      },
      {
        path: '/*',
        load: () => import('./layouts'),
        route: false,
      },
    ]} />
  )
}

// import React  from 'react';
// import { Nuomi } from 'nuomi';
// import list from './list';
// import List from './List.jsx';

// export default () => (
//   <Nuomi {...list}>
//     <List />
//   </Nuomi>
// )
