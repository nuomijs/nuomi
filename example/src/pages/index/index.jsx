import React, { memo } from 'react';
import { defineProps, useConnect, globalStore } from 'nuomi';
import Container from './components/Container';

export default defineProps({
  state: {
    count: 0,
    value: 1,
  },
  getter: {
    total({ value }) {
      return `${value}_111111`
    }
  },
  action: {
    async $initData({ getState, commit }) {
      const state = getState();
      const value = await new Promise((res) => {
        setTimeout(() => {
          res(state.value + 1);
        }, 500)
      });
      commit({
        value,
      });
    }
  },
  render() {
    return <>
      <Container />
    </>
  },
  onShow() {
    
  }
});
