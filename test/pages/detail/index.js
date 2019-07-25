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
  onInit() {
    this.store.dispatch({
      type: '$getDetail',
    });
  },
  onChange() {
    // console.log(111);
  },
};
