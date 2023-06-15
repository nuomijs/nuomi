import React, { useMemo, useState }  from 'react';
import { ShapeRoute, configure, router, NavLink, Nuomi, useConnect, useNuomi } from 'nuomi';
import { Router, Route, NuomiRoute, defineProps } from 'nuomi';

configure({
  reload: true,
  cache: true,
})

router.listener(() => {
  NProgress.start();
}, () => {
  NProgress.done();
})

function App1({ children }) {
  // const [isLogin, login] = useState(false);
  // const routes = useMemo(() => {
  //   if (isLogin) {
  //     return [{
  //       path: '/main/*',
  //       key: '/main/*',
  //       children: '222'
  //     }, {
  //       to: '/main',
  //       key: '/main'
  //     }]
  //   }
  //   return [{
  //     path: '/login',
  //     key: '/login',
  //     children: '1111'
  //   }, {
  //     path: '/login1',
  //     key: '/login1',
  //     children: '11112222'
  //   }, {
  //     path: '/login2',
  //     key: '/login2',
  //     children: '11112222'
  //   }, {
  //     to: '/login',
  //     key: 'lo'
  //   }]
  // }, [isLogin])
  // return (
  //   <div>
  //   <div onClick={() => {
  //     login(true)
  //   }}>登录</div>
  //   <ShapeRoute routes={routes} />
  // </div>
  // )
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
    {/* <App1 />  */}
    <ShapeRoute routes={[{
      path: '/login',
      load: () => import('./pages/login')
      
    }, <Route path="/*" render={App1} state={{ count: 0 }}>
      <ShapeRoute routes={[{
      path: '/*',
      route: false,
      load: () => import('./layouts')
    }]} />
    </Route>]} />
  </Router>
}

export default App;
