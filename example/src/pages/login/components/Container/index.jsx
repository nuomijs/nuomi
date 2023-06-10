import React from 'react';
import { useConnect, router } from 'nuomi';

export default () => {
  const [{ value, loading }, dispatch] = useConnect();

  return <div onClick={() => {
    router.push({
      name: 'list',
      state: {
        a: 1
      }
    })
  }}>
    <div>{loading.$initData ? 'loading': ''}</div>
    <div>{value}</div>
  </div>
}
