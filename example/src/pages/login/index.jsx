import React from 'react';
import { defineProps } from 'nuomi';
import Container from './components/Container';

export default defineProps({
  state: {
    value: 3,
  },
  action: {
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
  render(e) {
    return <Container />
  },
});
