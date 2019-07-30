import React from 'react';
import { connect, Link, router } from 'nuomi';

class Layout extends React.PureComponent {
  click(count) {
    // router.location('/detail/', ({ store }) => {
    //   store.dispatch({
    //     type: 'updateState',
    //     payload: { count },
    //   });
    // });
    router.location('/detail/', { a:1 });
  }

  render() {
    const { dataSource, loadings } = this.props;
    return (
      <div>
        {loadings.$getList === true && <span>正在加载中...</span>}
        <ul>
          {dataSource.map(({ title }, i) => (
            <li key={i}>
              <a onClick={() => this.click(i)}>{title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(({ dataSource, loadings }) => ({ dataSource, loadings }))(Layout);
