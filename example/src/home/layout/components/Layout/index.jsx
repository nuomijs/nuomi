import React from 'react';
import { connect, withNuomi, Link, NavLink, Route, Redirect, router } from 'nuomi';
import routes from '../../../public/routes';

const style = {
  marginLeft: 8,
};

class Layout extends React.PureComponent {
  render() {
    const { username, loadings, nuomiProps, children } = this.props;
    return loadings.$getInfo === true ? (
      '正在初始化...'
    ) : (
      <div>
        <div>
          <NavLink to={router.mergePath(nuomiProps.path, '/')} style={style}>
            首页
          </NavLink>
          <NavLink to={router.mergePath(nuomiProps.path, '/list')} style={style}>
            列表
          </NavLink>
          <NavLink to={router.mergePath(nuomiProps.path, '/detail')} style={style}>
            详情
          </NavLink>
          <span style={{ marginLeft: 20 }}>
            欢迎您，
            {username}！
          </span>
        </div>
        <div>
          {children}
          {/* {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route path="*">404</Route> */}
          {/* <Route path="/home" async={() => import('../../../pages/home')} />
          <Route path="/home/list" async={() => import('../../../pages/list')} />
          <Route path="/home/detail/:id" async={() => import('../../../pages/detail')} /> */}
          {/* <Redirect to="/home" /> */}
        </div>
      </div>
    );
  }
}

export default connect(({ username, loadings }) => ({ username, loadings }))(withNuomi(Layout));
