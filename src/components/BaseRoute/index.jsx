import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import BaseNuomi from '../BaseNuomi';

class BaseRoute extends BaseNuomi {
  static defaultProps = {
    wrapper: false,
    state: null,
    data: null,
    store: null,
    reducers: null,
    effects: null,
    render: null,
    onBefore: null,
    onData: null,
    onInit: null,
    onChange: null,
    onLeave: null,
  };

  static propTypes = {};

  constructor(...args) {
    super(...args);
    this.wrapper = useRef();
  }

  render() {
    const { props } = this;
    const { wrapper } = props;
    if (props.render) {
      const renderContent = props.render();
      if (wrapper) {
        return <div ref={this.wrapper}>{renderContent}</div>;
      }
      return renderContent;
    }
    return null;
  }
}

export default BaseRoute;
