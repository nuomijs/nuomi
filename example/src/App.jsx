import React, { useMemo, useState }  from 'react';
import { ShapeRoute, configure, router, NavLink, Nuomi, useConnect, useNuomi, useLocation } from 'nuomi';
import { Router, Route, NuomiRoute, defineProps } from 'nuomi';

configure({
  reload: true,
})

router.namePath('aaa', '/*')

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
  //       children: '222'
  //     }, {
  //       to: '/main',
  //     }]
  //   }
  //   return [{
  //     path: '/login',
  //     children: '1111',
  //   }, {
  //     path: '/login1',
  //     children: '11112222'
  //   }, {
  //     path: '/login2',
  //     children: '11112222'
  //   }, {
  //     to: '/login',
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
  const nuomi = useNuomi();
  const location = useLocation();
  return <div>
    <div onClick={() => {
      nuomi.reload();
    }}>刷新刷新</div>
    <div onClick={() => dispatch('@update', { count: count + 1 })}>{count}</div>
    {children}
  </div>
}

function App2({ children }) {
  const [isLogin, login] = useState(false);
  const routes = useMemo(() => {
    if (isLogin) {
      return [{
        path: '/main/*',
        children: '222',
      }, {
        to: '/main',
      }]
    }
    return [{
      path: '/login',
      children: '1111',
    }, {
      path: '/login1',
      children: '11112222',
      name: 'a'
    }, {
      path: '/login2',
      children: '11112222',
      name: 'b'
    }, {
      to: '/login',
    }]
  }, [isLogin])
  return (
    <div>
    <div onClick={() => {
      login(true)
    }}>登录</div>
    <ShapeRoute routes={routes} />
  </div>
  )
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
