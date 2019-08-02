import React from 'react';
import { connect, router } from 'nuomi';

class Layout extends React.PureComponent {
  click = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'count',
    });
  };

  reload = () => {
    router.reload();
  };

  render() {
    const { detail, count, loadings } = this.props;
    return (
      <div>
        <div>{loadings.$getDetail === true && <span>正在加载中...</span>}</div>
        {detail}
        <span onClick={this.click}>攒（{count}）</span>
        <span onClick={this.reload}>刷新</span>
      </div>
    );
  }
}

export default connect(({ detail, count, loadings }) => ({ detail, count, loadings }))(Layout);
