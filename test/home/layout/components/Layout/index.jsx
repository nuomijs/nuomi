import React from 'react';
import { connect, Link, Route, Redirect } from 'nuomi';
import routes from '../../../public/routes';

const style = {
  marginLeft: 8,
};

class Layout extends React.PureComponent {
  render() {
    const { username, loadings } = this.props;
    return loadings.$getInfo === true ? (
      '正在初始化...'
    ) : (
      <div>
        <div>
          <Link to="/home" style={style}>
            首页
          </Link>
          <Link to="/home/list" style={style}>
            列表
          </Link>
          <Link to="/home/detail" style={style}>
            详情
          </Link>
          <span style={{ marginLeft: 20 }}>欢迎您，{username}！</span>
        </div>
        <div>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect to="/home" />
        </div>
      </div>
    );
  }
}

export default connect(({ username, loadings }) => ({ username, loadings }))(Layout);
