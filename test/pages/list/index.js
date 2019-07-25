import React from 'react';
import Effects from './effects';
import Layout from './components/Layout';

export default {
  path: '/list/',
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
    console.log(111)
    this.store.dispatch({
      type: '$getList',
    });
  },
};
