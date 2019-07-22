import React from 'react';
import PropTypes from 'prop-types';

class Link extends React.PureComponent {
  static defaultProps = {};

  static propTypes = {};

  onClick = (e) => {
    e.preventDefault();
  };

  render() {
    const { children } = this.props;
    return <a onClick={this.onClick}>{children}</a>;
  }
}

export default Link;
