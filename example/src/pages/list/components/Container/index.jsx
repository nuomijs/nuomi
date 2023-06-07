import React from 'react';
import { useConnect, router, useNuomi } from 'nuomi';

export default () => {
  const [{ value, loading }, dispatch] = useConnect();
  const [a] = useNuomi();
  console.log(a)
  return <div onClick={() => {
    dispatch({
      type: '@update',
      payload: {
        value: value + 1
      }
    })
  }}>
    <div>{loading.$initData ? 'loading': ''}</div>
    <div>{value}</div>
  </div>
}
