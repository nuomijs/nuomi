import React from 'react';
import { useConnect, router } from 'nuomi';

function Container ({ children }) {
  console.log(children)
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

export default Container;