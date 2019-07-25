import React from 'react';
import { connect, Link } from 'nuomi';

const style = {
  marginLeft: 8,
};

class Layout extends React.PureComponent {
  render() {
    const { children, username, loadings } = this.props;
    return loadings.$getInfo === true ? (
      '正在初始化...'
    ) : (
      <div>
        <div>
          <Link to="/" style={style}>
            首页
          </Link>
          <Link to="/list/" style={style}>
            列表
          </Link>
          <Link to="/detail/" style={style}>
            详情
          </Link>
          <span style={{ marginLeft: 20 }}>欢迎您，{username}！</span>
        </div>
        <div>{children}</div>
      </div>
    );
  }
}

export default connect(({ username, loadings }) => ({ username, loadings }))(Layout);
