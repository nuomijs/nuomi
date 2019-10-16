import React from 'react';
import effects from './effects';
import Layout from './components/Layout';

export default {
  state: {
    detail: '',
    count: 0,
  },
  effects,
  render() {
    return <Layout />;
  },
  onChange() {
    this.store.dispatch({
      type: 'initData',
    });
  },
};
