import React, { Component, PureComponent } from 'react';
import { connect } from 'nuomi';

class Footer extends Component {
  render() {
    const { total, count, dispatch } = this.props;
    return <div onClick={() => {
      dispatch('@update', {
        count: count + 1
      })
    }}>
      <div>{count} __ {total}</div>
    </div>
  }
}

export default connect()(Footer);

