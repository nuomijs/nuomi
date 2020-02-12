import React from 'react';
import { Redirect } from 'nuomi';
import Effects from './effects';
import Layout from './components/Layout';

export default {
  id: 'global',
  state: {
    username: '',
  },
  effects() {
    return new Effects(this);
  },
  render() {
    return window.sessionStorage.getItem('isLogin') ? <Layout /> : <Redirect to="/" />;
  },
  onInit() {
    this.store.dispatch({
      type: '$getInfo',
    });
  },
};
