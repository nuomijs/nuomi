import React from 'react';
import { connect, Nuomi } from 'nuomi';

const Demo = () => {
  return '11';
};

const demo = {
  id: 'xx',
  state: {
    a:1,
  },
  render() {
    return <Demo />
  }
};

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
        {/* <div>{loadings.$getDetail === true && <span>正在加载中...</span>}</div> */}
        {detail}
        <span onClick={this.click}>攒（{count}）</span>
        <span onClick={this.add}>增加</span>
        <span onClick={this.remove}>移除</span>
        <Nuomi {...demo} />
      </div>
    );
  }
}

export default connect(({ detail, count, loadings }) => ({ detail, count, loadings }))(Layout);
