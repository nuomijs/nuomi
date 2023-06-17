import React from 'react';
import { useConnect, router } from 'nuomi';

function Container ({ children }) {
  const [{ value, $initData }, dispatch] = useConnect();

  return <div onClick={() => {
    router.push({
      name: 'list',
      state: {
        a: 1
      }
    })
  }}>
    <div>{$initData ? 'loading': ''}</div>
    <div>{value}</div>
  </div>
}

export default Container;
