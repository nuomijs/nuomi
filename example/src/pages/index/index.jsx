import React, { memo } from 'react';
import { define, useConnect } from 'nuomi';
import Container from './components/Container';

// const Demo = () => {
//   const [count, dispatch] = useConnect(({ count }) => {
//     return count;
//   });
//   return <div onClick={() => {
//     dispatch({
//       type: '@update',
//       payload: {
//         count: count + 1
//       }
//     })
//   }}>{count}</div>
// }

export default define({
  state: {
    count: 0,
    value: 1,
    loading: {
      $initData: false,
    },
  },
  effects: {
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
    return <>
      {/* <Demo></Demo> */}
      <Container />
    </>
  },
});
