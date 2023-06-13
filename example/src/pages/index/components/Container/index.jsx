import React, { useEffect } from 'react';
import { useConnect, router } from 'nuomi';

export default () => {
  const [{ value, loading }, dispatch] = useConnect();
  useEffect(() => {
    dispatch('$initData')
  }, [])

  return <div onClick={() => {
    dispatch('@update', {
      value: value + 1
    })
  }}>
    <div>{loading.$initData ? 'loading': ''}</div>
    <div>{value}</div>
  </div>
}
