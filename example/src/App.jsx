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

// const filesContext = require.context('./views', true, /index\.js$/, 'lazy');
// filesContext.keys().map((file) => import(`./views/${file.replace(/^\.\//, '')}`)).forEach((m) => {
//   m.then((e) => {
//     console.log(e)
//   })
// })
// const files = filesContext.keys().map(filesContext);

// files.forEach((module) => {

//   // Use the imported module here
// });

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
      },
    ]} />
  )
}
