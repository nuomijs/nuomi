import React from 'react';
import { Redirect } from 'nuomi';
import Effects from './effects';
import Layout from './components/Layout';

export default {
  id: 'global',
  state: {
    username: '',
    routes: [],
  },
  effects() {
    return new Effects(this);
  },
  render() {
    return sessionStorage.getItem('isLogin') ? (
      <Layout>{this.children}</Layout>
    ) : (
      <Redirect to="/" />
    );
  },
  onInit() {
    this.store.dispatch({
      type: '$getInfo',
    });
  },
};
