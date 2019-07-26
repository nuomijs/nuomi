import React from 'react';
import Effects from './effects';
import Layout from './components/Layout';

export default {
  path: '/detail/',
  state: {
    detail: '',
    count: 0,
  },
  effects() {
    return new Effects(this);
  },
  render() {
    return <Layout />;
  },
  onChange() {
    this.store.dispatch({
      type: 'initData',
    });
  },
};
