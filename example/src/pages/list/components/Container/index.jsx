import React from 'react';
import { useConnect } from 'nuomi';

export default () => {
  const [{ value, loading }, dispatch] = useConnect();
  return <div onClick={() => {
    dispatch('@update', {
      value: value + 1
    })
  }}>
    <div>{loading.$initData ? 'loading': ''}</div>
    <div>{value}</div>
  </div>
}
