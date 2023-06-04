import React, { useEffect } from 'react';
import { useConnect, router } from 'nuomi';

export default () => {
  const [{ value, loading }, dispatch] = useConnect();

  useEffect(() => {
    dispatch({
      type: '$initData',
    });
  }, [])

  return <div onClick={() => {
    router.reload();
    // router.push({
    //   pathname: '/',
    //   state: {
    //     a: 1
    //   }
    // })
  }}>
    <div>{loading.$initData ? 'loading': ''}</div>
    <div>{value}</div>
  </div>
}
