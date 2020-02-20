import React from 'react';
import Layout from './components/Layout';
import Effects from './effects';

export default {
  id: 'login',
  state: {
    username: '',
    password: '',
  },
  effects() {
    return new Effects(this);
  },
  render() {
    return <Layout>{this.children}</Layout>;
  },
};
