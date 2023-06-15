import React, { Fragment, Component }  from 'react';
import { ShapeRoute, configure, router, NavLink, Nuomi, useConnect, useNuomi } from 'nuomi';
import { Router, Route, NuomiRoute, defineProps } from 'nuomi';

configure({
  reload: true,
})

router.listener(() => {
  NProgress.start();
}, () => {
  NProgress.done();
})

function App1({ children }) {
  const [{ count }, dispatch] = useConnect();
  const [nuomi] = useNuomi();
  return <div>
    <div onClick={() => {
      nuomi.reload();
    }}>刷新刷新</div>
    <div onClick={() => dispatch('@update', { count: count + 1 })}>{count}</div>
    {children}
  </div>
}

function App() {
  return <Router>
    <ShapeRoute routes={[{
      path: '/login',
      load: () => import('./pages/login')
      
    }, <NuomiRoute path="/*" render={App1} state={{ count: 0 }}>
      <ShapeRoute routes={[{
      path: '/*',
      route: false,
      load: () => import('./layouts')
    }]} />
    </NuomiRoute>]} />
  </Router>
}

export default App;
