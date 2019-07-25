import React from 'react';
import PropTypes from 'prop-types';
import { location, getHashPrefix } from '../../core/router';

class Link extends React.PureComponent {
  static defaultProps = {
    to: '',
    reload: false,
  };

  static propTypes = {
    to: PropTypes.string,
    reload: PropTypes.bool,
  };

  onClick = (e) => {
    e.preventDefault();
    const { to, reload } = this.props;
    location(to, reload);
  };

  render() {
    const { to, reload, ...rest } = this.props;
    return <a href={`${getHashPrefix()}${to}`} {...rest} onClick={this.onClick} />;
  }
}

export default Link;
