import React from 'react';
import { useConnect, useLocation, useNuomi } from 'nuomi';

export default () => {
  const [{ value, $initData }, dispatch] = useConnect();
  const nuomi = useNuomi();
  return <div onClick={() => {
    dispatch('@update', {
      value: value + 1
    })
  }}>
    <div>{$initData ? 'loading': ''}</div>
    <div>{value}</div>
  </div>
}
