import React from 'react';
import PropTypes from 'prop-types';
import { createReducer } from '../../core/redux/reducer';

class BaseNuomi extends React.PureComponent {
  static defaultProps = {
    id: null,
    state: null,
    store: null,
    reducers: null,
    effects: null,
    render: null,
    onInit: null,
  };

  static propTypes = {};

  static childContextTypes = {
    nuomiStore: PropTypes.object,
  };

  static nuomiId = 0;

  constructor(...args) {
    super(...args);
    this.createId();
    this.createStore();
    this.createReducer();
  }

  getChildContext() {
    return {
      nuomiStore: this.store,
    };
  }

  createId() {
    const { id } = this.props;
    BaseNuomi.nuomiId += 1;
    const defaultId = `nuomi_${BaseNuomi.nuomiId}`;
    this.id = id || defaultId;
  }

  createStore() {
    const { store } = this.props;
    store.dispatch = () => {};
    store.getState = () => {};
    this.store = store;
  }

  createReducer() {
    createReducer(this.id);
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
