import React from 'react';
import PropTypes from 'prop-types';

class BaseNuomi extends React.PureComponent {
  static childContextTypes = {
    nuomiStore: PropTypes.object,
  };

  static defaultProps = {
    state: null,
    store: null,
    reducers: null,
    effects: null,
    render: null,
    onInit: null,
  };

  static propTypes = {};

  constructor(...args) {
    super(...args);
    const { id, store } = this.props;
    this.id = id;
    this.store = store;
  }

  getChildContext() {
    return {
      nuomiStore: this.store,
    };
  }

  render() {
    const { props } = this;
    if (props.render) {
      return props.render();
    }
    return null;
  }
}

export default BaseNuomi;
