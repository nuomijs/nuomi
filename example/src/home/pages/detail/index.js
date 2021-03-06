import React from 'react';
import effects from './effects';
import Layout from './components/Layout';

export default {
  cache: true,
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
  onLeave(leave) {
    setTimeout(() => {
      if (window.confirm('您确定要离开吗')) {
        leave();
      }
    });
    return false;
  },
};
