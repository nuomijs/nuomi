import React, { memo } from 'react';
import { defineNuomi, useConnect } from 'nuomi';
import Container from './components/Container';

const Demo = () => {
  const [count, dispatch] = useConnect(({ count }) => {
    return count;
  });
  console.log(22)
  return <div onClick={() => {
    dispatch({
      type: '@update',
      payload: {
        count: count + 1
      }
    })
  }}>{count}</div>
}

export default defineNuomi({
  state: {
    count: 0,
    value: 1,
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
    return <>
      <Demo></Demo>
      <Container />
    </>
  },
});
