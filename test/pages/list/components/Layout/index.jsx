import React from 'react';
import { connect, Link } from 'nuomi';

class Layout extends React.PureComponent {
  render() {
    const { dataSource, loadings } = this.props;
    return (
      <div>
        {loadings.$getList === true && <span>正在加载中...</span>}
        <ul>
          {dataSource.map(({ title }, i) => (
            <li key={i}>
              <Link to="/detail/" reload>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(({ dataSource, loadings }) => ({ dataSource, loadings }))(Layout);
