import React from 'react';
import { defineProps } from 'nuomi';
import Container from './components/Container';

export default defineProps({
  state: {
    value: 3,
  },
  actions: {
    async $initData({ getState, commit }) {
      const state = getState();
      const value = await new Promise((res) => {
        setTimeout(() => {
          res(state.value + 1);
        }, 1000)
      });
      commit({
        value,
      });
    }
  },
  render() {
    return <Container />
  },
  onInit({ store }) {
    store.dispatch('$initData')
  }
});
