import React, { useEffect } from 'react';
import { useConnect, router } from 'nuomi';

export default () => {
  const [{ value, $initData, total }, dispatch] = useConnect();
  console.log($initData)
  useEffect(() => {
    dispatch('$initData')
  }, [])

  return <div onClick={() => {
    dispatch('@update', {
      value: value + 1
    })
  }}>
    <div>{$initData ? 'loading': ''}</div>
    <div>{value}</div>{total}
  </div>
}
