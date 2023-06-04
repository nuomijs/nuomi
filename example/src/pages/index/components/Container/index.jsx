import React from 'react';
import { useConnect, router } from 'nuomi';

export default () => {
  const [{ value, loading }] = useConnect();

  return <div onClick={() => {
    router.reload();
  }}>
    <div>{loading.$initData ? 'loading': ''}</div>
    <div>{value}</div>
  </div>
}
