import React from 'react';
import Effects from './effects';
import Layout from './components/Layout';
import services from './services';

export default {
  wrapper: true,
  path: '/home/detail/:id',
  state: {
    detail: '',
    count: 0,
  },
  effects: {
    updateState(payload) {
      this.dispatch({
        type: '_updateState',
        payload,
      });
    },
    count() {
      const { count } = this.getState();
      this.updateState({
        count: count + 1,
      });
    },
    async $getDetail() {
      const data = await services.getDetail();
      this.updateState(data);
    },
    async initData() {
      await this.$getDetail();
    },
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
