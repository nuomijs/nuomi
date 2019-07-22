import React, { createRef } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable no-unused-vars */
import BaseRoute from '../BaseRoute';
import Nuomi from '../Nuomi';

class Route extends Nuomi {
  static defaultProps = {
    wrapper: false,
    onBefore: null,
  };

  static propTypes = {
    wrapper: PropTypes.bool,
    onBefore: PropTypes.func,
  };

  constructor(...args) {
    super(...args);
    this.store = {};
    const { async, ...rest } = this.props;
    this.ref = createRef();
    this.wrapperRef = createRef();
    this.state = {
      loaded: typeof async !== 'function',
      visible: false,
      props: { ...rest },
    };
  }

  componentDidMount() {
    const { props } = this;
    if (props.onBefore) {
      const before = props.onBefore(() => {
        this.visibleHandler();
      });
      if (before === true) {
        this.visibleHandler();
      }
    } else {
      this.visibleHandler();
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  visibleHandler() {
    this.loadProps();
  }

  render() {
    const { loaded, visible, props } = this.state;
    const { wrapper } = props;
    if (loaded && visible) {
      const RouteComponent = <BaseRoute ref={this.ref} {...props} store={this.store} />;
      if (wrapper) {
        return <div ref={this.wrapperRef}>{RouteComponent}</div>;
      }
      return RouteComponent;
    }
    return null;
  }
}

export default Route;
