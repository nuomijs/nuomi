import React from 'react';
import { connect } from 'nuomi';

class Layout extends React.PureComponent {
  click = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'count',
    });
  };

  add = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/setRoutes',
    });
  };

  remove = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/removeRoutes',
    });
  };

  render() {
    const { detail, count, loadings } = this.props;
    return (
      <div>
        <div>{loadings.$getDetail === true && <span>正在加载中...</span>}</div>
        {detail}
        <span onClick={this.click}>攒（{count}）</span>
        <span onClick={this.add}>增加</span>
        <span onClick={this.remove}>移除</span>
      </div>
    );
  }
}

export default connect(({ detail, count, loadings }) => ({ detail, count, loadings }))(Layout);
