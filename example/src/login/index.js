import React from 'react';
import Layout from './components/Layout';
import Effects from './effects';

export default {
  reload: true,
  state: {
    username: '',
    password: '',
  },
  effects() {
    return new Effects(this);
  },
  render() {
    return <Layout />;
  },
};
