import React from 'react';
import Effects from './effects';
import Layout from './components/Layout';

export default {
  path: '/home/list',
  state: {
    dataSource: [],
  },
  effects() {
    return new Effects(this);
  },
  render() {
    return <Layout />;
  },
  onInit() {
    this.store.dispatch({
      type: '$getList',
    });
  },
};
