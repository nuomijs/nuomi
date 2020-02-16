import React from 'react';
import router, { combinePath } from '../core/router';
import { LinkPropTypes } from './propTypes';

class Link extends React.PureComponent {
  static propTypes = LinkPropTypes;

  onClick = (e) => {
    e.preventDefault();
    const { to, reload } = this.props;
    if (to) {
      router.location(to, null, reload, false);
    }
  };

  render() {
    const { to, reload, ...rest } = this.props;
    return <a href={`${combinePath(to)}`} {...rest} onClick={this.onClick} />;
  }
}

export default Link;
