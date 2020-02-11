import React from 'react';
import PropTypes from 'prop-types';
import router, { combinePath } from '../../core/router';

class Link extends React.PureComponent {
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    reload: PropTypes.bool,
  };

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
