import React from 'react';
import PropTypes from 'prop-types';

class Router extends React.PureComponent {
  static defaultProps = {
    prefix: '#!',
  };

  static propTypes = {
    prefix: PropTypes.string.isRequired,
  };

  static childContextTypes = {
    routerPrefix: PropTypes.string,
  };

  constructor(...args) {
    super(...args);
    this.listener();
  }

  getChildContext() {
    const { prefix } = this.props;
    return {
      routerPrefix: prefix,
    };
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.hashchange);
  }

  hashchange() {
    //
  }

  listener() {
    window.addEventListener('hashchange', this.hashchange);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default Router;
