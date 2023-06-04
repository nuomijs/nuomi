import React, { useEffect } from 'react';
import { defineNuomi } from 'nuomi';
import Container from './components/Container';

export default defineNuomi({
  state: {
    value: 3,
    loading: {
      $initData: false,
    },
  },
  effects: {
    async $initData({ getState, setState }) {
      const state = getState();
      const value = await new Promise((res) => {
        setTimeout(() => {
          res(state.value + 1);
        }, 1000)
      });
      setState({
        value,
      });
    }
  },
  render() {
    return <Container />
  },
});
